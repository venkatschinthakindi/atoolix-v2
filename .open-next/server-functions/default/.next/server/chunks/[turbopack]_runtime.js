var RUNTIME_PUBLIC_PATH = "server/chunks/[turbopack]_runtime.js";
var RELATIVE_ROOT_PATH = "..";
var ASSET_PREFIX = "/";
// Apply forwarded globals from workerData if running in a worker thread
if (typeof require !== 'undefined') {
    try {
        var { workerData } = require('worker_threads');
        if (workerData?.__turbopack_globals__) {
            Object.assign(globalThis, workerData.__turbopack_globals__);
            // Remove internal data so it's not visible to user code
            delete workerData.__turbopack_globals__;
        }
    } catch (_) {
        // Not in a worker thread context, ignore
    }
}
/**
 * This file contains runtime types and functions that are shared between all
 * TurboPack ECMAScript runtimes.
 *
 * It will be prepended to the runtime code of each runtime.
 */ /* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-types.d.ts" />
/// <reference path="./async-module.ts" />
/**
 * Describes why a module was instantiated.
 * Shared between browser and Node.js runtimes.
 */ var SourceType = /*#__PURE__*/ function(SourceType) {
    /**
   * The module was instantiated because it was included in an evaluated chunk's
   * runtime.
   * SourceData is a ChunkPath.
   */ SourceType[SourceType["Runtime"] = 0] = "Runtime";
    /**
   * The module was instantiated because a parent module imported it.
   * SourceData is a ModuleId.
   */ SourceType[SourceType["Parent"] = 1] = "Parent";
    /**
   * The module was instantiated because it was included in a chunk's hot module
   * update.
   * SourceData is an array of ModuleIds or undefined.
   */ SourceType[SourceType["Update"] = 2] = "Update";
    return SourceType;
}(SourceType || {});
/**
 * Flag indicating which module object type to create when a module is merged. Set to `true`
 * by each runtime that uses ModuleWithDirection (browser dev-base.ts, nodejs dev-base.ts,
 * nodejs build-base.ts). Browser production (build-base.ts) leaves it as `false` since it
 * uses plain Module objects.
 */ let createModuleWithDirectionFlag = false;
const REEXPORTED_OBJECTS = new WeakMap();
/**
 * Constructs the `__turbopack_context__` object for a module.
 */ function Context(module, exports) {
    this.m = module;
    // We need to store this here instead of accessing it from the module object to:
    // 1. Make it available to factories directly, since we rewrite `this` to
    //    `__turbopack_context__.e` in CJS modules.
    // 2. Support async modules which rewrite `module.exports` to a promise, so we
    //    can still access the original exports object from functions like
    //    `esmExport`
    // Ideally we could find a new approach for async modules and drop this property altogether.
    this.e = exports;
}
const contextPrototype = Context.prototype;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name)) Object.defineProperty(obj, name, options);
}
function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
        if (createModuleWithDirectionFlag) {
            // set in development modes for hmr support
            module = createModuleWithDirection(id);
        } else {
            module = createModuleObject(id);
        }
        moduleCache[id] = module;
    }
    return module;
}
/**
 * Creates the module object. Only done here to ensure all module objects have the same shape.
 */ function createModuleObject(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined
    };
}
function createModuleWithDirection(id) {
    return {
        exports: {},
        error: undefined,
        id,
        namespaceObject: undefined,
        parents: [],
        children: []
    };
}
const BindingTag_Value = 0;
/**
 * Adds the getters to the exports object.
 */ function esm(exports, bindings, dynamic) {
    defineProp(exports, '__esModule', {
        value: true
    });
    if (toStringTag) defineProp(exports, toStringTag, {
        value: 'Module'
    });
    let i = 0;
    while(i < bindings.length){
        const propName = bindings[i++];
        const tagOrFunction = bindings[i++];
        if (typeof tagOrFunction === 'number') {
            if (tagOrFunction === BindingTag_Value) {
                defineProp(exports, propName, {
                    value: bindings[i++],
                    enumerable: true,
                    writable: false
                });
            } else {
                throw new Error(`unexpected tag: ${tagOrFunction}`);
            }
        } else {
            const getterFn = tagOrFunction;
            if (typeof bindings[i] === 'function') {
                const setterFn = bindings[i++];
                defineProp(exports, propName, {
                    get: getterFn,
                    set: setterFn,
                    enumerable: true
                });
            } else {
                defineProp(exports, propName, {
                    get: getterFn,
                    enumerable: true
                });
            }
        }
    }
    // The properties defined above are already non-configurable and
    // non-writable, so the namespace's existing exports are effectively
    // immutable. Sealing additionally makes the object non-extensible, matching
    // real ESM-namespace semantics. Modules with dynamic re-exports
    // (`export *` from a CommonJS module) must stay extensible so the dynamic
    // export proxy can surface keys discovered at runtime, so skip the seal for
    // them.
    if (!dynamic) Object.seal(exports);
}
/**
 * Makes the module an ESM with exports
 */ function esmExport(bindings, id, dynamic) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings, dynamic);
}
contextPrototype.s = esmExport;
function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
        REEXPORTED_OBJECTS.set(module, reexportedObjects = []);
        // Returns the re-exported object that provides `prop` as an own property,
        // or `undefined` if none does. The traps share this logic so they always
        // agree on which keys are synthesized from `reexportedObjects`. `default`
        // is never re-exported by `export *`, so it is never synthesized.
        const reexportOwning = (prop)=>{
            if (prop !== 'default') {
                for (const obj of reexportedObjects){
                    if (hasOwnProperty.call(obj, prop)) return obj;
                }
            }
            return undefined;
        };
        // Modules with dynamic re-exports are not sealed by `esm()`, so the
        // target beneath the namespace stays extensible. That is what lets the
        // `ownKeys` and `getOwnPropertyDescriptor` traps legally report keys that
        // exist on `reexportedObjects` but not on the target itself.
        module.exports = module.namespaceObject = new Proxy(exports, {
            get (target, prop) {
                if (hasOwnProperty.call(target, prop) || prop === 'default' || prop === '__esModule') {
                    return Reflect.get(target, prop);
                }
                const obj = reexportOwning(prop);
                return obj && Reflect.get(obj, prop);
            },
            // The namespace is read-only, like a real esm namespace object. The
            // re-exported modules can still mutate their own exports (exposed live
            // via `get`), but mutating the namespace itself is rejected. Refusing
            // here, rather than forwarding to the extensible target, also prevents an
            // assignment/definition from shadowing a dynamic re-export. It also
            // prevents delete from removing a static export.
            set () {
                return false;
            },
            defineProperty () {
                return false;
            },
            deleteProperty () {
                return false;
            },
            // The `has` trap ensures that `'exportName' in starImports` will reflect
            // the truth of whether a key is exported.
            has (target, prop) {
                if (Reflect.has(target, prop)) return true;
                if (prop === 'default' || prop === '__esModule') return false;
                return reexportOwning(prop) !== undefined;
            },
            // ownKeys and getOwnPropertyDescriptor together make the keys enumerable.
            // If a value is returned from `ownKeys` but its property descriptor is
            // not enumerable, it will not be visible to iterator methods.
            // Collectively, they allow code like the following:
            //
            // ```
            // // module.js re-exports dynamic CJS exports
            // export * from './legacyModule.cjs'
            //
            // // from another JS file, reference the re-exported dynamic values
            // import * as Namespace from './module.js'
            // Object.keys(Namespace)
            // ```
            ownKeys (target) {
                const keys = Reflect.ownKeys(target);
                for (const obj of reexportedObjects){
                    for (const key of Reflect.ownKeys(obj)){
                        if (key !== 'default' && !keys.includes(key)) keys.push(key);
                    }
                }
                return keys;
            },
            getOwnPropertyDescriptor (target, prop) {
                const own = Reflect.getOwnPropertyDescriptor(target, prop);
                if (own || prop === 'default' || prop === '__esModule') return own;
                const obj = reexportOwning(prop);
                if (obj) {
                    // Synthetic keys don't exist on the target, so they MUST be
                    // reported as configurable. However the set/delete traps above will
                    // prevent them from actually being changed
                    return {
                        enumerable: true,
                        configurable: true,
                        get: ()=>Reflect.get(obj, prop)
                    };
                }
                return undefined;
            }
        });
    }
    return reexportedObjects;
}
/**
 * Dynamically exports properties from an object
 */ function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
        exports = module.exports;
    } else {
        module = this.m;
        exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === 'object' && object !== null) {
        reexportedObjects.push(object);
    }
}
contextPrototype.j = dynamicExport;
function exportValue(value, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = value;
}
contextPrototype.v = exportValue;
function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
        module = getOverwrittenModule(this.c, id);
    } else {
        module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
}
contextPrototype.n = exportNamespace;
function createGetter(obj, key) {
    return ()=>obj[key];
}
/**
 * @returns prototype of the object
 */ const getProto = Object.getPrototypeOf ? (obj)=>Object.getPrototypeOf(obj) : (obj)=>obj.__proto__;
