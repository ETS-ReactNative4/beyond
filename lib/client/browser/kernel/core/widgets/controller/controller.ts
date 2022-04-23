import type {BundleStyles} from '../../bundles/styles/styles';
import {instances} from '../../bundles/instances/instances';
import {BeyondWidgetControllerBase, IWidgetStore} from './base';
import {Bundle} from '../../bundles/bundle';
import {ControllerAttributes} from "./attributes";

declare const __beyond_hydrator: {
    getCachedStore: (id: number) => object;
};

/**
 * The client widget react controller
 */
export /*bundle*/
abstract class BeyondWidgetController extends BeyondWidgetControllerBase {
    // The widget component to be mounted (can be a React, Svelte, Vue, ... component)
    get Widget(): any {
        if (super.Widget) return super.Widget;
        return this.bundle.package().exports.values.Widget;
    }

    readonly #component: HTMLElement;
    get component() {
        return this.#component;
    }

    #hydratable = false;
    get hydratable() {
        return this.#hydratable;
    }

    #store: IWidgetStore;
    get store(): IWidgetStore {
        return this.#store;
    }

    #body: HTMLSpanElement;
    get body() {
        return this.#body;
    }

    readonly #attributes: ControllerAttributes;

    protected constructor(component: HTMLElement) {
        super({component});
        this.#component = component;
        this.#attributes = new ControllerAttributes();
    }

    #hmrStylesChanged = (styles: BundleStyles) => {
        const {shadowRoot} = this.component;
        const previous: Node = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];

        previous && shadowRoot.removeChild(previous);
        const css = styles.css();
        css && shadowRoot.appendChild(css);
    };

    #setStyles() {
        // Append styles and setup styles HMR
        const append = (styles: BundleStyles) => {
            const css = styles.css();
            if (!css) return;

            this.component.shadowRoot.appendChild(css);
            styles.on('change', this.#hmrStylesChanged);
        }

        const recursive = (bundle: Bundle): void => bundle.dependencies.forEach(resource => {
            if (!instances.has(resource)) return;

            const dependency = instances.get(resource);
            append(dependency.styles);
            recursive(dependency);
        });

        append(this.bundle.styles);
        recursive(this.bundle);

        // Append the global styles
        const global: HTMLLinkElement = document.createElement('link');

        const {beyond} = require('../../beyond');
        const {baseDir} = beyond;
        global.type = 'text/css';
        global.href = `${baseDir}global.css`;
        global.rel = 'stylesheet';
        this.component.shadowRoot.appendChild(global);
    }

    abstract mount(): void;

    abstract unmount(): void;

    render() {
        if (!this.#hydratable) {
            this.#body = document.createElement('span');
            this.component.shadowRoot.appendChild(this.#body);
            this.#attributes.body = this.#body;
        }

        try {
            this.mount();
        } catch (exc) {
            console.log(`Error mounting widget controller "${this.bundle.id}":`);
            console.log(exc.stack);
        }

        // Once the widget is hydrated, next HMR refreshes are standard render calls
        this.#hydratable = false;
    }

    refresh() {
        this.unmount();
        this.#body?.remove();
        this.#body = undefined;
        this.render();
    }

    #refresh = () => this.refresh();

    initialise() {
        if (!this.Widget) throw new Error(`Widget controller of bundle "${this.bundle.id}" does not expose a Widget property`);

        const {component} = this;
        this.#store = this.createStore?.();

        if (typeof __beyond_hydrator === 'object' && component.hasAttribute('ssr-widget-id')) {
            const hydrator = __beyond_hydrator;
            const id = component.getAttribute('ssr-widget-id');
            const cached = hydrator.getCachedStore(parseInt(id));
            this.#store?.hydrate(cached);

            const {shadowRoot} = this.component;
            this.#body = <HTMLSpanElement>shadowRoot.querySelectorAll(`:scope > span`)[0];
            this.#attributes.body = this.#body;
            this.#hydratable = true;
        } else {
            this.#store?.fetch?.()
                .catch(exc => console.log(exc instanceof Error ? exc.stack : exc));
        }

        this.#setStyles();
        this.render();
        this.bundle.package().hmr.on('change', this.#refresh);
    }
}
