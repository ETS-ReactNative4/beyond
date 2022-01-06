/************
 Processor: ts
 ************/

import * as dependency_0 from '@beyond-js/kernel/core/ts';

// FILE: config\config.d.ts
declare namespace ns_config_config {
    import PagesConfig = ns_config_pages_pages.PagesConfig;
    import LayoutsConfig = ns_config_layouts_layouts.LayoutsConfig;
    const config: {
        readonly "__#45778@#layouts": LayoutsConfig;
        readonly layouts: LayoutsConfig;
        readonly "__#45778@#pages": PagesConfig;
        readonly pages: PagesConfig;
    };
}

// FILE: config\layouts\layout.d.ts
declare namespace ns_config_layouts_layout {
    interface ILayoutConfig {
        name: string;
        layout?: string;
    }

    class LayoutConfig {
        #private;

        get is(): string;

        get element(): string;

        get id(): string;

        get layout(): string;

        constructor(config: ILayoutConfig);
    }
}

// FILE: config\layouts\layouts.d.ts
declare namespace ns_config_layouts_layouts {
    import ILayoutConfig = ns_config_layouts_layout.ILayoutConfig;
    import LayoutConfig = ns_config_layouts_layout.LayoutConfig;

    class LayoutsConfig extends Map<string, LayoutConfig> {
        register(layouts: ILayoutConfig[]): void;
    }
}

// FILE: config\pages\page.d.ts
declare namespace ns_config_pages_page {
    import LayoutConfig = ns_config_layouts_layout.LayoutConfig;

    interface IPageConfig {
        name: string;
        route?: string;
        layout?: string;
    }

    interface IParents {
        error?: string;
        parents?: LayoutConfig[];
    }

    class PageConfig {
        #private;

        get is(): string;

        get element(): string;

        get route(): string;

        get layout(): string;

        constructor(page: IPageConfig);

        /**
         * Returns the ascending layouts
         *
         * @return {{error?: string, parents?: LayoutConfig[]}}
         */
        get parents(): IParents;
    }
}

// FILE: config\pages\pages.d.ts
declare namespace ns_config_pages_pages {
    import IPageConfig = ns_config_pages_page.IPageConfig;
    import PageConfig = ns_config_pages_page.PageConfig;

    interface IPageFound {
        element?: string;
        vars?: Map<string, string>;
    }

    class PagesConfig extends Map<string, PageConfig> {
        #private;

        /**
         * Search for a route (with its vars)
         *
         * @param {string} pathname
         * @return {{element: *, vars: Map<string, string>} | {}}
         */
        find(pathname: string): IPageFound;

        register(pages: IPageConfig[]): void;
    }
}

// FILE: history\history.d.ts
declare namespace ns_history_history {
    import RoutingMode = ns_routing.RoutingMode;

    /**
     * Beyond keeps its own history list
     * @constructor
     */
    class BeyondHistory {
        #private;

        get initial(): number;

        get records(): string[];

        get length(): number;

        get position(): number;

        get current(): string;

        get previous(): string;

        get following(): string;

        replaceState(state: any, title: any, uri: any): void;

        pushState(uri: string, state: any): void;

        constructor(routing: any, Mode: typeof RoutingMode);
    }
}

// FILE: history\position.d.ts
declare namespace ns_history_position {
    /**
     * The position of the navigation is stored this way:
     *      1. In the state of each page (the history.state object), it is stored the position
     *         in which the page is located. To achieve this, the __beyond_navigation_position property
     *         is added to the state object.
     *      2. In the sessionStorage is stored the current position (__beyond_navigation_position)
     */
    class HistoryPosition {
        #private;

        get valid(): boolean;

        /**
         * Returns the position from the history.state
         * @returns {number | undefined}
         */
        get value(): number | undefined;

        /**
         * Check if the position is already stored in the history.state.
         * If it is not, then an error message is shown.
         *
         * @returns {boolean}
         */
        get checkStateIsSet(): boolean;

        /**
         * Set the position in the history.state
         *
         * @param state {any} The state object before being stored in the history.state. In this method
         * the state object will be updated to store the position
         * @param {number} position
         */
        updateState(state: any, position?: number): void;

        /**
         * Stores in the sessionStorage the position getting its value from the history.state
         */
        updateSessionStorageFromState(): void;

        /**
         * Returns the position of the navigation flow from the sessionStorage
         * @returns {string}
         */
        getFromSessionStorage(): number | undefined;

        /**
         * Returns the position of the navigation flow from the history.state.
         * It is equivalent to obtaining this same value directly from the .state property,
         * with the difference that the .state property verifies that the value is stored
         * and displays an error if it is not
         * @returns {any}
         */
        getFromState: () => any;
    }
}

// FILE: history\records.d.ts
declare namespace ns_history_records {
    import HistoryPosition = ns_history_position.HistoryPosition;

    class HistoryRecords {
        #private;

        get data(): string[];

        get length(): number;

        get current(): string;

        get previous(): string;

        get following(): string;

        constructor(position: HistoryPosition);