/** Prototypes that are not expanded for exports */ const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto)
];
/**
 * @param raw
 * @param ns
 * @param allowExportDefault
 *   * `false`: will have the raw module as default export
 *   * `true`: will have the default property as default export
 */ function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for(let current = raw; (typeof current === 'object' || typeof current === 'function') && !LEAF_PROTOTYPES.includes(current); current = getProto(current)){
        for (const key of Object.getOwnPropertyNames(current)){
            bindings.push(key, createGetter(raw, key));
            if (defaultLocation === -1 && key === 'default') {
                defaultLocation = bindings.length - 1;
            }
        }
    }
    // this is not really correct
    // we should set the `default` getter if the imported module is a `.cjs file`
    if (!(allowExportDefault && defaultLocation >= 0)) {
        // Replace the binding with one for the namespace itself in order to preserve iteration order.
        if (defaultLocation >= 0) {
            // Replace the getter with the value
            bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
        } else {
            bindings.push('default', BindingTag_Value, raw);
        }
    }
    esm(ns, bindings);
    return ns;
}
function createNS(raw) {
    if (typeof raw === 'function') {
        return function(...args) {
            return raw.apply(this, args);
        };
    } else {
        return Object.create(null);
    }
}
function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);
    // any ES module has to have `module.namespaceObject` defined.
    if (module.namespaceObject) return module.namespaceObject;
    // only ESM can be an async module, so we don't need to worry about exports being a promise here.
    const raw = module.exports;
    return module.namespaceObject = interopEsm(raw, createNS(raw), raw && raw.__esModule);
}
contextPrototype.i = esmImport;
function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
}
contextPrototype.A = asyncLoader;
// Add a simple runtime require so that environments without one can still pass
// `typeof require` CommonJS checks so that exports are correctly registered.
const runtimeRequire = // @ts-ignore
typeof require === 'function' ? require : function require1() {
    throw new Error('Unexpected use of runtime require');
};
contextPrototype.t = runtimeRequire;
function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
}
contextPrototype.r = commonJsRequire;
/**
 * Remove fragments and query parameters since they are never part of the context map keys
 *
 * This matches how we parse patterns at resolving time.  Arguably we should only do this for
 * strings passed to `import` but the resolve does it for `import` and `require` and so we do
 * here as well.
 */ function parseRequest(request) {
    // Per the URI spec fragments can contain `?` characters, so we should trim it off first
    // https://datatracker.ietf.org/doc/html/rfc3986#section-3.5
    const hashIndex = request.indexOf('#');
    if (hashIndex !== -1) {
        request = request.substring(0, hashIndex);
    }
    const queryIndex = request.indexOf('?');
    if (queryIndex !== -1) {
        request = request.substring(0, queryIndex);
    }
    return request;
}
/**
 * `require.context` and require/import expression runtime.
 */ function moduleContext(map) {
    function moduleContext(id) {
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].module();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    }
    moduleContext.keys = ()=>{
        return Object.keys(map);
    };
    moduleContext.resolve = (id)=>{
        id = parseRequest(id);
        if (hasOwnProperty.call(map, id)) {
            return map[id].id();
        }
        const e = new Error(`Cannot find module '${id}'`);
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    };
    moduleContext.import = async (id)=>{
        return await moduleContext(id);
    };
    return moduleContext;
}
contextPrototype.f = moduleContext;
/**
 * Returns the path of a chunk defined by its data.
 */ function getChunkPath(chunkData) {
    return typeof chunkData === 'string' ? chunkData : chunkData.path;
}
// Load the CompressedmoduleFactories of a chunk into the `moduleFactories` Map.
// The CompressedModuleFactories format is
// - 1 or more module ids
// - a module factory function
// So walking this is a little complex but the flat structure is also fast to
// traverse, we can use `typeof` operators to distinguish the two cases.
function installCompressedModuleFactories(chunkModules, offset, moduleFactories, newModuleId) {
    let i = offset;
    while(i < chunkModules.length){
        let end = i + 1;
        // Find our factory function
        while(end < chunkModules.length && typeof chunkModules[end] !== 'function'){
            end++;
        }
        if (end === chunkModules.length) {
            throw new Error('malformed chunk format, expected a factory function');
        }
        // Install the factory for each module ID that doesn't already have one.
        // When some IDs in this group already have a factory, reuse that existing
        // group factory for the missing IDs to keep all IDs in the group consistent.
        // Otherwise, install the factory from this chunk.
        const moduleFactoryFn = chunkModules[end];
        let existingGroupFactory = undefined;
        for(let j = i; j < end; j++){
            const id = chunkModules[j];
            const existingFactory = moduleFactories.get(id);
            if (existingFactory) {
                existingGroupFactory = existingFactory;
                break;
            }
        }
        const factoryToInstall = existingGroupFactory ?? moduleFactoryFn;
        let didInstallFactory = false;
        for(let j = i; j < end; j++){
            const id = chunkModules[j];
            if (!moduleFactories.has(id)) {
                if (!didInstallFactory) {
                    if (factoryToInstall === moduleFactoryFn) {
                        applyModuleFactoryName(moduleFactoryFn);
                    }
                    didInstallFactory = true;
                }
                moduleFactories.set(id, factoryToInstall);
                newModuleId?.(id);
            }
        }
        i = end + 1; // end is pointing at the last factory advance to the next id or the end of the array.
    }
}
/**
 * A pseudo "fake" URL object to resolve to its relative path.
 *
 * When UrlRewriteBehavior is set to relative, calls to the `new URL()` will construct url without base using this
 * runtime function to generate context-agnostic urls between different rendering context, i.e ssr / client to avoid
 * hydration mismatch.
 *
 * This is based on webpack's existing implementation:
 * https://github.com/webpack/webpack/blob/87660921808566ef3b8796f8df61bd79fc026108/lib/runtime/RelativeUrlRuntimeModule.js
 */ const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, 'x:/');
    const values = {};
    for(const key in realUrl)values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, '');
    values.origin = values.protocol = '';
    values.toString = values.toJSON = (..._args)=>inputUrl;
    for(const key in values)Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key]
    });
};
relativeURL.prototype = URL.prototype;
contextPrototype.U = relativeURL;
/**
 * Utility function to ensure all variants of an enum are handled.
 */ function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
}
/**
 * Constructs an error message for when a module factory is not available.
 */ function factoryNotAvailableMessage(moduleId, sourceType, sourceData) {
    let instantiationReason;
    switch(sourceType){
        case 0:
            instantiationReason = `as a runtime entry of chunk ${sourceData}`;
            break;
        case 1:
            instantiationReason = `because it was required from module ${sourceData}`;
            break;
        case 2:
            instantiationReason = 'because of an HMR update';
            break;
        default:
            invariant(sourceType, (sourceType)=>`Unknown source type: ${sourceType}`);
    }
    return `Module ${moduleId} was instantiated ${instantiationReason}, but the module factory is not available.`;
}
/**
 * A stub function to make `require` available but non-functional in ESM.
 */ function requireStub(_moduleId) {
    throw new Error('dynamic usage of require is not supported');
}
contextPrototype.z = requireStub;
// Make `globalThis` available to the module in a way that cannot be shadowed by a local variable.
contextPrototype.g = globalThis;
function applyModuleFactoryName(factory) {
    // Give the module factory a nice name to improve stack traces.
    Object.defineProperty(factory, 'name', {
        value: 'module evaluation'
    });
}
/// <reference path="../shared/runtime/runtime-utils.ts" />
/// A 'base' utilities to support runtime can have externals.
/// Currently this is for node.js / edge runtime both.
/// If a fn requires node.js specific behavior, it should be placed in `node-external-utils` instead.
async function externalImport(id) {
    let raw;
    try {
        switch (id) {
  case "next/dist/compiled/@vercel/og/index.node.js":
    raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
    break;
  default:
    raw = await import(id);
};
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && 'default' in raw.default) {
        return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
}
contextPrototype.y = externalImport;
function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
        raw = thunk();
    } catch (err) {
        // TODO(alexkirsz) This can happen when a client-side module tries to load
        // an external module we don't provide a shim for (e.g. querystring, url).
        // For now, we fail semi-silently, but in the future this should be a
        // compilation error.
        throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
        return raw;
    }
    return interopEsm(raw, createNS(raw), true);
}
externalRequire.resolve = (id, options)=>{
    return require.resolve(id, options);
};
contextPrototype.x = externalRequire;
/* eslint-disable @typescript-eslint/no-unused-vars */ const path = require('path');
const relativePathToRuntimeRoot = path.relative(RUNTIME_PUBLIC_PATH, '.');
// Compute the relative path to the `distDir`.
const relativePathToDistRoot = path.join(relativePathToRuntimeRoot, RELATIVE_ROOT_PATH);
const RUNTIME_ROOT = path.resolve(__filename, relativePathToRuntimeRoot);
// Compute the absolute path to the root, by stripping distDir from the absolute path to this file.
const ABSOLUTE_ROOT = path.resolve(__filename, relativePathToDistRoot);
/**
 * Returns an absolute path to the given module path.
 * Module path should be relative, either path to a file or a directory.
 *
 * This fn allows to calculate an absolute path for some global static values, such as
 * `__dirname` or `import.meta.url` that Turbopack will not embeds in compile time.
 * See ImportMetaBinding::code_generation for the usage.
 */ function resolveAbsolutePath(modulePath) {
    if (modulePath) {
        return path.join(ABSOLUTE_ROOT, modulePath);
    }
    return ABSOLUTE_ROOT;
}
Context.prototype.P = resolveAbsolutePath;
/**
 * Returns an absolute `file://` URL for the given module path.
 *
 * Uses `url.pathToFileURL` so that the resulting URL is a valid file URI on
 * all platforms (forward slashes on Windows, drive letters handled
 * correctly, path segments URL-encoded).
 */ function resolveFileUrl(modulePath) {
    return require('url').pathToFileURL(resolveAbsolutePath(modulePath)).href;
}
Context.prototype.F = resolveFileUrl;
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="../../shared/runtime/runtime-utils.ts" />
/// <reference path="../../shared-node/base-externals-utils.ts" />
/// <reference path="../../shared-node/node-externals-utils.ts" />
/// <reference path="./nodejs-globals.d.ts" />
/**
 * Base Node.js runtime shared between production and development.
 * Contains chunk loading, module caching, and other non-HMR functionality.
 */ process.env.TURBOPACK = '1';
