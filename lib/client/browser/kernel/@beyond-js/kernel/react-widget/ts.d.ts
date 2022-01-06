/************
 Processor: ts
 ************/

import * as dependency_0 from '@beyond-js/kernel/core/ts';
import * as dependency_1 from '@beyond-js/kernel/routing/ts';

// FILE: controller.d.ts
declare namespace ns_controller {
    import BeyondWidgetController = dependency_0.BeyondWidgetController;

    class ReactWidgetController extends BeyondWidgetController {
        mount(Widget: any): void;

        unmount(): void;

        initialise(): void;
    }
}

// FILE: page.d.ts
declare namespace ns_page {
    import URI = dependency_1.URI;
    import ReactWidgetController = ns_controller.ReactWidgetController;

    class PageReactWidgetController extends ReactWidgetController {
        #private;

        get uri(): URI;

        initialise(): void;
    }
}

// FILE: retarget-events.d.ts
declare namespace ns_retargetevents {
    function retargetEvents(shadowRoot: any): () => void;
}

export import ReactWidgetController = ns_controller.ReactWidgetController;
export import PageReactWidgetController = ns_page.PageReactWidgetController;


export declare const hmr: { on: (event: string, listener: any) => void, off: (event: string, listener: any) => void };