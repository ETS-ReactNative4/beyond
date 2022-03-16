import React from "react";
import ReactDOM from "react-dom";
import {PageContainer} from "@dependencies/beyond/routing/ts";
import {View} from "./views/view";
import {Card} from "$[scope]$[name]/models/ts";


export /*bundle*/
class Page extends PageContainer {


    render() {


        const card = new Card(this.vdir);

        this.container.classList.add('app-card-module')
        if (!card.exists) this.container.classList.add('empty-module');
        ReactDOM.render(React.createElement(View, {card: card}), this.container);
    }

}