const url = require('url');
const moduleFactories = new Map();
const moduleCache = Object.create(null);
/**
 * Returns an absolute path to the given module's id.
 */ function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    const exportedPath = exported?.default ?? exported;
    if (typeof exportedPath !== 'string') {
        return exported;
    }
    const strippedAssetPrefix = exportedPath.slice(ASSET_PREFIX.length);
    const resolved = path.resolve(RUNTIME_ROOT, strippedAssetPrefix);
    return url.pathToFileURL(resolved).href;
}
/**
 * Exports a URL value. No suffix is added in Node.js runtime.
 */ function exportUrl(urlValue, id) {
    exportValue.call(this, urlValue, id);
}
function loadRuntimeChunk(sourcePath, chunkData) {
    if (typeof chunkData === 'string') {
        loadRuntimeChunkPath(sourcePath, chunkData);
    } else {
        loadRuntimeChunkPath(sourcePath, chunkData.path);
    }
}
const loadedChunks = new Set();
const unsupportedLoadChunk = Promise.resolve(undefined);
const loadedChunk = Promise.resolve(undefined);
const chunkCache = new Map();
function clearChunkCache() {
    chunkCache.clear();
    loadedChunks.clear();
}
function loadRuntimeChunkPath(sourcePath, chunkPath) {
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return;
    }
    if (loadedChunks.has(chunkPath)) {
        return;
    }
    try {
        const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
        const chunkModules = requireChunk(chunkPath);
        installCompressedModuleFactories(chunkModules, 0, moduleFactories);
        loadedChunks.add(chunkPath);
    } catch (cause) {
        let errorMessage = `Failed to load chunk ${chunkPath}`;
        if (sourcePath) {
            errorMessage += ` from runtime for chunk ${sourcePath}`;
        }
        const error = new Error(errorMessage, {
            cause
        });
        error.name = 'ChunkLoadError';
        throw error;
    }
}
function loadChunkAsync(chunkData) {
    const chunkPath = typeof chunkData === 'string' ? chunkData : chunkData.path;
    if (!isJs(chunkPath)) {
        // We only support loading JS chunks in Node.js.
        // This branch can be hit when trying to load a CSS chunk.
        return unsupportedLoadChunk;
    }
    let entry = chunkCache.get(chunkPath);
    if (entry === undefined) {
        try {
            // resolve to an absolute path to simplify `require` handling
            const resolved = path.resolve(RUNTIME_ROOT, chunkPath);
            // TODO: consider switching to `import()` to enable concurrent chunk loading and async file io
            // However this is incompatible with hot reloading (since `import` doesn't use the require cache)
            const chunkModules = requireChunk(chunkPath);
            installCompressedModuleFactories(chunkModules, 0, moduleFactories);
            entry = loadedChunk;
        } catch (cause) {
            const errorMessage = `Failed to load chunk ${chunkPath} from module ${this.m.id}`;
            const error = new Error(errorMessage, {
                cause
            });
            error.name = 'ChunkLoadError';
            // Cache the failure promise, future requests will also get this same rejection
            entry = Promise.reject(error);
        }
        chunkCache.set(chunkPath, entry);
    }
    // TODO: Return an instrumented Promise that React can use instead of relying on referential equality.
    return entry;
}
contextPrototype.l = loadChunkAsync;
function loadChunkAsyncByUrl(chunkUrl) {
    const path1 = url.fileURLToPath(new URL(chunkUrl, RUNTIME_ROOT));
    return loadChunkAsync.call(this, path1);
}
contextPrototype.L = loadChunkAsyncByUrl;
// Shared runtime primitive: the root that on-disk chunk paths are resolved
// against. Used by the bundled wasm helper (exposed as `__turbopack_runtime_root__`).
contextPrototype.w = RUNTIME_ROOT;
const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;
/**
 * Checks if a given path/URL ends with .js, optionally followed by ?query or #fragment.
 */ function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
}
/* eslint-disable @typescript-eslint/no-unused-vars */ /// <reference path="./runtime-base.ts" />
/**
 * Production Node.js runtime.
 * Uses ModuleWithDirection and simple module instantiation without HMR support.
 */ // moduleCache and moduleFactories are declared in runtime-base.ts
