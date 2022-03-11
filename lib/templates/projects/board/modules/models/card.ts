import {Task} from "./task";
import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class Card extends Events {
    #name: string;
    #id: string;
    #order: number;
    #tasks: Array<Task> = [];
    #localstorage: string = 'user.data.card.'
    #status;
    #date;
    #exists: boolean;

    constructor(name: string, create: boolean = false) {
        super();

        if (localStorage.getItem(`${this.#localstorage}${name}`)) {
            this.#exists = true;
            this._process(name);
            return;
        }
        this.#name = name;
        this.#exists = create;
        this.setId();
        this._save()
    }

    get exists() {
        return this.#exists;
    }

    private _process(id) {
        const data = JSON.parse(localStorage.getItem(`${this.#localstorage}${id}`));
        this.#id = data.id;
        this.#name = data.name;
        this.#order = data.order;
        this.#tasks = data.tasks.length ? data.tasks.map(task => new Task(task)) : [];
    }

    private setId() {
        let id = this.#name.replace(/ /g, '-').toLowerCase();
        let num = Math.random() * (100 - 1) + 1;
        this.#id = `${num}-${id}`;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get tasks() {
        return this.#tasks;
    }

    get data() {
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks.map(task => task.id)
        };
    }

    private _save() {
        localStorage.setItem(`${this.#localstorage}${this.id}`, JSON.stringify(this.data));
    }

    addTask(task: string) {
        this.#tasks.push(new Task(task));
        this._save();
        this.trigger('change');
    }

    deleteTask(id) {
        const index = this.#tasks.findIndex(task => task.id === id);
        if (index < 0) return;
        const task = this.#tasks[index];
        task.delete();
        this.#tasks.splice(index, 1);
        this._save();
        this.trigger('change');
    }

    finishTask(id) {
        const index = this.#tasks.findIndex(task => task.id === id);
        if (index < 0) return;

        const task = this.#tasks[index];

        task.finished = true;
        this.trigger('change');
    }
}