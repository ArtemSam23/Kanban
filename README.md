# kanban
It's a template for drag and drop To Do app, you can try it [here](https://artemsam23.github.io/kanban)  
To set up drag and drop on your project follow this steps:
1. Add  `dnd.mjs`  to your project
2. (optional) Add `for_touchscreen.js` for touchscreen support
3. Import function drag_and_drop:
```js
import {drag_and_drop} from "(path to dnd.js)"
```
4. Pass your html classes for lists and its draggable items:
```js
drag_and_drop('.list', '.list__items')
```