// this is read in runtime-utils.ts so it creates a module with direction for hmr
createModuleWithDirectionFlag = true;
const nodeContextPrototype = Context.prototype;
nodeContextPrototype.q = exportUrl;
nodeContextPrototype.M = moduleFactories;
// Cast moduleCache to ModuleWithDirection for production mode
nodeContextPrototype.c = moduleCache;
nodeContextPrototype.R = resolvePathFromModule;
nodeContextPrototype.C = clearChunkCache;
function instantiateModule(id, sourceType, sourceData) {
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== 'function') {
        // This can happen if modules incorrectly handle HMR disposes/updates,
        // e.g. when they keep a `setTimeout` around which still executes old code
        // and contains e.g. a `require("something")` call.
        throw new Error(factoryNotAvailableMessage(id, sourceType, sourceData));
    }
    const module1 = createModuleWithDirection(id);
    const exports = module1.exports;
    moduleCache[id] = module1;
    const context = new Context(module1, exports);
    // NOTE(alexkirsz) This can fail when the module encounters a runtime error.
    try {
        moduleFactory(context, module1, exports);
    } catch (error) {
        module1.error = error;
        throw error;
    }
    ;
    module1.loaded = true;
    if (module1.namespaceObject && module1.exports !== module1.namespaceObject) {
        // in case of a circular dependency: cjs1 -> esm2 -> cjs1
        interopEsm(module1.exports, module1.namespaceObject);
    }
    return module1;
}
/**
 * Retrieves a module from the cache, or instantiate it if it is not cached.
 */ // @ts-ignore
function getOrInstantiateModuleFromParent(id, sourceModule) {
    const module1 = moduleCache[id];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateModule(id, SourceType.Parent, sourceModule.id);
}
/**
 * Instantiates a runtime module.
 */ function instantiateRuntimeModule(chunkPath, moduleId) {
    return instantiateModule(moduleId, SourceType.Runtime, chunkPath);
}
/**
 * Retrieves a module from the cache, or instantiate it as a runtime module if it is not cached.
 */ // @ts-ignore TypeScript doesn't separate this module space from the browser runtime
function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module1 = moduleCache[moduleId];
    if (module1) {
        if (module1.error) {
            throw module1.error;
        }
        return module1;
    }
    return instantiateRuntimeModule(chunkPath, moduleId);
}
module.exports = (sourcePath)=>({
        m: (id)=>getOrInstantiateRuntimeModule(sourcePath, id),
        c: (chunkData)=>loadRuntimeChunk(sourcePath, chunkData)
    });


