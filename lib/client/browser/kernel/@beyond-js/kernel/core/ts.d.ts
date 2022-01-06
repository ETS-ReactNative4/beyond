/************
 Processor: ts
 ************/

import * as dependency_0 from 'socket.io';

// FILE: _prepare-stack-trace\error.d.ts
declare namespace ns__preparestacktrace_error {
    interface CallSite {
        isNative: () => boolean;
        getFileName: () => string;
        getLineNumber: () => number;
        getColumnNumber: () => number;
    }

    const prepareStackTrace: (Error: any) => void;
}

// FILE: application\application.d.ts
declare namespace ns_application_application {
    import Beyond = ns_beyond.Beyond;
    import ILanguagesConfig = ns_application_languages.ILanguagesConfig;
    import Languages = ns_application_languages.Languages;
    import Modules = ns_modules_modules.Modules;
    import PackageData = ns_package_data.PackageData;
    import IServiceConfig = ns_service_service.IServiceConfig;
    import Service = ns_service_service.Service;

    interface IApplicationConfig extends IServiceConfig {
        package: string;
        version: string;
        layout: string;
        params: object;
        languages: ILanguagesConfig;
    }

    class Application extends Service {
        #private;

        get is(): string;

        constructor(beyond: Beyond);

        get package(): PackageData;

        get id(): string;

        get version(): string;

        get layout(): string;

        get modules(): Modules;

        get externals(): Modules;

        get params(): object;

        get languages(): Languages;

        setup(config: IApplicationConfig): void;
    }
}

// FILE: application\languages.d.ts
declare namespace ns_application_languages {
    import Events = ns_utils_events_events.Events;

    interface ILanguagesConfig {
        default: string;
        supported: string[];
    }

    class Languages extends Events {
        #private;

        get supported(): Set<string>;

        get default(): string;

        get current(): string;
        set current(value: string);

        constructor(config: ILanguagesConfig);
    }
}

// FILE: base\package.d.ts
declare namespace ns_base_package {
    import IMSpecs = ns_bundles_package_ims_im.IMSpecs;

    function resolve(source: string, id: string): string;

    /**
     * This class is used only by beyond/core
     */
    class BeyondPackage {
        #private;

        constructor(ims?: Map<string, IMSpecs>);

        /**
         * Solve the require function
         *
         * @param source {string} The module from where the require is being triggered
         * @param id {string} The module id being requested
         * @returns {*}
         */
        require(id: string, source?: string): any;
    }
}

// FILE: beyond.d.ts
declare namespace ns_beyond {
    import Application = ns_application_application.Application;
    import IApplicationConfig = ns_application_application.IApplicationConfig;
    import Libraries = ns_libraries_libraries.Libraries;
    import Collection = ns_utils_collection_collection.Collection;
    import widgets = ns_widgets_widgets.widgets;
    import BundlesInstances = ns_bundles_instances_instances.BundlesInstances;
    import Dependencies = ns_bundles_instances_dependencies.Dependencies;
    import Packages = ns_packages_packages.Packages;
    import MessageSpec = ns_toast_toast.MessageSpec;
    import ILibraryConfig = ns_libraries_library.ILibraryConfig;

    interface IBeyondDistribution {
        key?: string;
        local?: boolean;
        baseUrl: string;
        environment: string;
        mode?: string;
    }

    type TPackages = [
        string,
        {
            errors: string[];
            filename: string;
        }
    ][];

    interface IBeyondConfig {
        distribution: IBeyondDistribution;
        packages?: TPackages;
        application?: IApplicationConfig;
        libraries?: ILibraryConfig[];
    }

    class Beyond {
        #private;

        get packages(): Packages;

        get application(): Application;

        get libraries(): Libraries;

        get bundles(): BundlesInstances;

        get transversals(): {
            "__#19@#transversals": Map<string, ns_transversals_transversal.Transversal>;
            has(name: string, language: string): boolean;
            obtain(name: string, language: string, deps?: ns_bundles_instances_dependencies.IDependencies): ns_transversals_transversal.Transversal;
        };

        get dependencies(): Dependencies;

        get local(): boolean;

        get distribution(): string;

        get environment(): string;

        get params(): object;

        get languages(): ns_application_languages.Languages;

        get mode(): string;

        get baseUrl(): string;

