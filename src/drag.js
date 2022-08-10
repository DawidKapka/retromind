let lastEvent;
const translation = {x: 0, y: 0};

function beginDrag() {
    document.body.addEventListener('mousemove', handleMove);
    document.body.addEventListener('mouseup', () => document.body.removeEventListener('mousemove', handleMove, false));
}

function handleMove(event) {
    if (lastEvent) {
        console.log(event);
        translation.x += (event.x - lastEvent.x);
        translation.y += (event.y - lastEvent.y);
        document.querySelector('.window').style.transform = `translate(${translation.x}px, ${translation.y}px)`;
    }
    lastEvent = event;
}
