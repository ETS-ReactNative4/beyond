import React, {DOMElement} from "react";
import {module} from "beyond_context";
import {Lists} from "$[scope]$[name]/models/ts";
import {ListForm} from "./elements/list-form";
import {AppContext} from "./elements/context";
import {ListItem} from "./elements/list";

interface IProps {
    container: DOMElement<any, any>
}

interface IState {
    color?: string,
    items?: Map<string, any>
}

export /*bundle*/
class Widget extends React.Component<IProps, IState> {
    #lists: Lists;

    constructor(props) {
        super(props);
        this.#lists = new Lists();
        this.state = {items: this.#lists.items};
        this.updateState = this.updateState.bind(this);
        this.createList = this.createList.bind(this);
    }

    updateState() {
        this.setState({});
    }

    componentDidMount() {
        module.texts.bind('change', this.updateState);
        this.#lists.bind('change', this.updateState);
    }

    componentWillUnmount() {
        module.texts.unbind('change', this.updateState);
        this.#lists.bind('change', this.updateState);
    }

    createList(list: string) {
        this.#lists.add(list);
        this.setState({items: this.#lists.items});
    }

    render() {
        if (!module.texts.ready) return <h3>Cargando</h3>;

        const texts = module.texts.value;
        const {items} = this.state;

        const value = {
            container: this.props.container,
            texts: texts,
            lists: this.#lists,
            active: this.#lists.active?.id,
            createList: this.createList
        };

        const output = [];
        items.forEach((list, id) => output.push(<ListItem list={list} key={id}/>));

        return (
            <AppContext.Provider value={value}>
                <div className="app-todo-container">
                    <h3>{texts.title}</h3>
                    <ListForm/>
                    <div className="app__lists-container">
                        {output}
                    </div>
                </div>
            </AppContext.Provider>
        );
    }
}