import React, {SyntheticEvent} from "react";
import type {Card} from "@dependencies/@beyond/models/ts";
import {routing} from "@beyond-js/kernel/routing/ts";
import {module} from "@dependencies/bundle";
import {TaskForm} from "./form";
import {AppCardContext} from "./context";
import {CardTasks} from "./tasks";
import {Empty} from "./empty";

interface IProps {
    card: Card
}

interface IState {
    color?: string,
    items?: Map<string, any>
}


export class View extends React.Component<IProps, IState> {

    card: Card;

    constructor(props) {
        super(props);
        this.card = props.card;
        this.onClick = this.onClick.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState() {
        this.setState({});
    }

    componentWillUnmount() {
        module.texts.bind('change', this.updateState);
        this.card.unbind('change', this.updateState);
    }

    componentDidMount() {
        module.texts.bind('change', this.updateState);
        this.card.bind('change', this.updateState);

    }

    onClick(event: SyntheticEvent) {
        const target = event.currentTarget;
        if (!target.getAttribute('data-link')) return;
        routing.pushState(target.getAttribute('data-link'));
    }


    render() {

        if (!module.texts.ready) return null;
        const {card} = this;
        const texts = module.texts.value;

        const value = {
            card: card,
            totalTasks: card.tasks.length,
            texts: texts
        };


        if (!card.exists) return <Empty texts={texts}/>;

        return (
            <AppCardContext.Provider value={value}>
                <ul className="card__breadcrumb">
                    <li onClick={this.onClick} data-link="/">Home</li>
                    <li onClick={this.onClick}>{card.name}</li>
                </ul>
                <div className="card__content">
                    <h1>{card.name}</h1>
                    <CardTasks/>
                </div>
                <TaskForm/>
            </AppCardContext.Provider>
        );
    }

}
