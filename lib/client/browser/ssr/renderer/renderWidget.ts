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
        const controller: BeyondWidgetControllerSSR = new Controller({specs});
        const store = controller.createStore?.();
        await store?.fetch();

        const css = controller.bundle.styles.external ? controller.bundle.pathname : void 0;

        const {html, errors} = controller.render(Object.assign({}, props, {store}));
        return {html, errors, css, store};
    } catch (exc) {
        console.error(exc.stack);
        return {errors: exc.message};
    }
}
