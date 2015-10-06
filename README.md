# Skiplink

JavaScript module that adds skiplink functionality to existing anchors and manages the removal of tabindex form the skiplink target, preventing mouse users from seeing visual focus indication when clicking on the target area.

- Does not style your skiplink
- Does not hide/show your skip link
- Handles only the focus-shifting functionality

## Usage

```js
var anchorEl = document.querySelector('a.skiplink');
var targetEl = document.querySelector('div#main-content');

new Skiplink(anchorEl, targetEl);
```

## Example

Clone the repo and open `example/index.html` in your browser.

## Directions

Include the contents of `dist/skiplink.js` (or the minified `dist/skiplink.min.js`) in your page. This exposes `window.Skiplink`.

Use the `Skiplink` constructor to add skiplink functionality to an existing anchor element. The anchor used should be naturally focusable.

## `Skiplink(anchorEl[, targetEl])`

### `anchorEl` HTMLElement

An anchor you wish to use as a skiplink. It should be naturally focusable.

### `targetEl` HTMLElement (optional)

The element that receive focus when the skiplink is activated. On blur it will lose tabindex and no longer be naturally focusable until the skiplink is again activated.

If this argument is not supplied, Skiplink will use the value of `anchorEl`'s `href` attribute to determine what to target.