        import: (module: string) => Promise<any>;
        reload: (module: string, version: number) => Promise<any>;
        require: (module: string) => Promise<any>;

        get widgets(): typeof widgets;

        get Collection(): typeof Collection;

        setup(distribution: IBeyondDistribution, packages?: TPackages): void;

        rpc: {
            prepare: () => void;
        };
        showMessage: (specs: MessageSpec, duration?: number) => string;
        showConnectionError: (callback: () => void) => string;
        showWarning: (text: string, duration: number) => string;
        removeMessage: (id: string) => void;
    }

    const beyond: Beyond;
}

// FILE: bundles\bundle.d.ts
declare namespace ns_bundles_bundle {
    import Container = ns_bundles_bundles.Container;
    import BeyondWidget = ns_widgets_widget.BeyondWidget;
    import BundleStyles = ns_bundles_styles.BundleStyles;
    import Package = ns_bundles_package_package.Package;
    import IDependencies = ns_bundles_instances_dependencies.IDependencies;
    import Dependencies = ns_bundles_dependencies.Dependencies;

    class Bundle extends Map<string, Package> {
        #private;

        get container(): Container;

        get name(): string;

        get multilanguage(): boolean;

        package(language?: string): Package;

        get id(): string;

        get dependencies(): Dependencies;

        get styles(): BundleStyles;

        get widget(): BeyondWidget;
        set widget(value: BeyondWidget);

        constructor(container: Container, name: string, multilanguage: boolean, deps?: IDependencies);
    }
}

// FILE: bundles\bundles.d.ts
declare namespace ns_bundles_bundles {
    import Library = ns_libraries_library.Library;
    import Module = ns_modules_module.Module;
    import IDependencies = ns_bundles_instances_dependencies.IDependencies;
    import Bundle = ns_bundles_bundle.Bundle;
    type Container = Module | Library;

    class Bundles extends Map<string, Bundle> {
        #private;

        get container(): Container;

        constructor(container: Container);

        obtain(name: string, multilanguage: boolean, deps?: IDependencies): Bundle;
    }
}

// FILE: bundles\dependencies.d.ts
declare namespace ns_bundles_dependencies {
    import IDependencies = ns_bundles_instances_dependencies.IDependencies;

    class Dependencies extends Set<string> {
        update(dependencies: IDependencies): void;
    }
}

// FILE: bundles\instances\dependencies.d.ts
declare namespace ns_bundles_instances_dependencies {
    type Dependency = Record<string, any>;
    type IDependencies = Map<string, Dependency>;

    class Dependencies extends Map<string, Dependency> {
        register(dependencies: IDependencies): void;
    }

    const dependencies: Dependencies;
}

// FILE: bundles\instances\instances.d.ts
declare namespace ns_bundles_instances_instances {
    import IDependencies = ns_bundles_instances_dependencies.IDependencies;
    import Bundle = ns_bundles_bundle.Bundle;
    import IProcessorsSpecs = ns_modules_module.IProcessorsSpecs;

    class BundlesInstances extends Map<string, Bundle> {
        obtain(id: string, multilanguage: boolean, specs: IProcessorsSpecs, dependencies?: IDependencies): Bundle;
    }

    const instances: BundlesInstances;
}

// FILE: bundles\package\exports\exports.d.ts
declare namespace ns_bundles_package_exports_exports {
    import Require = ns_bundles_package_require_require.Require;
    type ExportedValues = Record<string, any>;

    class Exports {
        #private;

        get values(): ExportedValues;

        constructor(require: Require);

        process(require: (id: string) => any, exports: ExportedValues): void;

        update(): void;
    }
}

// FILE: bundles\package\hmr\hmr.d.ts
declare namespace ns_bundles_package_hmr_hmr {
    import Package = ns_bundles_package_package.Package;
    import Events = ns_utils_events_events.Events;

    class HMR extends Events {
        #private;

        constructor(pkg: Package);
    }
}

// FILE: bundles\package\ims\im.d.ts
declare namespace ns_bundles_package_ims_im {
    import Package = ns_bundles_package_package.Package;
    import Require = ns_bundles_package_require_require.Require;
    import Trace = ns_bundles_package_require_trace.Trace;
    type Exports = Record<string, any>;
    type IMWrapperFunction = (rq: (id: string) => any, exports: Exports, trace?: Trace) => void;
    type IMSpecs = {
        hash: number;
        creator: IMWrapperFunction;
    };

