const Shared = () => {

}

export function buttonize(handlerFn) {
    return {
        role: 'button',
        onClick: handlerFn,
        onKeyDown: event => {
            console.log(event);
            if (event.keycode === 13) handlerFn(event);
        }
    }
}

export default Shared