//# sourceMappingURL=%5Bturbopack%5D_runtime.js.map

  function requireChunk(chunkPath) {
    switch(chunkPath) {
      case "server/chunks/ssr/[root-of-the-server]__0trewdn._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0trewdn._.js");
      case "server/chunks/ssr/[root-of-the-server]__0yjqztd._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0yjqztd._.js");
      case "server/chunks/ssr/[root-of-the-server]__174cgu_._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__174cgu_._.js");
      case "server/chunks/ssr/[root-of-the-server]__1ad95hi._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1ad95hi._.js");
      case "server/chunks/ssr/[root-of-the-server]__1cku8k8._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1cku8k8._.js");
      case "server/chunks/ssr/[turbopack]_runtime.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[turbopack]_runtime.js");
      case "server/chunks/ssr/_1gcvmsa._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1gcvmsa._.js");
      case "server/chunks/ssr/_next-internal_server_app__not-found_page_actions_0pt47yr.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__not-found_page_actions_0pt47yr.js");
      case "server/chunks/ssr/node_modules_01xbj_9._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_01xbj_9._.js");
      case "server/chunks/ssr/node_modules_1c6rjx4._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1c6rjx4._.js");
      case "server/chunks/ssr/node_modules_next_dist_0um6x4r._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_0um6x4r._.js");
      case "server/chunks/ssr/node_modules_next_dist_1knwlsz._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_1knwlsz._.js");
      case "server/chunks/ssr/node_modules_next_dist_1n3w9lb._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_1n3w9lb._.js");
      case "server/chunks/ssr/node_modules_next_dist_1v8aef8._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_1v8aef8._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_0p8s4lh._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_0p8s4lh._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_0l_sp0x.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_unauthorized_0l_sp0x.js");
      case "server/chunks/ssr/src_config_server_ts_0xuz6wl._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_config_server_ts_0xuz6wl._.js");
      case "server/chunks/ssr/[root-of-the-server]__15a_nvp._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__15a_nvp._.js");
      case "server/chunks/ssr/_0hvkoi8._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0hvkoi8._.js");
      case "server/chunks/ssr/_next-internal_server_app_about_page_actions_0xvgj07.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_about_page_actions_0xvgj07.js");
      case "server/chunks/ssr/node_modules_1h5-s3p._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1h5-s3p._.js");
      case "server/chunks/ssr/node_modules_next_dist_10u7-ym._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_10u7-ym._.js");
      case "server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_0q-w892.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_dist_client_components_builtin_global-error_0q-w892.js");
      case "server/chunks/ssr/[root-of-the-server]__0o68o_u._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0o68o_u._.js");
      case "server/chunks/ssr/_0g07cpt._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0g07cpt._.js");
      case "server/chunks/ssr/_1pe1rdp._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1pe1rdp._.js");
      case "server/chunks/ssr/_next-internal_server_app_calculator_page_actions_1reuhgg.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_calculator_page_actions_1reuhgg.js");
      case "server/chunks/ssr/node_modules_16flwp-._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_16flwp-._.js");
      case "server/chunks/ssr/node_modules_next_06lxapa._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_next_06lxapa._.js");
      case "server/chunks/ssr/src_1_v8nhy._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_1_v8nhy._.js");
      case "server/chunks/ssr/[root-of-the-server]__15tdnsp._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__15tdnsp._.js");
      case "server/chunks/ssr/_08shxft._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_08shxft._.js");
      case "server/chunks/ssr/_next-internal_server_app_contact_page_actions_0kuoobr.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_contact_page_actions_0kuoobr.js");
      case "server/chunks/ssr/[root-of-the-server]__1dwjw78._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1dwjw78._.js");
      case "server/chunks/ssr/_next-internal_server_app_datetime_page_actions_0g7yaxc.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_datetime_page_actions_0g7yaxc.js");
      case "server/chunks/ssr/[root-of-the-server]__0l5maty._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0l5maty._.js");
      case "server/chunks/ssr/_1vntd18._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1vntd18._.js");
      case "server/chunks/ssr/_next-internal_server_app_disclaimer_page_actions_13nynm9.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_disclaimer_page_actions_13nynm9.js");
      case "server/chunks/ssr/[root-of-the-server]__0sd2a88._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0sd2a88._.js");
      case "server/chunks/ssr/_next-internal_server_app_documentation_page_actions_1iy5tav.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_documentation_page_actions_1iy5tav.js");
      case "server/chunks/ssr/src_app_documentation_page_tsx_15qrlg3._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_documentation_page_tsx_15qrlg3._.js");
      case "server/chunks/[externals]__0c2rtfl._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/[externals]__0c2rtfl._.js");
      case "server/chunks/[root-of-the-server]__0l3yhx4._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__0l3yhx4._.js");
      case "server/chunks/[turbopack]_runtime.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/[turbopack]_runtime.js");
      case "server/chunks/_0uxp3uh._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/_0uxp3uh._.js");
      case "server/chunks/_next-internal_server_app_favicon_ico_route_actions_0g2jjls.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_favicon_ico_route_actions_0g2jjls.js");
      case "server/chunks/ssr/[root-of-the-server]__0mkiqxx._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0mkiqxx._.js");
      case "server/chunks/ssr/_next-internal_server_app_finance_page_actions_0f4zjv1.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_finance_page_actions_0f4zjv1.js");
      case "server/chunks/ssr/[root-of-the-server]__1ka280p._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1ka280p._.js");
      case "server/chunks/ssr/_next-internal_server_app_image_page_actions_1y5k54_.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_image_page_actions_1y5k54_.js");
      case "server/chunks/[root-of-the-server]__06jxujt._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__06jxujt._.js");
      case "server/chunks/_next-internal_server_app_manifest_webmanifest_route_actions_08hcpz0.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_manifest_webmanifest_route_actions_08hcpz0.js");
      case "server/chunks/ssr/[root-of-the-server]__04s9afi._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__04s9afi._.js");
      case "server/chunks/ssr/_next-internal_server_app_offline_page_actions_0xm3s3w.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_offline_page_actions_0xm3s3w.js");
      case "server/chunks/ssr/src_app_offline_retry-button_tsx_073aqfx._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_app_offline_retry-button_tsx_073aqfx._.js");
      case "server/chunks/ssr/[root-of-the-server]__0ze8bwy._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0ze8bwy._.js");
      case "server/chunks/ssr/_03wteai._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_03wteai._.js");
      case "server/chunks/ssr/_14dwpoq._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_14dwpoq._.js");
      case "server/chunks/ssr/_1q20kwb._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1q20kwb._.js");
      case "server/chunks/ssr/_next-internal_server_app_page_actions_0hhsz1j.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_page_actions_0hhsz1j.js");
      case "server/chunks/ssr/node_modules_1aioadk._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1aioadk._.js");
      case "server/chunks/ssr/src_components_dashboard_0imotpc._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_dashboard_0imotpc._.js");
      case "server/chunks/ssr/[root-of-the-server]__1wa8kem._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1wa8kem._.js");
      case "server/chunks/ssr/_next-internal_server_app_pdf_page_actions_0sab8ky.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_pdf_page_actions_0sab8ky.js");
      case "server/chunks/ssr/[root-of-the-server]__1zq6qtx._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1zq6qtx._.js");
      case "server/chunks/ssr/_0d193-m._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0d193-m._.js");
      case "server/chunks/ssr/_next-internal_server_app_privacy_page_actions_0_hxzrk.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_privacy_page_actions_0_hxzrk.js");
      case "server/chunks/ssr/[root-of-the-server]__06wclbp._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__06wclbp._.js");
      case "server/chunks/ssr/_next-internal_server_app_privacysecurity_page_actions_0s9apg8.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_privacysecurity_page_actions_0s9apg8.js");
      case "server/chunks/ssr/[root-of-the-server]__0i2yxnc._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0i2yxnc._.js");
      case "server/chunks/ssr/_next-internal_server_app_qrcode_page_actions_1afh5wm.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_qrcode_page_actions_1afh5wm.js");
      case "server/chunks/[root-of-the-server]__1s7-zsz._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__1s7-zsz._.js");
      case "server/chunks/_next-internal_server_app_robots_txt_route_actions_15vc_89.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_robots_txt_route_actions_15vc_89.js");
      case "server/chunks/[root-of-the-server]__1_n3qxu._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/[root-of-the-server]__1_n3qxu._.js");
      case "server/chunks/_next-internal_server_app_sitemap_xml_route_actions_05l5km9.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/_next-internal_server_app_sitemap_xml_route_actions_05l5km9.js");
      case "server/chunks/ssr/[root-of-the-server]__1-ptju8._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1-ptju8._.js");
      case "server/chunks/ssr/_0sjqzgb._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0sjqzgb._.js");
      case "server/chunks/ssr/_next-internal_server_app_terms_page_actions_0h-0lt4.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_terms_page_actions_0h-0lt4.js");
      case "server/chunks/ssr/[root-of-the-server]__10kq3vh._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__10kq3vh._.js");
      case "server/chunks/ssr/_next-internal_server_app_tools_page_actions_0i25plo.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tools_page_actions_0i25plo.js");
      case "server/chunks/ssr/1fos_components_tools_image_passpoerPhotoResizer_passpoerPhotoSeoContent_tsx_18fjq8q._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1fos_components_tools_image_passpoerPhotoResizer_passpoerPhotoSeoContent_tsx_18fjq8q._.js");
      case "server/chunks/ssr/1fos_components_tools_image_signatureResizer_signatureResizerSeoContent_tsx_01rk46x._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1fos_components_tools_image_signatureResizer_signatureResizerSeoContent_tsx_01rk46x._.js");
      case "server/chunks/ssr/1x2-_tools_dateTime_meeting-time-finder_meetingTimeFinderSeoContent_tsx_13wvkyi._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_dateTime_meeting-time-finder_meetingTimeFinderSeoContent_tsx_13wvkyi._.js");
      case "server/chunks/ssr/1x2-_tools_dateTime_timezone-converter_timezoneConverterSeoContent_tsx_0j0oxas._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_dateTime_timezone-converter_timezoneConverterSeoContent_tsx_0j0oxas._.js");
      case "server/chunks/ssr/1x2-_tools_financeSuite_investment_investmentReturnsSuiteSeoContent_tsx_0jmh1za._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_financeSuite_investment_investmentReturnsSuiteSeoContent_tsx_0jmh1za._.js");
      case "server/chunks/ssr/1x2-_tools_financeSuite_retirement_retirementWealthSuiteSeoContent_tsx_1oy92vo._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_financeSuite_retirement_retirementWealthSuiteSeoContent_tsx_1oy92vo._.js");
      case "server/chunks/ssr/1x2-_tools_financeSuite_savings_savingsDepositsSuiteSeoContent_tsx_0y_4s9z._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_financeSuite_savings_savingsDepositsSuiteSeoContent_tsx_0y_4s9z._.js");
      case "server/chunks/ssr/1x2-_tools_image_backgroundRemover_backgroundRemoverSeoContent_tsx_1ic042u._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_image_backgroundRemover_backgroundRemoverSeoContent_tsx_1ic042u._.js");
      case "server/chunks/ssr/1x2-_tools_image_passpoerPhotoResizer_passportPhotoCompressorClient_tsx_1npkfdy._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/1x2-_tools_image_passpoerPhotoResizer_passportPhotoCompressorClient_tsx_1npkfdy._.js");
      case "server/chunks/ssr/[externals]_module_1ddxq77._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[externals]_module_1ddxq77._.js");
      case "server/chunks/ssr/[externals]_util_1jlmhhy._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[externals]_util_1jlmhhy._.js");
      case "server/chunks/ssr/[root-of-the-server]__0rg5e7z._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__0rg5e7z._.js");
      case "server/chunks/ssr/[root-of-the-server]__18h62y5._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__18h62y5._.js");
      case "server/chunks/ssr/[root-of-the-server]__1o432e3._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1o432e3._.js");
      case "server/chunks/ssr/[root-of-the-server]__1oxvrqs._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1oxvrqs._.js");
      case "server/chunks/ssr/[root-of-the-server]__1ufba18._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1ufba18._.js");
      case "server/chunks/ssr/[root-of-the-server]__1v7jrgv._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1v7jrgv._.js");
      case "server/chunks/ssr/_03k40z6._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_03k40z6._.js");
      case "server/chunks/ssr/_06fx3tk._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_06fx3tk._.js");
      case "server/chunks/ssr/_074z9a_._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_074z9a_._.js");
      case "server/chunks/ssr/_0802qer._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0802qer._.js");
      case "server/chunks/ssr/_0_16ypk._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0_16ypk._.js");
      case "server/chunks/ssr/_0atcui4._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0atcui4._.js");
      case "server/chunks/ssr/_0bitl9r._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0bitl9r._.js");
      case "server/chunks/ssr/_0ejd1e1._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0ejd1e1._.js");
      case "server/chunks/ssr/_0ge6h8a._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0ge6h8a._.js");
      case "server/chunks/ssr/_0ju6qgj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0ju6qgj._.js");
      case "server/chunks/ssr/_0kyix9l._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0kyix9l._.js");
      case "server/chunks/ssr/_0p3d_0v._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0p3d_0v._.js");
      case "server/chunks/ssr/_0p5nhgr._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0p5nhgr._.js");
      case "server/chunks/ssr/_0qu0ewl._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0qu0ewl._.js");
      case "server/chunks/ssr/_0u9spcj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0u9spcj._.js");
      case "server/chunks/ssr/_0wr8z8-._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_0wr8z8-._.js");
      case "server/chunks/ssr/_14a1_ce._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_14a1_ce._.js");
      case "server/chunks/ssr/_1_r7w9a._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1_r7w9a._.js");
      case "server/chunks/ssr/_1hfrse9._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1hfrse9._.js");
      case "server/chunks/ssr/_1hgb4t7._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1hgb4t7._.js");
      case "server/chunks/ssr/_1hs9imx._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1hs9imx._.js");
      case "server/chunks/ssr/_1pyte_d._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1pyte_d._.js");
      case "server/chunks/ssr/_1rttorl._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1rttorl._.js");
      case "server/chunks/ssr/_1yt743s._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1yt743s._.js");
      case "server/chunks/ssr/_1yw20nb._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_1yw20nb._.js");
      case "server/chunks/ssr/_20iztxi._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_20iztxi._.js");
      case "server/chunks/ssr/_20q4vey._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_20q4vey._.js");
      case "server/chunks/ssr/_next-internal_server_app_tools_[___toolId]_page_actions_1a2iqva.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app_tools_[___toolId]_page_actions_1a2iqva.js");
      case "server/chunks/ssr/node_modules_05iifmd._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_05iifmd._.js");
      case "server/chunks/ssr/node_modules_06l--o0._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_06l--o0._.js");
      case "server/chunks/ssr/node_modules_0u6ke63._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_0u6ke63._.js");
      case "server/chunks/ssr/node_modules_0utw2mx._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_0utw2mx._.js");
      case "server/chunks/ssr/node_modules_1afpzx0._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1afpzx0._.js");
      case "server/chunks/ssr/node_modules_1g6bn69._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1g6bn69._.js");
      case "server/chunks/ssr/node_modules_1gep_r0._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1gep_r0._.js");
      case "server/chunks/ssr/node_modules_1n8dulj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_1n8dulj._.js");
      case "server/chunks/ssr/node_modules_@babel_runtime_helpers_1x1pj11._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@babel_runtime_helpers_1x1pj11._.js");
      case "server/chunks/ssr/node_modules_@imgly_background-removal_dist_index_mjs_0flsenj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@imgly_background-removal_dist_index_mjs_0flsenj._.js");
      case "server/chunks/ssr/node_modules_@vvo_tzdb_1f8vbdo._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_@vvo_tzdb_1f8vbdo._.js");
      case "server/chunks/ssr/node_modules_chart_js_dist_chart_0t8cwbc.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_chart_js_dist_chart_0t8cwbc.js");
      case "server/chunks/ssr/node_modules_chart_js_dist_chart_1591sj_.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_chart_js_dist_chart_1591sj_.js");
      case "server/chunks/ssr/node_modules_date-fns_format_10chuxu.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_date-fns_format_10chuxu.js");
      case "server/chunks/ssr/node_modules_exifr_dist_full_esm_mjs_0ibcdt_._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_exifr_dist_full_esm_mjs_0ibcdt_._.js");
      case "server/chunks/ssr/node_modules_fflate_esm_index_mjs_03_oys7._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_fflate_esm_index_mjs_03_oys7._.js");
      case "server/chunks/ssr/node_modules_fflate_esm_index_mjs_1wgxmu1._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_fflate_esm_index_mjs_1wgxmu1._.js");
      case "server/chunks/ssr/node_modules_file-saver_dist_FileSaver_min_0xiyje8.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_file-saver_dist_FileSaver_min_0xiyje8.js");
      case "server/chunks/ssr/node_modules_html-to-image_es_index_1ao30b1.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_html-to-image_es_index_1ao30b1.js");
      case "server/chunks/ssr/node_modules_html2canvas_dist_html2canvas_esm_1n-0xws.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_html2canvas_dist_html2canvas_esm_1n-0xws.js");
      case "server/chunks/ssr/node_modules_jspdf-autotable_dist_jspdf_plugin_autotable_mjs_0sl6xtj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_jspdf-autotable_dist_jspdf_plugin_autotable_mjs_0sl6xtj._.js");
      case "server/chunks/ssr/node_modules_jsqr_dist_jsQR_20-qs95.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_jsqr_dist_jsQR_20-qs95.js");
      case "server/chunks/ssr/node_modules_onnxruntime-web_dist_0bsft6_._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_onnxruntime-web_dist_0bsft6_._.js");
      case "server/chunks/ssr/node_modules_onnxruntime-web_dist_1_m3laz._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_onnxruntime-web_dist_1_m3laz._.js");
      case "server/chunks/ssr/node_modules_onnxruntime-web_dist_ort_node_min_mjs_18cm0rx._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_onnxruntime-web_dist_ort_node_min_mjs_18cm0rx._.js");
      case "server/chunks/ssr/node_modules_onnxruntime-web_dist_ort_webgpu_bundle_min_mjs_18hf17i._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_onnxruntime-web_dist_ort_webgpu_bundle_min_mjs_18hf17i._.js");
      case "server/chunks/ssr/node_modules_pako_02jq12o._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_pako_02jq12o._.js");
      case "server/chunks/ssr/node_modules_pdfjs-dist_build_pdf_mjs_0z37jkk._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_pdfjs-dist_build_pdf_mjs_0z37jkk._.js");
      case "server/chunks/ssr/node_modules_react-chartjs-2_dist_index_140o-4r.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/node_modules_react-chartjs-2_dist_index_140o-4r.js");
      case "server/chunks/ssr/src_components_tools_1e__qek._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_1e__qek._.js");
      case "server/chunks/ssr/src_components_tools_calculator_Calculator_tsx_0t4ccb6._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_calculator_Calculator_tsx_0t4ccb6._.js");
      case "server/chunks/ssr/src_components_tools_calculator_calculatorSeoContent_tsx_1bbnwon._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_calculator_calculatorSeoContent_tsx_1bbnwon._.js");
      case "server/chunks/ssr/src_components_tools_converter_unitConverterSeoContent_tsx_0iehrw1._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_converter_unitConverterSeoContent_tsx_0iehrw1._.js");
      case "server/chunks/ssr/src_components_tools_dateTime_meeting-time-finder_meetingTimeFinder_tsx_0gsd77x._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_dateTime_meeting-time-finder_meetingTimeFinder_tsx_0gsd77x._.js");
      case "server/chunks/ssr/src_components_tools_dateTime_timezone-converter_timezoneConverter_tsx_1ofavsd._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_dateTime_timezone-converter_timezoneConverter_tsx_1ofavsd._.js");
      case "server/chunks/ssr/src_components_tools_emiCalculator_EMICalculator_tsx_1oazuf7._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_emiCalculator_EMICalculator_tsx_1oazuf7._.js");
      case "server/chunks/ssr/src_components_tools_emiCalculator_emiCalculatorSeoContent_tsx_15wbend._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_emiCalculator_emiCalculatorSeoContent_tsx_15wbend._.js");
      case "server/chunks/ssr/src_components_tools_financeSuite_investment_investmentReturnsSuite_tsx_0ckuygl._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_financeSuite_investment_investmentReturnsSuite_tsx_0ckuygl._.js");
      case "server/chunks/ssr/src_components_tools_financeSuite_retirement_retirementWealthSuite_tsx_1l2_x3w._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_financeSuite_retirement_retirementWealthSuite_tsx_1l2_x3w._.js");
      case "server/chunks/ssr/src_components_tools_financeSuite_savings_savingsDepositsSuite_tsx_0d0wkpu._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_financeSuite_savings_savingsDepositsSuite_tsx_0d0wkpu._.js");
      case "server/chunks/ssr/src_components_tools_image_backgroundRemover_backgroundRemover_tsx_1dzpwuz._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_backgroundRemover_backgroundRemover_tsx_1dzpwuz._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_ImageCompressor_tsx_1s06i8p._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_ImageCompressor_tsx_1s06i8p._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_compress100SeoContent_tsx_0bo92_d._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_compress100SeoContent_tsx_0bo92_d._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_compress20SeoContent_tsx_08j3f0g._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_compress20SeoContent_tsx_08j3f0g._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_compress50SeoContent_tsx_0l574mv._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_compress50SeoContent_tsx_0l574mv._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_compressJpgSeoContent_tsx_0x_uzjd._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_compressJpgSeoContent_tsx_0x_uzjd._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_compressPngSeoContent_tsx_0m7a6wy._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_compressPngSeoContent_tsx_0m7a6wy._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_compressWebpSeoContent_tsx_0xm3hcv._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_compressWebpSeoContent_tsx_0xm3hcv._.js");
      case "server/chunks/ssr/src_components_tools_image_imageCompressor_imageCompressorSeoContent_tsx_0z21px0._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageCompressor_imageCompressorSeoContent_tsx_0z21px0._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_ImageConverter_tsx_0_ywpvw._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_ImageConverter_tsx_0_ywpvw._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_jpgToPngSeoContent_tsx_18vk_o0._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_jpgToPngSeoContent_tsx_18vk_o0._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_jpgToWebpSeoContent_tsx_1q7l_4x._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_jpgToWebpSeoContent_tsx_1q7l_4x._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_pngToJpegSeoContent_tsx_0wx3kr8._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_pngToJpegSeoContent_tsx_0wx3kr8._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_pngToJpgSeoContent_tsx_03yc2zj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_pngToJpgSeoContent_tsx_03yc2zj._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_pngToWebpSeoContent_tsx_01toog1._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_pngToWebpSeoContent_tsx_01toog1._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_svgToJpgSeoContent_tsx_1mw3kw3._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_svgToJpgSeoContent_tsx_1mw3kw3._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_svgToPngSeoContent_tsx_0obuige._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_svgToPngSeoContent_tsx_0obuige._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_webpToJpegSeoContent_tsx_1447a_-._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_webpToJpegSeoContent_tsx_1447a_-._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_webpToJpgSeoContent_tsx_0h4-60j._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_webpToJpgSeoContent_tsx_0h4-60j._.js");
      case "server/chunks/ssr/src_components_tools_image_imageConverter_webpToPngSeoContent_tsx_0k3ci4u._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_image_imageConverter_webpToPngSeoContent_tsx_0k3ci4u._.js");
      case "server/chunks/ssr/src_components_tools_pdf_compress-pdf_CompressPDF_tsx_1d3ep3x._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_compress-pdf_CompressPDF_tsx_1d3ep3x._.js");
      case "server/chunks/ssr/src_components_tools_pdf_compress-pdf_pdfCompressorSeoContent_tsx_1rglg8m._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_compress-pdf_pdfCompressorSeoContent_tsx_1rglg8m._.js");
      case "server/chunks/ssr/src_components_tools_pdf_image-to-pdf_ImageToPDFSeoContent_tsx_0pb693i._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_image-to-pdf_ImageToPDFSeoContent_tsx_0pb693i._.js");
      case "server/chunks/ssr/src_components_tools_pdf_image-to-pdf_JpgToPdfSeoContent_tsx_1xacevr._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_image-to-pdf_JpgToPdfSeoContent_tsx_1xacevr._.js");
      case "server/chunks/ssr/src_components_tools_pdf_image-to-pdf_PngToPdfSeoContent_tsx_1epyv__._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_image-to-pdf_PngToPdfSeoContent_tsx_1epyv__._.js");
      case "server/chunks/ssr/src_components_tools_pdf_image-to-pdf_WebpToPdfSeoContent_tsx_0bdmwv-._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_image-to-pdf_WebpToPdfSeoContent_tsx_0bdmwv-._.js");
      case "server/chunks/ssr/src_components_tools_pdf_mergePdf_1pjg4u9._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_mergePdf_1pjg4u9._.js");
      case "server/chunks/ssr/src_components_tools_pdf_mergePdf_mergePdfClient_tsx_00dk45n._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_mergePdf_mergePdfClient_tsx_00dk45n._.js");
      case "server/chunks/ssr/src_components_tools_pdf_mergePdf_mergePdfSeoContent_tsx_12nfu_m._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_mergePdf_mergePdfSeoContent_tsx_12nfu_m._.js");
      case "server/chunks/ssr/src_components_tools_pdf_splitPdf_splitPdfSeoContent_tsx_0s0m11w._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_splitPdf_splitPdfSeoContent_tsx_0s0m11w._.js");
      case "server/chunks/ssr/src_components_tools_pdf_splitPdf_splitPdf_tsx_0tbid0o._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_pdf_splitPdf_splitPdf_tsx_0tbid0o._.js");
      case "server/chunks/ssr/src_components_tools_privacysecurity_fileAnalyzer_tsx_0rc2jbl._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_privacysecurity_fileAnalyzer_tsx_0rc2jbl._.js");
      case "server/chunks/ssr/src_components_tools_privacysecurity_filecheckupseocontent_tsx_1qdh7cv._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_privacysecurity_filecheckupseocontent_tsx_1qdh7cv._.js");
      case "server/chunks/ssr/src_components_tools_qrCode_QrCode_tsx_0ro308a._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_qrCode_QrCode_tsx_0ro308a._.js");
      case "server/chunks/ssr/src_components_tools_qrCode_qrCodeSeoContent_tsx_1g5gld2._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_components_tools_qrCode_qrCodeSeoContent_tsx_1g5gld2._.js");
      case "server/chunks/ssr/src_lib_0fo9ki1._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_0fo9ki1._.js");
      case "server/chunks/ssr/src_lib_0u-r0vj._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_0u-r0vj._.js");
      case "server/chunks/ssr/src_lib_1u3ic9g._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_1u3ic9g._.js");
      case "server/chunks/ssr/src_lib_1v3fpns._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_1v3fpns._.js");
      case "server/chunks/ssr/src_lib_analyzers_1pnjrto._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_analyzers_1pnjrto._.js");
      case "server/chunks/ssr/src_lib_fixes_image_ts_09d5-8w._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/src_lib_fixes_image_ts_09d5-8w._.js");
      case "server/chunks/ssr/[root-of-the-server]__198-42w._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__198-42w._.js");
      case "server/chunks/ssr/[root-of-the-server]__1f2jx51._.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/[root-of-the-server]__1f2jx51._.js");
      case "server/chunks/ssr/_next-internal_server_app__global-error_page_actions_0zi5s8-.js": return require("D:/temp/toolkit-v2/.open-next/server-functions/default/.next/server/chunks/ssr/_next-internal_server_app__global-error_page_actions_0zi5s8-.js");
      default:
        throw new Error(`Not found ${chunkPath}`);
    }
  }


  async function loadWasmChunk(chunkPath) {
    switch (chunkPath) {

      default:
        throw new Error(`Unknown wasm chunk: ${chunkPath}`);
    }
  }