    class InternalModule {
        #private;

        get package(): Package;

        get id(): string;

        get hash(): number;

        get created(): boolean;

        require(trace: Trace, source: InternalModule): Exports;

        initialise(): void;

        update(creator: IMWrapperFunction): void;

        constructor(pkg: Package, id: string, hash: number, creator: IMWrapperFunction, require: Require);
    }
}

// FILE: bundles\package\ims\ims.d.ts
declare namespace ns_bundles_package_ims_ims {
    import Package = ns_bundles_package_package.Package;
    import Require = ns_bundles_package_require_require.Require;
    import Trace = ns_bundles_package_require_trace.Trace;
    import InternalModule = ns_bundles_package_ims_im.InternalModule;
    import IMWrapperFunction = ns_bundles_package_ims_im.IMWrapperFunction;
    import Exports = ns_bundles_package_ims_im.Exports;
    type Creators = Map<string, {
        hash: number;
        creator: IMWrapperFunction;
    }>;

    class InternalModules {
        #private;

        constructor(pkg: Package);

        set _require(value: Require);

        register(ims: Creators): void;

        require(id: string, trace: Trace, source: InternalModule): Exports;

        initialise(): void;

        update(ims: Creators): void;
    }
}

// FILE: bundles\package\package.d.ts
declare namespace ns_bundles_package_package {
    import Bundle = ns_bundles_bundle.Bundle;
    import Creators = ns_bundles_package_ims_ims.Creators;
    import InternalModules = ns_bundles_package_ims_ims.InternalModules;
    import Exports = ns_bundles_package_exports_exports.Exports;
    import HMR = ns_bundles_package_hmr_hmr.HMR;

    class Package {
        #private;

        get bundle(): Bundle;

        get language(): string;

        get multilanguage(): boolean;

        get ims(): InternalModules;

        get hmr(): HMR;

        get exports(): Exports;

        constructor(bundle: Bundle, language: string);

        get initialised(): boolean;

        initialise(ims?: Creators): void;

        update(ims: Creators): void;
    }
}

// FILE: bundles\package\require\require.d.ts
declare namespace ns_bundles_package_require_require {
    import Package = ns_bundles_package_package.Package;
    import InternalModule = ns_bundles_package_ims_im.InternalModule;
    import Trace = ns_bundles_package_require_trace.Trace;

    class Require {
        #private;

        constructor(pkg: Package);

        /**
         * Solve a cjs require function
         *
         * @param {string} id The id of the internal module being required
         * @param {Trace} trace {object} The internal trace to find cyclical dependencies of internal modules
         * @param {InternalModule=} im The internal module that is making the call
         * @return {*}
         */
        solve(id: string, trace: Trace, im?: InternalModule): any;
    }
}

// FILE: bundles\package\require\trace.d.ts
declare namespace ns_bundles_package_require_trace {
    interface RequireTrace {
        source: string;
        id: string;
    }

    class Trace extends Array<RequireTrace> {
        has: (id: string) => RequireTrace;

        register(source: string, id: string): void;
    }
}

// FILE: bundles\styles.d.ts
declare namespace ns_bundles_styles {
    import Bundle = ns_bundles_bundle.Bundle;
    import Events = ns_utils_events_events.Events;

    class BundleStyles extends Events {
        #private;
        processor: string;

        get bundle(): Bundle;

        get id(): string;

        get version(): number;

        get appended(): boolean;

        set value(value: string);

        css(): HTMLStyleElement;

        constructor(bundle: Bundle);

        appendToDOM(is: string): void;
    }
}

// FILE: import\import.d.ts
declare namespace ns_import_import {
    import Packages = ns_packages_packages.Packages;

    class BeyondImport {
        #private;

        constructor(packages: Packages, mode: string, baseUrl: string);

        /**
         * Import a module with baseURL resolution
         *
         * @param module {string} The module to be imported
         * @param version {number} The version required by hmr to update a bundle's processor
         * @returns {Promise<*>}
         */
        import(module: string, version?: number): Promise<any>;

        /**
         * Used only in local environment to support HMR
         *
         * @param {string} module The module to be loaded
         * @param {number} version
         * @return {Promise<*>}
         */
        reload(module: string, version: number): Promise<any>;

        require(module: string): Promise<any>;
    }
}