        get: (index: number) => string;

        /**
         * Push a uri to the records stored in the sessionStorage
         * @param {string} uri
         */
        push(uri: string): void;

        /**
         * Reset the list of records from the current position
         * This is required when:
         *      1. The list of browsed pages is greater than one (ex: page1 and page2)
         *      2. The user goes back in the history (ex: to position 1: page1)
         *      3. The user navigates another page (ex: page3)
         *
         * In step 3 is required this method, to clean the records from position 1, and after this
         * execution, the navigation flow can push page3
         */
        resetFromPosition(): void;

        updateCurrentURI(uri: any): void;
    }
}

// FILE: layouts\child.d.ts
declare namespace ns_layouts_child {
    import LayoutConfig = ns_config_layouts_layout.LayoutConfig;
    import PageInstanceData = ns_pages_data.PageInstanceData;

    class Child {
        #private;

        get element(): string;

        get is(): string;

        get id(): string;

        get layout(): any;

        get children(): any;

        get active(): boolean;

        constructor(config: LayoutConfig | PageInstanceData);

        show(): void;

        hide(): void;
    }
}

// FILE: layouts\layout.d.ts
declare namespace ns_layouts_layout {
    import PageInstanceData = ns_pages_data.PageInstanceData;
    import Child = ns_layouts_child.Child;
    import Events = dependency_0.Events;

    class Layout extends Events {
        #private;

        get children(): Map<string, Child>;

        constructor(parent?: Layout);

        /**
         * Selects a page
         *
         * @param {PageInstanceData} page The page being selected (navigated)
         */
        select(page: PageInstanceData): void;
    }
}

// FILE: manager.d.ts
declare namespace ns_manager {
    import Layout = ns_layouts_layout.Layout;
    import Pages = ns_pages_pages.Pages;
    import URI = ns_uri_uri.URI;

    class Manager {
        #private;

        get main(): Layout;

        get pages(): Pages;

        set(uri: URI): void;
    }
}

// FILE: pages\data.d.ts
declare namespace ns_pages_data {
    import URI = ns_uri_uri.URI;
    import IParents = ns_config_pages_page.IParents;

    class PageInstanceData {
        #private;

        get is(): string;

        get element(): string;

        get id(): string;

        get parents(): IParents;

        uri: URI;

        constructor(element: string);
    }
}

// FILE: pages\pages.d.ts
declare namespace ns_pages_pages {
    import URI = ns_uri_uri.URI;
    import PageInstanceData = ns_pages_data.PageInstanceData;
    type pathname = string;

    class Pages extends Map<pathname, PageInstanceData> {
        find(id: string): PageInstanceData;

        register(uri: URI, element: string): PageInstanceData;
    }
}

// FILE: routing.d.ts
declare namespace ns_routing {
    import URI = ns_uri_uri.URI;
    import config = ns_config_config.config;
    import PageConfig = ns_config_pages_page.PageConfig;
    import Manager = ns_manager.Manager;

    enum RoutingMode {
        Hash = 0,
        Pathname = 1
    }

    class Routing {
        #private;

        get mode(): RoutingMode;

        get config(): typeof config;

        get manager(): Manager;

        get uri(): URI;

        missing: (uri: URI) => Promise<string>;
        redirect: (uri: URI) => Promise<string>;

        get history(): any;

        get initialised(): boolean;

        /**
         * Returns page configuration from an href address
         *
         * @param {string} _uri The uri in string format previous to be parsed
         * @return {Promise<{error?: string, redirected?: string, page?: PageConfig, uri?: URI}>}
         */
        page(_uri: string): Promise<{
            error?: string;
            redirected?: string;
            page?: PageConfig;
            uri?: URI;
        }>;

        setUp(routingMode: RoutingMode): void;

        pushState(uri: string, state?: object): void;

        replaceState(state: object, title: string, uri?: string): void;

        update: () => Promise<void>;
        back: () => void;
    }

    const routing: Routing;
}

// FILE: uri\querystring.d.ts
declare namespace ns_uri_querystring {
    class QueryString extends Map {
        constructor(search: string);
    }
}

// FILE: uri\route.d.ts
declare namespace ns_uri_route {
    import URI = ns_uri_uri.URI;

    class Route {
        #private;

        get element(): string;

        get vars(): Map<string, string>;

        get initialised(): boolean;

        constructor(uri: URI);

        initialise(): Promise<void>;
    }
}

// FILE: uri\uri.d.ts
declare namespace ns_uri_uri {
    import Route = ns_uri_route.Route;
    import QueryString = ns_uri_querystring.QueryString;

    class URI {
        #private;

        get uri(): string;

        get route(): Route;

        get vars(): Map<string, string>;

        get pathname(): string;

        get search(): string;

        get qs(): QueryString;

        get hashtag(): any;

        constructor(uri: string);

        initialise: () => Promise<void>;
    }
}

export import Layout = ns_layouts_layout.Layout;
export import routing = ns_routing.routing;
export import URI = ns_uri_uri.URI;

