import {Events} from "../utils/events/events";

export class BeyondWidgetAttributes extends Events {
    #values: Map<string, string> = new Map();
    get values() {
        return this.#values;
    }

    add(name: string, value: string) {
        this.#values.set(name, value);
        this.trigger('add', name, value);
        this.trigger('change');
    }

    remove(name: string) {
        this.#values.delete(name);
        this.trigger('remove', name);
        this.trigger('change');
    }
}

export const attributes = new BeyondWidgetAttributes();
