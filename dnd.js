export function drag_and_drop(lists, items){
    let draggables = document.querySelectorAll(items)
    let containers = document.querySelectorAll(lists)
    let arrayOfDraggables = [...document.querySelectorAll(items)]
    let copyOfDraggable
    let indexOfDragging
    let containerFromDrag
    let lastElement

    function last(arr){
        return arr[arr.length - 1]
    }

    draggables.forEach(draggable => {

        draggable.addEventListener('dragstart', () => {
            copyOfDraggable = draggable.cloneNode(true)
            copyOfDraggable.classList.add('copy')
            draggable.classList.add('dragging')
            arrayOfDraggables = [...document.querySelectorAll(`${items}:not(.copy)`)]
            indexOfDragging = arrayOfDraggables.indexOf(draggable)
        })

        draggable.addEventListener('dragend', () => {
            copyOfDraggable.remove()
            copyOfDraggable = null
            indexOfDragging = null
            draggable.classList.remove('dragging')
        })
    })

    containers.forEach(container => {
        // inserting the copy of draggable element into the new place
        // works only when dragging over the container
        container.addEventListener('dragover', (e) => {
            e.preventDefault()
            if (containerFromDrag == null) {
                containerFromDrag = container
                lastElement = last(containerFromDrag.querySelectorAll(items))
            }
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = copyOfDraggable
            const draggingElement = document.querySelector('.dragging')
            if ((arrayOfDraggables[indexOfDragging + 1] === afterElement ||
                    (draggingElement === lastElement && afterElement === undefined)) &&
                container.contains(draggingElement)
            ) {
                draggable.classList.add('hide')
            } else {
                draggable.classList.remove('hide')
                if (afterElement == null) {
                    container.appendChild(draggable)
                } else {
                    container.insertBefore(draggable, afterElement)
                }
            }
        })

        container.addEventListener('drop', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
            containerFromDrag = null
        })
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(`${items}:not(.dragging)`)]


        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            } else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }
}
