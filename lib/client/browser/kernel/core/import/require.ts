import type {Require} from "./requirejs";
import type {beyond} from "../beyond";

declare const amd_require: Require;

declare function cjs_require(module: string): any;

// declare let require: Require;
//TODO: @julio
//TODO: @box

// if (typeof window === "object") {
//     const prevRequire = window.require;
//     (window as any).require = (...params) => {
//         if (!(params[0] instanceof Array)) return prevRequire(...params);
//
//         params[0] = params[0].map(param => param.endsWith('.js') ? `${beyond.baseUrl}/packages/${param}.js` : param);
//         return prevRequire(...params);
//     }
//
//     const prevDefine = window.define;
//     (window as any).define = (...params) => {
//         console.log(0.1, params[0]);
//         if (!(params[0] instanceof Array)) return prevDefine(...params);
//         params[0] = params[0].map(param => param.endsWith('.js') ? `${beyond.baseUrl}/packages/${param}.js` : param);
//         console.log(0.2, params[0])
//         return prevDefine(...params);
//     }
// }

export class BeyondRequire {
    readonly #mode: string;

    constructor(mode: string) {
        this.#mode = mode;
    }

    setup(baseUrl: string) {
        const mode = this.#mode;
        if (mode !== 'amd') throw new Error(`Setup should only be called on amd mode. Actual mode is "${mode}"`);

        baseUrl = `${baseUrl}/packages`;
        amd_require.config({baseUrl});

        amd_require.onError = function (error) {
            if (error.requireType === 'timeout') {
                let modules = error.requireModules;
                for (let module of modules) {
                    amd_require.undef(module);
                }

                // Try again loading modules
                console.log('Retrying to load AMD modules:', modules);
                amd_require(modules, (): null => null);
            } else {
                console.error(error.stack);
            }
        };
    }

    /**
     * Require a module
     * @param module {string} The module to be required
     * @returns {Promise<any>>}
     */
    require(module: string): any | Promise<any> {
        if (this.#mode === 'cjs') {
            return cjs_require(module);
        }

        return new Promise<any>((resolve, reject) => {
            if (typeof module !== "string") throw 'Invalid module parameter';
            module = module.endsWith('.js') ? module.substr(0, module.length - 3) : module;

            const error = new Error(`Error loading or processing module "${module}"`);
            amd_require([module],
                (returned: any) => resolve(returned),
                (exc: Error) => {
                    console.error(`Error loading module "${module}."`, exc.stack);
                    reject(error);
                }
            );
        });
    }

    /**
     * Used only in local environment to support HMR
     *
     * @param {string} module
     * @return {Promise<*>}
     */
    async reload(module: string) {
        const mode = this.#mode;
        if (mode !== 'amd') throw new Error(`This method is only supported in amd mode. Current mode is "${mode}"`);

        amd_require.undef(module);
        return await this.require(module);
    }
}
