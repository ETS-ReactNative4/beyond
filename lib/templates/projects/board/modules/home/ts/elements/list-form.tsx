import React from "react";
import {useAppContext} from "./context";

export function ListForm() {
    const {createList} = useAppContext();
    const input = React.useRef(null);
    const [value, setValue] = React.useState('')
    const onCreate = (event) => {
        event.preventDefault();
        createList(input.current.value);
        setValue('');
    };
    const onChange = event => {
        console.log('onChange, event.currentTarget:', event.currentTarget, event.currentTarget.value)
        setValue(' ');
    }
    const btnProps = {onClick: onCreate, disabled: false}
    if (!value) btnProps.disabled = true;

    return (
        <section className="app__form-lists">
            <form action="" onSubmit={onCreate}>
                <input onChange={onChange} value={value} type="text" ref={input}/>
                <button {...btnProps}>Crear</button>
            </form>
        </section>
    );
}