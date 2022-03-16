import React, {SyntheticEvent} from "react";
import {useAppCardContext} from "./context";
import {Task} from "./task";

export function CardTasks() {

    const {card, texts} = useAppCardContext();
    const finished = [];
    const pending = [];
    card.tasks.forEach((task, i) => {
        const output = task.finished ? finished : pending;
        output.push(<Task task={task} key={task.id}/>)
    });
    return (
        <div className="card__tasks-container">

            {pending}
            {
                (finished.length > 0) &&
                <>
                    <h3>Finalizadas</h3>
                    {finished}
                </>
            }
        </div>
    )
}