// FILE: import\require.d.ts
declare namespace ns_import_require {
    class BeyondRequire {
        #private;

        constructor(mode: string);

        setup(baseUrl: string): void;

        /**
         * Require a module
         * @param module {string} The module to be required
         * @returns {Promise<any>>}
         */
        require: (module: string) => Promise<any>;

        /**
         * Used only in local environment to support HMR
         *
         * @param {string} module
         * @return {Promise<*>}
         */
        reload(module: string): Promise<any>;
    }
}

// FILE: import\requirejs.d.ts
declare namespace ns_import_requirejs {
    interface Require {
        config: (config: any) => void;

        (modules: string[], ready: Function, errback?: Function): void;

        onError(err: any, errback?: (err: any) => void): void;

        undef(module: string): void;
    }
}

// FILE: libraries\libraries.d.ts
declare namespace ns_libraries_libraries {
    import Library = ns_libraries_library.Library;
    import ILibraryConfig = ns_libraries_library.ILibraryConfig;
    import Beyond = ns_beyond.Beyond;

    class Libraries extends Map<string, Library> {
        #private;

        register(libraries: ILibraryConfig[]): void;

        constructor(beyond: Beyond);
    }
}

// FILE: libraries\library.d.ts
declare namespace ns_libraries_library {
    import PackageData = ns_package_data.PackageData;
    import Service = ns_service_service.Service;
    import IServiceConfig = ns_service_service.IServiceConfig;
    import Modules = ns_modules_modules.Modules;
    import Bundles = ns_bundles_bundles.Bundles;
    import Beyond = ns_beyond.Beyond;

    interface ILibraryConfig extends IServiceConfig {
        package: string;
        version?: string;
    }

    class Library extends Service {
        #private;

        get is(): string;

        get package(): PackageData;

        get id(): string;

        get version(): string;

        get modules(): Modules;

        get bundles(): Bundles;

        constructor(beyond: Beyond, config: ILibraryConfig);
    }
}

// FILE: modules\module.d.ts
declare namespace ns_modules_module {
    import ModuleTexts = ns_modules_texts.ModuleTexts;
    import Bundles = ns_bundles_bundles.Bundles;
    import Application = ns_application_application.Application;
    import Library = ns_libraries_library.Library;
    import PackageData = ns_package_data.PackageData;
    import Socket = dependency_0.Socket;
    type Container = Application | Library;

    interface IProcessorsSpecs {
        txt?: {
            multilanguage: boolean;
        };
    }

    class Module {
        #private;

        get is(): string;

        get container(): Container;

        get package(): PackageData;

        get id(): string;

        get bundles(): Bundles;

        get socket(): Promise<Socket>;

        get texts(): ModuleTexts<any>;

        execute(path: string, params?: object): Promise<unknown>;

        /**
         * Module constructor
         *
         * @param {string} id The module id
         * @param {IProcessorsSpecs} processors Processors specification (actually only txt is supported)
         * @param {Container} container Can be a library, an application or undefined (external modules)
         */
        constructor(id: string, processors: IProcessorsSpecs, container?: Container);
    }
}

// FILE: modules\modules.d.ts
declare namespace ns_modules_modules {
    import Module = ns_modules_module.Module;
    import Container = ns_modules_module.Container;
    import IProcessorsSpecs = ns_modules_module.IProcessorsSpecs;

    class Modules extends Map<string, Module> {
        #private;

        get container(): Container;

        constructor(container?: Container);

        obtain(id: string, specs: IProcessorsSpecs): Module;
    }
}

// FILE: modules\texts.d.ts
declare namespace ns_modules_texts {
    import Module = ns_modules_module.Module;
    import Events = ns_utils_events_events.Events;

    class ModuleTexts<TextsDeclaration> extends Events {
        #private;

        get id(): string;

        get multilanguage(): boolean;

        get value(): TextsDeclaration;

        get enabled(): boolean;
        set enabled(value: boolean);

        get loaded(): boolean;

        get loading(): string;

        get ready(): boolean;

        get language(): string;

        /**
         * Module texts constructor
         *
         * @param {Module} module The module that holds the texts bundle
         * @param {string} bundle The bundle name
         * @param {boolean=true} multilanguage
         */
        constructor(module: Module, bundle: string, multilanguage?: boolean);

        load(): Promise<void>;

        destroy(): void;
    }
}

