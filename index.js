
/**
 * Module dependencies.
 */

var Emitter = require('component/emitter');
var events = require('component/events');
var query = require('component/query');

/**
 * Expose `Skiplink`.
 */

module.exports = Skiplink;

/**
 * Creates a new `Skiplink` using a given
 * `anchorEl` and `targetEl`.
 *
 * `targetEl` may be omitted if the "href" of
 * `anchorEl` provides a selector for the target
 * element.
 *
 * @param {HTMLElement} anchorEl - should be focusable
 * @param {HTMLElement} [targetEl]
 * @api public
 */

function Skiplink(anchorEl, targetEl) {
  var skiplink = this;

  if (!targetEl) {
    var selector = anchorEl.getAttribute('href');
    targetEl = query(selector);
    if (!targetEl) {
      return new Error('target element is required');
    }
  }

  skiplink.target = new Target(targetEl);

  new Anchor(anchorEl)
    .on('clicked', function () {
      skiplink.target.focus();
    });
}

/**
 * Creates an `Anchor#`.
 *
 * @param {HTMLElement} el - should be focusbale
 * @api private
 */

function Anchor(el) {
  this.events = events(el, this);
  this.events.bind('click');
  this.events.bind('keydown');
}

/**
 * Mixin `Emitter`.
 */

Emitter(Anchor.prototype);

/**
 * Handles click events on `Anchor#el`.
 *
 * @return {Anchor}
 * @api private
 */

Anchor.prototype.onclick = function () {
  this.emit('clicked');
  return this;
};

/**
 * Handles keydown events on `Anchor#el`.
 *
 * @return {Anchor}
 * @api private
 */

Anchor.prototype.onkeydown = function (e) {
  if (e.which && e.which == 13) {
    this.emit('clicked');
  }
  return this;
};

/**
 * Creates a `Target#` for the `Skiplink#`.
 *
 * @param {HTMLElement} el
 * @api private
 */

function Target(el) {
  this.el = el;
  this.events = events(el, this);
  this.events.bind('blur');
}

/**
 * Focus the `Target#el`.
 *
 * @return {Target}
 * @api private
 */

Target.prototype.focus = function () {
  this.el.setAttribute('tabindex', '-1');
  this.el.focus();
  return this;
};

/**
 * Handles blur events on the `Target#el`.
 *
 * - Removes "tabindex" attribute.
 *
 * @return {Target}
 * @api private
 */

Target.prototype.onblur = function () {
  this.el.removeAttribute('tabindex');
  return this;
};
