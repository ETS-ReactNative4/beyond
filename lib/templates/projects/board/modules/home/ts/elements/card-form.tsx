import React, {SyntheticEvent, MouseEvent} from "react";
import {useAppContext} from "./context";

export function CardForm({list, toggleForm}) {
    const {createList, texts} = useAppContext();
    const [newCard, setNewCard] = React.useState('');

    const createCard = (event: SyntheticEvent | MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!newCard) return;
        list.add(newCard);
        toggleForm(false);
    };

    const onChange = event => {
        event.preventDefault();

        if (event.key === 'Enter') {
        }
        const target = event.currentTarget;
        setNewCard(target.value);
    };

    const checkSend = event => {
        if (event.key === 'Enter') {
            createCard(event);
        }
    };

    return (
        <form
            className="app__list__form" onSubmit={createCard}>
                <textarea
                    className="card__form"
                    onKeyDown={checkSend}
                    placeholder={texts.list.placeholder}
                    value={newCard}
                    onChange={onChange}/>
            <button onSubmit={createCard}>{texts.list.actions.save}</button>
        </form>
    )
}