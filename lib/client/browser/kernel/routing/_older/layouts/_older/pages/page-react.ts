import {PageContainer} from "./page-container";
import React from "react";
import ReactDOM from "react-dom";
import {Bundle, BundleStyles} from "beyond_libraries/beyond/core/ts";

export /*bundle*/
class ReactPageManager extends PageContainer {
    readonly #bundle: Bundle;
    readonly #component: typeof React.Component;

    readonly #styles: BundleStyles;
    get styles() {
        return this.#styles;
    }

    #css: HTMLStyleElement;
    readonly #shadowRoot: ShadowRoot;

    readonly #container: HTMLElement;
    get container() {
        return this.#container;
    }

    #hmrStylesChanged = () => {
        super.container.shadowRoot.removeChild(this.#css);
        this.#css = this.#styles.css;
        super.container.shadowRoot.appendChild(this.#css);
    };

    /**
     * PageComponent constructor
     *
     * @param {any} props Internally used by beyond routing
     * @param {Bundle} bundle The bundle object
     * @param {typeof React.Component} component The page built as a react component
     */
    constructor(props: any, bundle: Bundle, component: typeof React.Component) {
        super(props);

        this.#bundle = bundle;
        this.#component = component;

        this.#container = document.createElement("div");

        this.#shadowRoot = super.container.attachShadow({mode: 'open'});
        super.container.shadowRoot.appendChild(this.#container);

        // Append styles and setup HMR
        this.#styles = this.#bundle.styles;
        this.#css = this.#styles.css;
        this.#css && super.container.shadowRoot.appendChild(this.#css);

        this.#styles.on('change', this.#hmrStylesChanged);
    }

    render() {
        ReactDOM.render(React.createElement(this.#component), this.#container);
    }

    destroy() {
        ReactDOM.unmountComponentAtNode(this.#container);
        this.#styles.off('change', this.#hmrStylesChanged);
    }
}
