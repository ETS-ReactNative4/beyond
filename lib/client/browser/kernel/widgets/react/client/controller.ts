import * as React from "react";
import * as ReactDOM from "react-dom";
import {retargetEvents} from "./retarget-events";
import {BeyondWidgetController} from '@beyond-js/kernel/core/ts';

export /*bundle*/
abstract class ReactWidgetController extends BeyondWidgetController {
    mount(Widget: any) {
        // Render the widget
        ReactDOM.render(React.createElement(Widget, {
            component: this.component,
            store: this.store
        }), this.body);
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.body);
    }

    initialise() {
        this.component.localName === 'main-layout' && retargetEvents(this.component.shadowRoot);
        super.initialise();
    }
}
