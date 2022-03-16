import {Item, ItemProperty, ItemSpecs, ItemsProperty} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import type {Application} from "../item";
import type {Module} from "../../modules/item";
import type {Bundle} from "../../bundles/item";

interface CreateSpecs {
    filename: string,
    bundle?: string,
    processor?: string,
    type?: 'processor' | 'overwrite' | 'backend'
}

interface BundleSpecs {
    bundles: string,
    name: string,
    route?: string,
    styles?: string,
    layout?: string,
    layoutId?: string
}

interface FieldSpecs {
    title?: string,
    name?: string,
    description?: string,
    hmr?: string,
    transpile?: string
}

interface EditSpecs {
    dirname: string,
    moduleId: string,
    title?: string,
    name?: string,
    description?: string,
    bundle?: string,
    bundles?: { hmr: boolean } | { ts: { transpile: boolean } },
}

/**
 * TODO: The application property is actually undefined.
 * - Load the application property
 * - Set the name of the module checking if the module has one
 *  and if it does not have, return the module.id without the
 *  application id section
 */
export /*bundle*/
class ApplicationModule extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get application(): Application {
        const application = <ItemProperty>this.properties.get('application');
        return application && <Application>application.value;
    }

    get module(): Module {
        const module = <ItemProperty>this.properties.get('module');
        return module && <Module>module.value;
    }

    get bundles(): Map<string, Bundle> {
        return <ItemsProperty>this.properties.get('bundles');
    }

    /*
     * Module shortcuts
     */
    get name(): string {
        const {module} = this;
        return module?.name;
    }

    set name(value: string) {
        this.module && (this.module.name = value);
    }

    get description(): string {
        const {module} = this;
        return module?.description;
    }

    set description(value: string) {
        this.module && (this.module.description = value);
    }

    get route(): string {
        const bundles = <ItemsProperty>this.properties.get('bundles');
        const widget = bundles.get(`${this.id}//widget`);
        return widget?.route;
    }

    /**
     * Metodos migrados desde modulo
     */
    get type() {
        return this.bundles ? [...this.bundles.values()].map(bundle => bundle.name) : undefined;
    }

    get __CLASS__(): String {
        return 'applications-modules'.toLowerCase();
    }

    get processorsNames(): String[] {
        const processors: String[] = [];

        this.bundles.forEach(bundle => {
            bundle.processors.forEach(processor => {
                if (!processors.includes(processor.name))
                    processors.push(processor.name);
            });
        });
        return [...processors];
    }

    constructor(specs: ItemSpecs) {
        super('applications-modules', specs);
    }

    /**
     * Validate that the bundles have the requested processor
     * @param processor
     * @deprecated
     */
    haveProcessor(processor: string = 'ts'): boolean {
        let find = false;
        this.bundles.forEach(bundle => bundle.hasProcessor(processor) ? find = true : null);
        return find;
    }

    getBundle(name: string) {
        let bundle: Bundle | undefined = undefined;
        this.bundles.forEach(item => {
            if (item.name === name) bundle = <Bundle>item;
        });
        return bundle;
    }

    saveField(field: FieldSpecs, value: string | boolean) {
        const specs: EditSpecs = {moduleId: this.id, dirname: this.module.path};

        if (field === 'hmr') specs.bundles = {hmr: <boolean>value};
        else if (field === 'transpile') {
            if (!this.haveProcessor()) return;
            specs.bundles = {ts: {transpile: <boolean>value}};
        } else field === 'title' ? specs.title = <string>value : specs.description = <string>value;

        return module.execute('/builder/module/edit', specs);
    }

    clone(name: string) {
        return module.execute('/builder/module/clone', {
            name: name,
            moduleId: this.id
        });
    }

    delete() {
        if (!this.module.path) {
            console.error('The module not have dirname associate it')
            return;
        }
        return module.execute('/builder/module/delete', {target: this.module.path});
    }

    createFile(specs: CreateSpecs) {
        let id = specs.type === 'backend' ? `${this.id}` : `${this.id}//${specs.bundle}//${specs.processor}`;
        if (specs.type && specs.type === 'overwrite') {
            const split = this.id.split('//');
            id = `${split[1]}//${split[2]}//${specs.bundle}`;
        }

        return module.execute('/sources/create', {
            id: id,
            type: specs.type ?? 'processor',
            filename: specs.filename,
        });
    }

    addBundle(params: BundleSpecs) {
        const specs = {moduleId: this.id, ...params};
        return module.execute('/builder/module/addBundle', specs);
    }
}
