import React from "react";
import {useAppCardContext} from "./context";

export function Task({task}) {

    const {card, texts} = useAppCardContext();
    const remove = event => {
        event.stopPropagation();
        event.preventDefault();
        card.deleteTask(task.id);
    };

    const finish = event => {
        event.stopPropagation();
        event.preventDefault();
        card.finishTask(task.id);
    };

    return (
        <div key={task.id} className="card__task">
            {task.name}
            <div className="actions">
                {
                    !task.finished &&
                    <button onClick={finish}>{texts.actions.finish}</button>
                }
                <button onClick={remove}>{texts.actions.delete}</button>
            </div>
        </div>
    )
}