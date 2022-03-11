import React from "react";
import {useAppContext} from "./context";
import {CardForm} from "./card-form";
import {ItemCard} from "./card";

export function ListItem({list}) {
    const {texts, lists} = useAppContext();
    const [showForm, setShowForm] = React.useState(false);
    const toggleForm = event => {
        setShowForm(!showForm);
        lists.active = list;
    }
    const [totalCards, setTotalCards] = React.useState(list.cards.length);

    React.useEffect(() => setTotalCards(list.cards.length), [list.cards.length]);
    React.useEffect(() => setShowForm(lists.active?.id === list.id), [lists.active?.id]);

    const items = list.cards.map(card => <ItemCard card={card} key={card.id}/>);

    return (
        <div className="app__list">
            <header>{list.name}</header>
            {items}
            {showForm ?
                <CardForm list={list} toggleForm={setShowForm}/>
                :
                <footer onClick={toggleForm}>
                    {texts.list.actions.card}
                </footer>
            }
        </div>
    );
}