// FILE: package\data.d.ts
declare namespace ns_package_data {
    class PackageData {
        #private;

        get id(): string;

        get scope(): string;

        get name(): string;

        /**
         * Package data constructor
         *
         * @param {string} id The id of the application, library or module
         */
        constructor(id: string);
    }
}

// FILE: packages\packages.d.ts
declare namespace ns_packages_packages {
    class Packages extends Set<string> {
        register(pkg: string, path?: string): void;
    }
}

// FILE: service\action.d.ts
declare namespace ns_service_action {
    import Module = ns_modules_module.Module;
    import PendingPromise = ns_utils_pendingpromise_pendingpromise.PendingPromise;

    class Action<Params, Response> {
        #private;

        get path(): string;

        get params(): Params;

        constructor(module: Module, path: string, params?: Params);

        get id(): number;

        get channel(): string;

        get executed(): boolean;

        get executing(): boolean;

        get error(): boolean;

        execute(): PendingPromise<unknown>;
    }
}

// FILE: service\actions-bridge.d.ts
declare namespace ns_service_actionsbridge {
    import Module = ns_modules_module.Module;

    class ActionsBridge {
        #private;

        constructor(module: Module);

        execute(action: string, ...params: any[]): any;
    }
}

// FILE: service\execution-error.d.ts
declare namespace ns_service_executionerror {
    interface StackFrame {
        is: string;
        file: string;
        line: number;
        column: number;
    }

    type Stack = StackFrame[];
    const ExecutionError: {
        new(message: string, stack: Stack): {
            "__#5@#message": string;
            readonly message: string;
            readonly "__#5@#stack": Stack;
            readonly stack: Stack;
        };
    };
}

// FILE: service\initiator.d.ts
declare namespace ns_service_initiator {
    import Service = ns_service_service.Service;

    /**
     * Service launcher required only in local development environment
     */
    class Initiator {
        #private;

        constructor(service: Service);

        check(): Promise<void>;
    }
}

// FILE: service\io.d.ts
declare namespace ns_service_io {
    class ServiceIOConfiguration {
        querystring: () => object;
    }
}

// FILE: service\service.d.ts
declare namespace ns_service_service {
    import PackageData = ns_package_data.PackageData;
    import Socket = dependency_0.Socket;
    import ServiceIOConfiguration = ns_service_io.ServiceIOConfiguration;

    interface ILocalConfig {
        id: string;
    }

    interface IServiceConfig {
        connect?: boolean;
        local?: ILocalConfig;
        host?: string;
    }

    interface Service {
        is: string;
        package: PackageData;
    }

    abstract class Service {
        #private;

        get io(): ServiceIOConfiguration;

        get connect(): boolean;

        get host(): string;

        get local(): ILocalConfig;

        getSocket(): Promise<Socket | undefined>;

        get socket(): Promise<Socket | undefined>;

        setup(config: IServiceConfig): void;
    }
}

// FILE: toast\messages.d.ts
declare namespace ns_toast_messages {
    enum MessageType {
        "GeneralMessage" = 0,
        "GeneralError" = 1,
        "ConnectionError" = 2,
        "Warning" = 3
    }

    interface Message {
        id: string;
        type: MessageType;
        text?: string;
        duration: number;
        close?: boolean;
        retry?: () => void;
    }

    class Messages {
        #private;

        get keys(): string[];

        get first(): Message;

        set(message: Message): void;

        has: (id: string) => boolean;
        get: (id: string) => Message;

        typeExists(type: MessageType): boolean;

        delete(message: Message | string): void;
    }
}

// FILE: toast\toast.d.ts
declare namespace ns_toast_toast {
    import Events = ns_utils_events_events.Events;
    import Message = ns_toast_messages.Message;
    import MessageType = ns_toast_messages.MessageType;

    interface MessageSpecObject {
        id?: string | undefined;
        type: MessageType;
        text?: string;
        duration?: number;
        close?: boolean;
        retry?: () => void;
    }

    type MessageSpec = MessageSpecObject | string;

    class Toast extends Events {
        #private;

        get MessageType(): typeof MessageType;

        showMessage(specs: MessageSpec, duration?: number): string;

        removeMessage(id: Message | string): void;

        retry(): void;

        close(): void;
    }
}

