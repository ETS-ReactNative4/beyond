import {List} from "./list";
import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class Lists extends Events {
    #localstorage: string = 'app.todo.lists';
    #items: Map<string, List>;
    #active: List;

    constructor() {
        super();
        const data = localStorage.getItem(this.#localstorage);
        this.#items = new Map();
        if (data) this._processData();

        window.l = this;
    }

    get items() {
        return this.#items;
    }

    add(name: string) {

        if (this.#items.has(name)) {
            throw new Error(`A list ${name} already exists`);
        }
        const list = new List(name);
        this.#items.set(list.id, list);
        this._save();
        this.trigger('change');
    }

    get keys() {
        return [...this.items.keys()];
    }

    get active() {
        return this.#active;
    }

    set active(value: List) {
        if (value.id === this.#active) return;
        this.#active = value;
        this.trigger('change');
    }

    private _save() {
        const values = JSON.stringify({
            active: this.#active?.id,
            items: [...this.#items].map(list => list[0])
        });
        localStorage.setItem(this.#localstorage, values);
    }

    private _processData() {
        try {
            const data = JSON.parse(localStorage.getItem(this.#localstorage));
            data.items.forEach(itemId => this.#items.set(itemId, new List(itemId)));
        } catch (e) {
            console.log(e)
        }

    }
}