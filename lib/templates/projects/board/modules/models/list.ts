import {Card} from "./card";
import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class List extends Events {
    #name: string;
    #cards: Array<Card> = [];
    #id;
    #localstorage: string = 'user.list.'

    constructor(id: string) {
        super();

        if (localStorage.getItem(`${this.#localstorage}${id}`)) {
            this._processData(id);
            return;
        }
        this.#name = id;
        this.setId();
        this.#cards = [];
    }

    private _processData(id) {
        const data = JSON.parse(localStorage.getItem(`${this.#localstorage}${id}`));
        this.#id = data.id;
        this.#name = data.name;
        this.#cards = data.cards?.map(cardId => new Card(cardId));
    }

    private setId() {
        let id = this.#name.replace(/ /g, '-').toLowerCase();
        let num = Math.round(Math.random() * (500 - 1) + 1);
        this.#id = `${num}-${id}`;
        this._save();
    }

    get cards() {
        return this.#cards;
    }

    getCard(name: string) {
        return this.#cards.find(item => item.name === name);
    }

    add(name: string) {
        this.cards.push(new Card(name, true));
        this._save();
        this.trigger('change');
    }

    _save() {
        localStorage.setItem(`${this.#localstorage}${this.#id}`, JSON.stringify(this.data));
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get data() {
        return {
            id: this.#id,
            name: this.#name,
            cards: this.#cards.map(item => item.id)
        };
    }
}