// FILE: transversals\bundle.d.ts
declare namespace ns_transversals_bundle {
    import Transversal = ns_transversals_transversal.Transversal;
    import Bundle = ns_bundles_bundle.Bundle;
    import Package = ns_bundles_package_package.Package;
    import Creators = ns_bundles_package_ims_ims.Creators;
    import IProcessorsSpecs = ns_modules_module.IProcessorsSpecs;
    type BundleWrapperFnc = (transversal: Transversal, bundle: Bundle, __pkg: Package) => Creators;
    type BundleSpecs = {
        hash: number;
        creator: BundleWrapperFnc;
    };

    class TransversalBundle {
        #private;

        get transversal(): Transversal;

        get id(): string;

        get hash(): number;

        get specs(): IProcessorsSpecs;

        get created(): boolean;

        initialise(): void;

        constructor(transversal: Transversal, id: string, hash: number, specs: IProcessorsSpecs, creator: BundleWrapperFnc);
    }
}

// FILE: transversals\bundles.d.ts
declare namespace ns_transversals_bundles {
    import BundleWrapperFnc = ns_transversals_bundle.BundleWrapperFnc;
    import TransversalBundle = ns_transversals_bundle.TransversalBundle;
    import Transversal = ns_transversals_transversal.Transversal;
    import IProcessorsSpecs = ns_modules_module.IProcessorsSpecs;
    type Creators = Map<string, {
        hash: number;
        specs: IProcessorsSpecs;
        creator: BundleWrapperFnc;
    }>;

    class Bundles extends Map<string, TransversalBundle> {
        #private;

        constructor(transversal: Transversal);

        initialise(bundles: Creators): void;
    }
}

// FILE: transversals\transversal.d.ts
declare namespace ns_transversals_transversal {
    import Bundles = ns_transversals_bundles.Bundles;
    import Creators = ns_transversals_bundles.Creators;
    import IDependencies = ns_bundles_instances_dependencies.IDependencies;

    class Transversal {
        #private;

        get name(): string;

        get language(): string;

        get multilanguage(): boolean;

        get bundles(): Bundles;

        get dependencies(): IDependencies;

        constructor(name: string, language?: string, dependencies?: IDependencies);

        initialise(bundles: Creators): void;
    }
}

// FILE: transversals\transversals.d.ts
declare namespace ns_transversals_transversals {
    import Transversal = ns_transversals_transversal.Transversal;
    import IDependencies = ns_bundles_instances_dependencies.IDependencies;
    const transversals: {
        "__#19@#transversals": Map<string, Transversal>;
        has(name: string, language: string): boolean;
        obtain(name: string, language: string, deps?: IDependencies): Transversal;
    };
}

// FILE: utils\collection\collection.d.ts
declare namespace ns_utils_collection_collection {
    /**
     * Custom collection
     */
    class Collection<V> {
        #private;

        get map(): Map<string, V>;

        get entries(): IterableIterator<[
            string,
            V
        ]>;

        get keys(): IterableIterator<string>;

        get values(): IterableIterator<V>;

        get size(): number;

        has: (key: string) => boolean;
        get: (key: string) => V;
        forEach: (callback: (value: V, key: string, map: Map<string, V>) => void) => void;
        bind: (child: any) => void;

        /**
         * Constructor
         * @param {any} child The child instance
         * @param {any[]} entries The initial entries of the collection
         */
        constructor(child: any, entries?: [
            string,
            V
        ][]);

        set: (key: string, value: V) => Map<string, V>;
        delete: (key: string) => boolean;
        replace: (map: Map<string, V>) => Map<string, V>;
        clean: () => Map<string, V>;
    }
}

// FILE: utils\events\events.d.ts
declare namespace ns_utils_events_events {
    import EventsSpecs = ns_utils_events_types.EventsSpecs;
    import ListenerFunction = ns_utils_events_types.ListenerFunction;
    import Trigger = ns_utils_events_types.Trigger;

    class Events {
        #private;

        get destroyed(): boolean;

        constructor(specs?: EventsSpecs);

        /**
         * Binds an event handler to an event name
         *
         * @param {string} event
         * @param {ListenerFunction} listener
         * @param {number} priority
         * @returns {this}
         */
        on(event: string, listener: ListenerFunction, priority?: number): this;

        bind: (event: string, listener: ListenerFunction, priority?: number) => this;

