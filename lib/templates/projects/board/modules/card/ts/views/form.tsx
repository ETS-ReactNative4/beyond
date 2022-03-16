import React from "react";
import {useAppCardContext} from "./context";

export function TaskForm() {

    const {card, texts} = useAppCardContext();
    const input = React.useRef(null);
    const [value, setValue] = React.useState('');

    const onSubmit = event => {
        event.preventDefault();
        card.addTask(value);
        setValue('');
    };

    const onChange = event => {
        event.preventDefault();
        event.stopPropagation();
        setValue(input.current.value);
    };

    const checkEnter = event => {
        if (event.key === 'Enter') onSubmit(event);
    };

    return (
        <div className="card__form-add">
            <form onSubmit={onSubmit}>
                <span>+</span>
                <input
                    ref={input}
                    value={value}
                    onChange={onChange}
                    onKeyDown={checkEnter}
                    placeholder={texts.form.placeholder} type="text"/>
            </form>
        </div>
    )
}