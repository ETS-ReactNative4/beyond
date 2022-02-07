import {beyond, BeyondWidgetControllerSSR} from '@beyond-js/kernel/core/ts';

export async function renderWidget(element: string, props?: Record<string, any>) {
    if (!beyond.widgets.has(element)) {
        return {errors: [`Widget element "${element}" is not registered`]};
    }

    const specs = beyond.widgets.get(element);
    const bundle = await beyond.import(specs.id);

    const {Controller} = bundle;
    if (!Controller || typeof Controller !== 'function') {
        return {errors: [`Widget "${element}" does not export its Controller`]};
    }

    try {
        const controller: BeyondWidgetControllerSSR = new Controller(specs, props);
        await controller.fetch?.();

        const css = controller.bundle.styles.external ? controller.bundle.pathname : void 0;

        const {html, errors} = controller.render(props);
        return {html, errors, css};
    } catch (exc) {
        console.log(exc.stack);
        return {errors: exc.message};
    }
}