        /**
         * Unbind an event listener
         *
         * @param {string} event
         * @param {ListenerFunction} listener
         * @param {number} force
         * @returns {this}
         */
        off(event: string, listener: ListenerFunction, force?: number): this;

        unbind: (event: string, listener: ListenerFunction, force?: number) => this;

        /**
         * Triggers an event
         *
         * @param {Trigger} event
         * @param {any} rest
         * @returns {Promise<any>}
         */
        trigger(event: Trigger, ...rest: any): any;

        destroy(): void;
    }
}

// FILE: utils\events\types.d.ts
declare namespace ns_utils_events_types {
    interface Inherited {
        bind: (event: string, listener: ListenerFunction, priority: number) => void;
        unbind: (event: string, Listener: ListenerFunction) => void;
    }

    interface EventsSpecs {
        supported?: [
            string
        ];
        bind?: Inherited;
    }

    type ListenerFunction = (...args: any) => void;

    interface ListenerSpecs {
        listener: ListenerFunction;
        priority: number;
    }

    interface TriggerSpecs {
        name: string;
        async?: boolean;
    }

    type Trigger = string | TriggerSpecs;
}

// FILE: utils\execution-control\cancellation-token\cancellation-token.d.ts
declare namespace ns_utils_executioncontrol_cancellationtoken_cancellationtoken {
    class CancellationToken {
        #private;

        get current(): number;

        reset: () => number;
        check: (id: number) => boolean;
    }
}

// FILE: utils\execution-control\single-call\single-call.d.ts
declare namespace ns_utils_executioncontrol_singlecall_singlecall {
    function SingleCall(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
}

// FILE: utils\pending-promise\pending-promise.d.ts
declare namespace ns_utils_pendingpromise_pendingpromise {
    class PendingPromise<T> extends Promise<T> {
        resolve: any;
        reject: any;

        constructor(executor?: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
    }
}

// FILE: widgets\controller\base.d.ts
declare namespace ns_widgets_controller_base {
    import WidgetSpecs = ns_widgets_widgets.WidgetSpecs;
    import Bundle = ns_bundles_bundle.Bundle;

    abstract class BeyondWidgetControllerBase {
        #private;

        get bundle(): Bundle;

        get element(): string;

        get is(): string;

        get route(): string;

        get layout(): string;

        protected constructor(specs: WidgetSpecs);
    }
}

// FILE: widgets\controller\controller.d.ts
declare namespace ns_widgets_controller_controller {
    import BeyondWidget = ns_widgets_widget.BeyondWidget;
    import WidgetSpecs = ns_widgets_widgets.WidgetSpecs;
    import NodeWidget = ns_widgets_instances_node.NodeWidget;
    import BeyondWidgetControllerBase = ns_widgets_controller_base.BeyondWidgetControllerBase;

    /**
     * The client widget react controller
     */
    abstract class BeyondWidgetController extends BeyondWidgetControllerBase {
        #private;

        get component(): BeyondWidget;

        get node(): NodeWidget;

        get body(): HTMLSpanElement;

        protected constructor(specs: WidgetSpecs, component: BeyondWidget);

        mount(Widget: typeof BeyondWidget): void;

        unmount(): void;

        render(): void;

        refresh(): void;

        initialise(): void;
    }
}

// FILE: widgets\controller\ssr.d.ts
declare namespace ns_widgets_controller_ssr {
    import BeyondWidgetControllerBase = ns_widgets_controller_base.BeyondWidgetControllerBase;

    interface IWidgetRendered {
        errors?: string[];
        warnings?: string[];
        html?: string;
        css?: string;
        exception?: Error;
    }

    /**
     * The SSR widget react controller
     */
    abstract class BeyondWidgetControllerSSR extends BeyondWidgetControllerBase {
        abstract render(): IWidgetRendered;
    }
}

// FILE: widgets\instances\instances.d.ts
declare namespace ns_widgets_instances_instances {
    import BeyondWidget = ns_widgets_widget.BeyondWidget;
    import NodeWidget = ns_widgets_instances_node.NodeWidget;
    const instances: {
        register(widget: BeyondWidget): NodeWidget;
        clear(): void;
        delete(key: BeyondWidget): boolean;
        forEach(callbackfn: (value: NodeWidget, key: BeyondWidget, map: Map<BeyondWidget, NodeWidget>) => void, thisArg?: any): void;
        get(key: BeyondWidget): NodeWidget;
        has(key: BeyondWidget): boolean;
        set(key: BeyondWidget, value: NodeWidget): any;
        readonly size: number;
        entries(): IterableIterator<[
            BeyondWidget,
            NodeWidget
        ]>;
        keys(): IterableIterator<BeyondWidget>;
        values(): IterableIterator<NodeWidget>;
        [Symbol.iterator](): IterableIterator<[
            BeyondWidget,
            NodeWidget
        ]>;
        readonly [Symbol.toStringTag]: string;
    };
}

// FILE: widgets\instances\node.d.ts
declare namespace ns_widgets_instances_node {
    import BeyondWidget = ns_widgets_widget.BeyondWidget;

