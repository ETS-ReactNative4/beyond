import type {Require} from "../require/require";
import {Trace} from "../require/trace";

type ExportedValues = Record<string, any>;

export class Exports {
    #require: Require;
    #values: ExportedValues = {};
    get values() {
        return this.#values;
    }

    constructor(require: Require) {
        this.#require = require;
    }

    // This method is overridden by the bundle file to process the module exports
    process(require: (id: string) => any) {
        void (require);
    }

    // This method is overridden by the bundle file to processed the managed exports
    managed(require: (id: string) => any, exports: ExportedValues) {
        void (require && exports);
    }

    update() {
        const require = (id: string) => {
            const trace = new Trace();
            trace.register('exports.update', id);
            return this.#require.solve(id, trace);
        }

        this.process(require);
        this.managed(require, this.#values);
    }
}
