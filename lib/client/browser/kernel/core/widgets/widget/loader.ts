import type {WidgetSpecs} from '../widgets';
import type {BeyondWidgetController} from '../controller/controller';
import {Events} from "../../utils/events/events";

export /*bundle*/
class WidgetControllerLoader extends Events {
    readonly #component: HTMLElement;
    readonly #specs: WidgetSpecs;

    #bundle: any;
    get bundle() {
        return this.#bundle;
    }

    #controller: BeyondWidgetController;
    get controller() {
        return this.#controller;
    }

    #error: string;
    get error() {
        return this.#error;
    }

    readonly #id: string;
    get id() {
        return this.#id;
    }

    #loading: boolean = false;
    get loading() {
        return this.#loading;
    }

    #loaded: boolean = false;
    get loaded() {
        return this.#loaded;
    }

    #holders = new Set(['connected.callback', 'loaded']);

    #initialise = () => {
        const {beyond} = require('../../beyond');
        beyond.import(this.#id).then((bundle: any) => {
            this.#bundle = bundle;
            this.#loading = false;
            this.#loaded = true;
            this.#holders.delete('loaded');
            this.#render();

            this.trigger('controller.loaded');
        }).catch((exc: Error) => {
            console.error(`Error loading widget "${this.#id}"`, exc.stack);
            this.#error = exc.message;
            this.#loading = false;
        });
    }

    constructor(component: HTMLElement) {
        super();
        this.#component = component;
        const {localName} = component;

        const {widgets} = require('../widgets');
        if (!widgets.has(localName)) throw new Error(`Widget name "${localName}" is not registered`);
        const specs = this.#specs = widgets.get(localName);
        this.#id = specs.id;

        this.#initialise();
    }

    #render = () => {
        // Render the widget once the connectedCallback is called and the bundle was imported
        if (this.#holders.size) return;

        const {Controller} = this.#bundle;
        if (!Controller || typeof Controller !== 'function') {
            const message = `Widget "${this.#component.localName}" does not export its Controller`;
            console.error(message);
            this.#error = message;
            return;
        }

        this.#controller = new Controller(this.#component);
        this.#controller.initialise();
    };

    /**
     * Called by the widget to inform the connectedCallback
     */
    connectedCallback() {
        if (!this.#holders.has('connected.callback')) return;
        this.#holders.delete('connected.callback');
        this.#render();
    }
}