    class NodeWidget {
        #private;

        get widget(): BeyondWidget;

        get is(): string;

        get route(): string;

        get layout(): string;

        get parent(): NodeWidget;

        get children(): Set<NodeWidget>;

        constructor(widget: BeyondWidget, parent?: NodeWidget);
    }
}

// FILE: widgets\widget.d.ts
declare namespace ns_widgets_widget {
    import WidgetSpecs = ns_widgets_widgets.WidgetSpecs;
    import BeyondWidgetController = ns_widgets_controller_controller.BeyondWidgetController;
    import NodeWidget = ns_widgets_instances_node.NodeWidget;
    const Element: {
        new(): HTMLElement;
        prototype: HTMLElement;
    };

    class BeyondWidget extends Element {
        #private;

        get is(): string;

        get route(): string;

        get layout(): string;

        get bundle(): any;

        get node(): NodeWidget;

        get controller(): BeyondWidgetController;

        get error(): string;

        get id(): string;

        get loading(): boolean;

        get loaded(): boolean;

        constructor(specs: WidgetSpecs);

        connectedCallback(): void;
    }
}

// FILE: widgets\widgets.d.ts
declare namespace ns_widgets_widgets {
    import NodeWidget = ns_widgets_instances_node.NodeWidget;

    interface WidgetSpecs {
        name: string;
        id: string;
        is?: string;
        route?: string;
        layout?: string;
    }

    type WidgetsSpecs = WidgetSpecs[];
    const widgets: {
        readonly instances: Set<NodeWidget>;
        register(specs: WidgetsSpecs): void;
        clear(): void;
        delete(key: string): boolean;
        forEach(callbackfn: (value: WidgetSpecs, key: string, map: Map<string, WidgetSpecs>) => void, thisArg?: any): void;
        get(key: string): WidgetSpecs;
        has(key: string): boolean;
        set(key: string, value: WidgetSpecs): any;
        readonly size: number;
        entries(): IterableIterator<[
            string,
            WidgetSpecs
        ]>;
        keys(): IterableIterator<string>;
        values(): IterableIterator<WidgetSpecs>;
        [Symbol.iterator](): IterableIterator<[
            string,
            WidgetSpecs
        ]>;
        readonly [Symbol.toStringTag]: string;
    };
}

export import beyond = ns_beyond.beyond;
export import Bundle = ns_bundles_bundle.Bundle;
export import BundleStyles = ns_bundles_styles.BundleStyles;
export import Module = ns_modules_module.Module;
export import ModuleTexts = ns_modules_texts.ModuleTexts;
export import ActionsBridge = ns_service_actionsbridge.ActionsBridge;
export import Collection = ns_utils_collection_collection.Collection;
export import Events = ns_utils_events_events.Events;
export import ListenerFunction = ns_utils_events_types.ListenerFunction;
export import CancellationToken = ns_utils_executioncontrol_cancellationtoken_cancellationtoken.CancellationToken;
export import SingleCall = ns_utils_executioncontrol_singlecall_singlecall.SingleCall;
export import PendingPromise = ns_utils_pendingpromise_pendingpromise.PendingPromise;
export import BeyondWidgetControllerBase = ns_widgets_controller_base.BeyondWidgetControllerBase;
export import BeyondWidgetController = ns_widgets_controller_controller.BeyondWidgetController;
export import IWidgetRendered = ns_widgets_controller_ssr.IWidgetRendered;
export import BeyondWidgetControllerSSR = ns_widgets_controller_ssr.BeyondWidgetControllerSSR;
export import NodeWidget = ns_widgets_instances_node.NodeWidget;
export import widgets = ns_widgets_widgets.widgets;

