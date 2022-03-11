import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class Task extends Events {
    #status: string;
    #finished: boolean;
    #name: string;
    #localstorage: string = 'user.task.';
    #order: number;
    #id: string;

    constructor(task: string) {

        super();
        if (localStorage.getItem(`${this.#localstorage}${task}`)) {
            this._process(task);
            return;
        }

        this.#name = task;
        this._processId();
        this._save();

    }

    private _processId() {
        let id = this.#name.replace(/ /g, '-').toLowerCase();
        let num = Math.random() * (100 - 1) + 1;
        this.#id = `${num}-${id}`;
    }

    private _save() {

        localStorage.setItem(`${this.#localstorage}${this.id}`, JSON.stringify(this.data));
    }

    private _process(id) {
        const data = JSON.parse(localStorage.getItem(`${this.#localstorage}${id}`));
        this.#id = data.id;
        this.#name = data.name;
        this.#finished = data.finished;
        this.#order = parseInt(data.order);
    }

    get finished() {
        return this.#finished;
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
            status: this.#status,
            finished: this.#finished,
            order: this.#order
        }
    }

    set finished(value) {
        if (this.#finished === value) return;
        this.#finished = value;
        this._save();
        this.trigger('change');
    }

    setCompleted(value: boolean) {
        this.#finished = value;
    }

    delete() {
        localStorage.removeItem(`${this.#localstorage}${this.id}`);
        this.#name = undefined;
        this.#id = undefined;
    }
}