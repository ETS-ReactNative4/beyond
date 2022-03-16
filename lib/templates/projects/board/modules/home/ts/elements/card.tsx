import React from "react";
// import {routing} from "@beyond-js/kernel/routing/ts";
import {useAppContext} from "./context";

export function ItemCard({card}) {
    const {container} = useAppContext();
    const onClick = () => {
        beyond.pushState(`/card/${card.id}`);
        window.setTimeout(() => {
            container.classList.add('right-hidden')
            window.setTimeout(() => container.classList.remove('right-hidden'), 200)
        }, 100);
    }

    return <div className="card__item" onClick={onClick} key={card.id}>{card.name}</div>;
}