/**
 * Represents a module that could be create and only has a bundle
 */
class ModuleBundle extends ReactiveModel {
    _id;
    get id() {
        return `${this.moduleId}//${this._type}`;
    }

    get moduleId() {
        return `project//${this._applicationId}//${this.name.replace(/ /g, '-')}`;
    }

    _type;
    get type() {
        return this._type;
    }

    _name;
    get name() {
        return this._name ?? '';
    }

    _error;
    get error() {
        return this._error;
    }

    _vdir;
    get vdir() {
        return this._vdir ?? 0;
    }

    _structure;
    get structure() {
        return this._structure;
    }

    _route = "/";
    get route() {
        return this._route;
    }

    _txt;

    _author;
    _developer;
    _title;
    _description;
    _styles;
    _fields;
    _layoutId;
    _element;
    _applicationId;
    _server = false;
    _multilanguage = false;
    _processors = new Map();
    /**
     * Define if the module to create is a predefined template.
     * @private
     */
    _template;

    get valid() {
        const structure = this._structure;
        if (!structure.required) return true;

        const keepEmpty = structure.required.filter(property => !this[`_${property}`]);
        return !keepEmpty.length;
    }

    constructor(applicationId) {
        super();
        this._applicationId = applicationId;
    }

    set type(type) {
        if (type === this._type) return;
        this._type = type;
        if (!this._type) return this.triggerEvent();
        this._structure = Structures[this._type];
        this._fields = Structures.module.fields.concat(this._structure.fields);
        this.triggerEvent();
    }

    get template() {
        return this._template;
    }

    set template(template) {
        if (template === this._template) return;
        this._template = template;
        this.triggerEvent();
    }

    set(property, value) {
        this._set(property, value);
    }

    setMultilanguage(value) {
        if (value === this._multilanguage) return;
        this._multilanguage = value;
        this.triggerEvent();
    }

    addProcessor(value) {
        if (this._processors.has(value)) return;
        this._processors.set(value, true);
        this.triggerEvent();
    }

    removeProcessor(value) {
        if (!this._processors.has(value)) return;
        this._processors.delete(value);
        this.triggerEvent();
    }

    async publish() {
        const params = {};
        this._fields.forEach(field => {
            const key = `_${field}`;
            if (this[key]) params[field] = this[key];
        });
        if (params.element) params.element = {name: params.element};
        if (this._type === 'layout') params.id = params.name;

        try {
            this._set({fetching: true, error: undefined});
            params.applicationId = this._applicationId;
            params.bundles = [this._type];
            params.processors = Array.from(this._processors.keys());

            const action = params.template ? '/builder/module/clone' : '/builder/module/create';
            this._styles && params.processors.push('scss');

            const response = await module.execute(action, params);
            if (response.error) {
                this._set({error: response.error});
                return response;
            }
            this._set({fetching: false});
            return true;
        }
        catch (exc) {
            console.error(1, exc);
        }
    }
}
