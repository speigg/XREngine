
var Module = (function () {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;

  return (
    function (Module) {
      Module = Module || {};


      var Module = typeof Module !== "undefined" ? Module : {};
      var moduleOverrides = {};
      var key;
      for (key in Module) { if (Module.hasOwnProperty(key)) { moduleOverrides[key] = Module[key] } } Module["arguments"] = [];
      Module["thisProgram"] = "./this.program";
      Module["quit"] = function (status, toThrow) { throw toThrow };
      Module["preRun"] = [];
      Module["postRun"] = [];
      var ENVIRONMENT_IS_WEB = false;
      var ENVIRONMENT_IS_WORKER = false;
      var ENVIRONMENT_IS_NODE = false;
      var ENVIRONMENT_IS_SHELL = false;
      ENVIRONMENT_IS_WEB = typeof window === "object";
      ENVIRONMENT_IS_WORKER = typeof importScripts === "function";
      ENVIRONMENT_IS_NODE = typeof process === "object" && typeof require === "function" && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
      ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
      var scriptDirectory = "";
      function locateFile(path) { if (Module["locateFile"]) { return Module["locateFile"](path, scriptDirectory) } else { return scriptDirectory + path } } if (ENVIRONMENT_IS_NODE) {
        scriptDirectory = __dirname + "/";
        var nodeFS;
        var nodePath;
        Module["read"] = function shell_read(filename, binary) {
          var ret;
          if (!nodeFS) nodeFS = require("browserfs");
          if (!nodePath) nodePath = require("path");
          filename = nodePath["normalize"](filename);
          ret = nodeFS["readFileSync"](filename);
          return binary ? ret : ret.toString()
        };
        Module["readBinary"] = function readBinary(filename) {
          var ret = Module["read"](filename, true);
          if (!ret.buffer) { ret = new Uint8Array(ret) } assert(ret.buffer);
          return ret
        };
        if (process["argv"].length > 1) { Module["thisProgram"] = process["argv"][1].replace(/\\/g, "/") } Module["arguments"] = process["argv"].slice(2);
        process["on"]("uncaughtException", function (ex) { if (!(ex instanceof ExitStatus)) { throw ex } });
        process["on"]("unhandledRejection", abort);
        Module["quit"] = function (status) { process["exit"](status) };
        Module["inspect"] = function () { return "[Emscripten Module object]" }
      } else if (ENVIRONMENT_IS_SHELL) {
        if (typeof read != "undefined") { Module["read"] = function shell_read(f) { return read(f) } } Module["readBinary"] = function readBinary(f) {
          var data;
          if (typeof readbuffer === "function") { return new Uint8Array(readbuffer(f)) } data = read(f, "binary");
          assert(typeof data === "object");
          return data
        };
        if (typeof scriptArgs != "undefined") { Module["arguments"] = scriptArgs } else if (typeof arguments != "undefined") { Module["arguments"] = arguments } if (typeof quit === "function") { Module["quit"] = function (status) { quit(status) } }
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) { scriptDirectory = self.location.href } else if (document.currentScript) { scriptDirectory = document.currentScript.src } if (_scriptDir) { scriptDirectory = _scriptDir } if (scriptDirectory.indexOf("blob:") !== 0) { scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1) } else { scriptDirectory = "" } Module["read"] = function shell_read(url) {
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText
        };
        if (ENVIRONMENT_IS_WORKER) {
          Module["readBinary"] = function readBinary(url) {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(xhr.response)
          }
        } Module["readAsync"] = function readAsync(url, onload, onerror) {
          var xhr = new XMLHttpRequest;
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return
            } onerror()
          };
          xhr.onerror = onerror;
          xhr.send(null)
        };
        Module["setWindowTitle"] = function (title) { document.title = title }
      } else { } var out = Module["print"] || (typeof console !== "undefined" ? console.log.bind(console) : typeof print !== "undefined" ? print : null);
      var err = Module["printErr"] || (typeof printErr !== "undefined" ? printErr : typeof console !== "undefined" && console.warn.bind(console) || out);
      for (key in moduleOverrides) { if (moduleOverrides.hasOwnProperty(key)) { Module[key] = moduleOverrides[key] } } moduleOverrides = undefined;
      var asm2wasmImports = { "f64-rem": function (x, y) { return x % y }, "debugger": function () { debugger } };
      var functionPointers = new Array(0);
      var tempRet0 = 0;
      var setTempRet0 = function (value) { tempRet0 = value };
      if (typeof WebAssembly !== "object") { err("no native wasm support detected") } var wasmMemory;
      var wasmTable;
      var ABORT = false;
      var EXITSTATUS = 0;
      function assert(condition, text) { if (!condition) { abort("Assertion failed: " + text) } } var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;
      function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;
        if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) { return UTF8Decoder.decode(u8Array.subarray(idx, endPtr)) } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = u8Array[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue
            } var u1 = u8Array[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue
            } var u2 = u8Array[idx++] & 63;
            if ((u0 & 240) == 224) { u0 = (u0 & 15) << 12 | u1 << 6 | u2 } else { u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63 } if (u0 < 65536) { str += String.fromCharCode(u0) } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
            }
          }
        } return str
      } function UTF8ToString(ptr, maxBytesToRead) { return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "" } function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0;
          i < str.length;
          ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023
          } if (u <= 127) {
            if (outIdx >= endIdx) break;
            outU8Array[outIdx++] = u
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            outU8Array[outIdx++] = 192 | u >> 6;
            outU8Array[outIdx++] = 128 | u & 63
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            outU8Array[outIdx++] = 224 | u >> 12;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63
          } else {
            if (outIdx + 3 >= endIdx) break;
            outU8Array[outIdx++] = 240 | u >> 18;
            outU8Array[outIdx++] = 128 | u >> 12 & 63;
            outU8Array[outIdx++] = 128 | u >> 6 & 63;
            outU8Array[outIdx++] = 128 | u & 63
          }
        } outU8Array[outIdx] = 0;
        return outIdx - startIdx
      } function stringToUTF8(str, outPtr, maxBytesToWrite) { return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite) } function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0;
          i < str.length;
          ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
          if (u <= 127) ++len;
          else if (u <= 2047) len += 2;
          else if (u <= 65535) len += 3;
          else len += 4
        } return len
      } var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;
      var WASM_PAGE_SIZE = 65536;
      function alignUp(x, multiple) { if (x % multiple > 0) { x += multiple - x % multiple } return x } var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
      function updateGlobalBufferViews() {
        Module["HEAP8"] = HEAP8 = new Int8Array(buffer);
        Module["HEAP16"] = HEAP16 = new Int16Array(buffer);
        Module["HEAP32"] = HEAP32 = new Int32Array(buffer);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(buffer);
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(buffer);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(buffer);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(buffer);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(buffer)
      } var DYNAMIC_BASE = 5255696, DYNAMICTOP_PTR = 12784;
      var TOTAL_STACK = 5242880;
      var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 16777216;
      if (INITIAL_TOTAL_MEMORY < TOTAL_STACK) err("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
      if (Module["buffer"]) { buffer = Module["buffer"] } else {
        if (typeof WebAssembly === "object" && typeof WebAssembly.Memory === "function") {
          wasmMemory = new WebAssembly.Memory({ "initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE });
          buffer = wasmMemory.buffer
        } else { buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY) }
      } updateGlobalBufferViews();
      HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;
      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback();
            continue
          } var func = callback.func;
          if (typeof func === "number") { if (callback.arg === undefined) { Module["dynCall_v"](func) } else { Module["dynCall_vi"](func, callback.arg) } } else { func(callback.arg === undefined ? null : callback.arg) }
        }
      } var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATMAIN__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      function preRun() {
        if (Module["preRun"]) {
          if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
          while (Module["preRun"].length) { addOnPreRun(Module["preRun"].shift()) }
        } callRuntimeCallbacks(__ATPRERUN__)
      } function ensureInitRuntime() {
        if (runtimeInitialized) return;
        runtimeInitialized = true;
        callRuntimeCallbacks(__ATINIT__)
      } function preMain() { callRuntimeCallbacks(__ATMAIN__) } function postRun() {
        if (Module["postRun"]) {
          if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
          while (Module["postRun"].length) { addOnPostRun(Module["postRun"].shift()) }
        } callRuntimeCallbacks(__ATPOSTRUN__)
      } function addOnPreRun(cb) { __ATPRERUN__.unshift(cb) } function addOnPostRun(cb) { __ATPOSTRUN__.unshift(cb) } var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      function addRunDependency(id) {
        runDependencies++;
        if (Module["monitorRunDependencies"]) { Module["monitorRunDependencies"](runDependencies) }
      } function removeRunDependency(id) {
        runDependencies--;
        if (Module["monitorRunDependencies"]) { Module["monitorRunDependencies"](runDependencies) } if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null
          } if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback()
          }
        }
      } Module["preloadedImages"] = {};
      Module["preloadedAudios"] = {};
      var dataURIPrefix = "data:application/octet-stream;base64, "; function isDataURI(filename) { return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0 } var wasmBinaryFile = "recast.wasm";
      if (!isDataURI(wasmBinaryFile)) { wasmBinaryFile = locateFile(wasmBinaryFile) } function getBinary() { try { if (Module["wasmBinary"]) { return new Uint8Array(Module["wasmBinary"]) } if (Module["readBinary"]) { return Module["readBinary"](wasmBinaryFile) } else { throw "both async and sync fetching of the wasm failed" } } catch (err) { abort(err) } } function getBinaryPromise() { if (!Module["wasmBinary"] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") { return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function (response) { if (!response["ok"]) { throw "failed to load wasm binary file at '" + wasmBinaryFile + "'" } return response["arrayBuffer"]() }).catch(function () { return getBinary() }) } return new Promise(function (resolve, reject) { resolve(getBinary()) }) } function createWasm(env) {
        var info = { "env": env, "global": { "NaN": NaN, Infinity: Infinity }, "global.Math": Math, "asm2wasm": asm2wasmImports };
        function receiveInstance(instance, module) {
          var exports = instance.exports;
          Module["asm"] = exports;
          removeRunDependency("wasm-instantiate")
        } addRunDependency("wasm-instantiate");
        if (Module["instantiateWasm"]) {
          try { return Module["instantiateWasm"](info, receiveInstance) } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false
          }
        } function receiveInstantiatedSource(output) { receiveInstance(output["instance"]) } function instantiateArrayBuffer(receiver) {
          getBinaryPromise().then(function (binary) { return WebAssembly.instantiate(binary, info) }).then(receiver, function (reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason)
          })
        } if (!Module["wasmBinary"] && typeof WebAssembly.instantiateStreaming === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
          WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, { credentials: "same-origin" }), info).then(receiveInstantiatedSource, function (reason) {
            err("wasm streaming compile failed: " + reason);
            err("falling back to ArrayBuffer instantiation");
            instantiateArrayBuffer(receiveInstantiatedSource)
          })
        } else { instantiateArrayBuffer(receiveInstantiatedSource) } return {}
      } Module["asm"] = function (global, env, providedBuffer) {
        env["memory"] = wasmMemory;
        env["table"] = wasmTable = new WebAssembly.Table({ "initial": 86, "maximum": 86, "element": "anyfunc" });
        env["__memory_base"] = 1024;
        env["__table_base"] = 0;
        var exports = createWasm(env);
        return exports
      };
      __ATINIT__.push({ func: function () { globalCtors() } });
      function ___assert_fail(condition, filename, line, func) { abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]) } function ___cxa_allocate_exception(size) { return _malloc(size) } function __ZSt18uncaught_exceptionv() { return !!__ZSt18uncaught_exceptionv.uncaught_exception } function ___cxa_free_exception(ptr) { try { return _free(ptr) } catch (e) { } } var EXCEPTIONS = {
        last: 0, caught: [], infos: {}, deAdjust: function (adjusted) {
          if (!adjusted || EXCEPTIONS.infos[adjusted]) return adjusted;
          for (var key in EXCEPTIONS.infos) {
            var ptr = +key;
            var adj = EXCEPTIONS.infos[ptr].adjusted;
            var len = adj.length;
            for (var i = 0;
              i < len;
              i++) { if (adj[i] === adjusted) { return ptr } }
          } return adjusted
        }, addRef: function (ptr) {
          if (!ptr) return;
          var info = EXCEPTIONS.infos[ptr];
          info.refcount++
        }, decRef: function (ptr) {
          if (!ptr) return;
          var info = EXCEPTIONS.infos[ptr];
          assert(info.refcount > 0);
          info.refcount--;
          if (info.refcount === 0 && !info.rethrown) {
            if (info.destructor) { Module["dynCall_vi"](info.destructor, ptr) } delete EXCEPTIONS.infos[ptr];
            ___cxa_free_exception(ptr)
          }
        }, clearRef: function (ptr) {
          if (!ptr) return;
          var info = EXCEPTIONS.infos[ptr];
          info.refcount = 0
        }
      };
      function ___cxa_throw(ptr, type, destructor) {
        EXCEPTIONS.infos[ptr] = { ptr: ptr, adjusted: [ptr], type: type, destructor: destructor, refcount: 0, caught: false, rethrown: false };
        EXCEPTIONS.last = ptr;
        if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) { __ZSt18uncaught_exceptionv.uncaught_exception = 1 } else { __ZSt18uncaught_exceptionv.uncaught_exception++ } throw ptr
      } var SYSCALLS = {
        buffers: [null, [], []], printChar: function (stream, curr) {
          var buffer = SYSCALLS.buffers[stream];
          if (curr === 0 || curr === 10) {
            (stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
            buffer.length = 0
          } else { buffer.push(curr) }
        }, varargs: 0, get: function (varargs) {
          SYSCALLS.varargs += 4;
          var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
          return ret
        }, getStr: function () {
          var ret = UTF8ToString(SYSCALLS.get());
          return ret
        }, get64: function () {
          var low = SYSCALLS.get(), high = SYSCALLS.get();
          return low
        }, getZero: function () { SYSCALLS.get() }
      };
      function ___syscall140(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
          return 0
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return -e.errno
        }
      } function ___syscall146(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.get(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
          var ret = 0;
          for (var i = 0;
            i < iovcnt;
            i++) {
            var ptr = HEAP32[iov + i * 8 >> 2];
            var len = HEAP32[iov + (i * 8 + 4) >> 2];
            for (var j = 0;
              j < len;
              j++) { SYSCALLS.printChar(stream, HEAPU8[ptr + j]) } ret += len
          } return ret
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return -e.errno
        }
      } function ___syscall54(which, varargs) {
        SYSCALLS.varargs = varargs;
        try { return 0 } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return -e.errno
        }
      } function ___syscall6(which, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD();
          return 0
        } catch (e) {
          if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
          return -e.errno
        }
      } function getShiftFromSize(size) {
        switch (size) {
          case 1: return 0;
          case 2: return 1;
          case 4: return 2;
          case 8: return 3;
          default: throw new TypeError("Unknown type size: " + size)
        }
      } function embind_init_charCodes() {
        var codes = new Array(256);
        for (var i = 0;
          i < 256;
          ++i) { codes[i] = String.fromCharCode(i) } embind_charCodes = codes
      } var embind_charCodes = undefined;
      function readLatin1String(ptr) {
        var ret = "";
        var c = ptr;
        while (HEAPU8[c]) { ret += embind_charCodes[HEAPU8[c++]] } return ret
      } var awaitingDependencies = {};
      var registeredTypes = {};
      var typeDependencies = {};
      var char_0 = 48;
      var char_9 = 57;
      function makeLegalFunctionName(name) {
        if (undefined === name) { return "_unknown" } name = name.replace(/[^a-zA-Z0-9_]/g, "$");
        var f = name.charCodeAt(0);
        if (f >= char_0 && f <= char_9) { return "_" + name } else { return name }
      } function createNamedFunction(name, body) {
        name = makeLegalFunctionName(name);
        return new Function("body", "return function " + name + "() {\n" + '    "use strict";' + "    return body.apply(this, arguments);\n" + "};\n")(body)
      } function extendError(baseErrorType, errorName) {
        var errorClass = createNamedFunction(errorName, function (message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== undefined) { this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "") }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function () { if (this.message === undefined) { return this.name } else { return this.name + ": " + this.message } };
        return errorClass
      } var BindingError = undefined;
      function throwBindingError(message) { throw new BindingError(message) } var InternalError = undefined;
      function throwInternalError(message) { throw new InternalError(message) } function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
        myTypes.forEach(function (type) { typeDependencies[type] = dependentTypes });
        function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) { throwInternalError("Mismatched type converter count") } for (var i = 0;
            i < myTypes.length;
            ++i) { registerType(myTypes[i], myTypeConverters[i]) }
        } var typeConverters = new Array(dependentTypes.length);
        var unregisteredTypes = [];
        var registered = 0;
        dependentTypes.forEach(function (dt, i) {
          if (registeredTypes.hasOwnProperty(dt)) { typeConverters[i] = registeredTypes[dt] } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) { awaitingDependencies[dt] = [] } awaitingDependencies[dt].push(function () {
              typeConverters[i] = registeredTypes[dt];
              ++registered;
              if (registered === unregisteredTypes.length) { onComplete(typeConverters) }
            })
          }
        });
        if (0 === unregisteredTypes.length) { onComplete(typeConverters) }
      } function registerType(rawType, registeredInstance, options) {
        options = options || {};
        if (!("argPackAdvance" in registeredInstance)) { throw new TypeError("registerType registeredInstance requires argPackAdvance") } var name = registeredInstance.name;
        if (!rawType) { throwBindingError('type "' + name + '" must have a positive integer typeid pointer') } if (registeredTypes.hasOwnProperty(rawType)) { if (options.ignoreDuplicateRegistrations) { return } else { throwBindingError("Cannot register type '" + name + "' twice") } } registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach(function (cb) { cb() })
        }
      } function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, {
          name: name, "fromWireType": function (wt) { return !!wt }, "toWireType": function (destructors, o) { return o ? trueValue : falseValue }, "argPackAdvance": 8, "readValueFromPointer": function (pointer) {
            var heap;
            if (size === 1) { heap = HEAP8 } else if (size === 2) { heap = HEAP16 } else if (size === 4) { heap = HEAP32 } else { throw new TypeError("Unknown boolean type size: " + name) } return this["fromWireType"](heap[pointer >> shift])
          }, destructorFunction: null
        })
      } var emval_free_list = [];
      var emval_handle_array = [{}, { value: undefined }, { value: null }, { value: true }, { value: false }];
      function __emval_decref(handle) {
        if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = undefined;
          emval_free_list.push(handle)
        }
      } function count_emval_handles() {
        var count = 0;
        for (var i = 5;
          i < emval_handle_array.length;
          ++i) { if (emval_handle_array[i] !== undefined) { ++count } } return count
      } function get_first_emval() {
        for (var i = 5;
          i < emval_handle_array.length;
          ++i) { if (emval_handle_array[i] !== undefined) { return emval_handle_array[i] } } return null
      } function init_emval() {
        Module["count_emval_handles"] = count_emval_handles;
        Module["get_first_emval"] = get_first_emval
      } function __emval_register(value) {
        switch (value) {
          case undefined: { return 1 } case null: { return 2 } case true: { return 3 } case false: { return 4 } default: {
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            emval_handle_array[handle] = { refcount: 1, value: value };
            return handle
          }
        }
      } function simpleReadValueFromPointer(pointer) { return this["fromWireType"](HEAPU32[pointer >> 2]) } function __embind_register_emval(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, {
          name: name, "fromWireType": function (handle) {
            var rv = emval_handle_array[handle].value;
            __emval_decref(handle);
            return rv
          }, "toWireType": function (destructors, value) { return __emval_register(value) }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: null
        })
      } function _embind_repr(v) {
        if (v === null) { return "null" } var t = typeof v;
        if (t === "object" || t === "array" || t === "function") { return v.toString() } else { return "" + v }
      } function floatReadValueFromPointer(name, shift) {
        switch (shift) {
          case 2: return function (pointer) { return this["fromWireType"](HEAPF32[pointer >> 2]) };
          case 3: return function (pointer) { return this["fromWireType"](HEAPF64[pointer >> 3]) };
          default: throw new TypeError("Unknown float type: " + name)
        }
      } function __embind_register_float(rawType, name, size) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, { name: name, "fromWireType": function (value) { return value }, "toWireType": function (destructors, value) { if (typeof value !== "number" && typeof value !== "boolean") { throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name) } return value }, "argPackAdvance": 8, "readValueFromPointer": floatReadValueFromPointer(name, shift), destructorFunction: null })
      } function new_(constructor, argumentList) {
        if (!(constructor instanceof Function)) { throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function") } var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function () { });
        dummy.prototype = constructor.prototype;
        var obj = new dummy;
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj
      } function runDestructors(destructors) {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr)
        }
      } function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
        var argCount = argTypes.length;
        if (argCount < 2) { throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!") } var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = false;
        for (var i = 1;
          i < argTypes.length;
          ++i) {
          if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
            needsDestructorStack = true;
            break
          }
        } var returns = argTypes[0].name !== "void";
        var argsList = "";
        var argsListWired = "";
        for (var i = 0;
          i < argCount - 2;
          ++i) {
          argsList += (i !== 0 ? ", " : "") + "arg" + i;
          argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired"
        } var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\n" + "if (arguments.length !== " + (argCount - 2) + ") {\n" + "throwBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n" + "} \n";
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n"
        } var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
        var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
        if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n"
        } for (var i = 0;
          i < argCount - 2;
          ++i) {
          invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + ");// " + argTypes[i + 2].name + "\n";
          args1.push("argType" + i);
          args2.push(argTypes[i + 2])
        } if (isClassMethodFunc) { argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired } invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n"
        } else {
          for (var i = isClassMethodFunc ? 1 : 2;
            i < argTypes.length;
            ++i) {
            var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
              invokerFnBody += paramName + "_dtor(" + paramName + ");// " + argTypes[i].name + "\n";
              args1.push(paramName + "_dtor");
              args2.push(argTypes[i].destructorFunction)
            }
          }
        } if (returns) {
          invokerFnBody += "var ret = retType.fromWireType(rv);\n" + "return ret;\n"
        } else { } invokerFnBody += "} \n";
        args1.push(invokerFnBody);
        var invokerFunction = new_(Function, args1).apply(null, args2);
        return invokerFunction
      } function ensureOverloadTable(proto, methodName, humanName) {
        if (undefined === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function () { if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) { throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!") } return proto[methodName].overloadTable[arguments.length].apply(this, arguments) };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc
        }
      } function exposePublicSymbol(name, value, numArguments) {
        if (Module.hasOwnProperty(name)) {
          if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) { throwBindingError("Cannot register public name '" + name + "' twice") } ensureOverloadTable(Module, name, name);
          if (Module.hasOwnProperty(numArguments)) { throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!") } Module[name].overloadTable[numArguments] = value
        } else {
          Module[name] = value;
          if (undefined !== numArguments) { Module[name].numArguments = numArguments }
        }
      } function heap32VectorToArray(count, firstElement) {
        var array = [];
        for (var i = 0;
          i < count;
          i++) { array.push(HEAP32[(firstElement >> 2) + i]) } return array
      } function replacePublicSymbol(name, value, numArguments) {
        if (!Module.hasOwnProperty(name)) { throwInternalError("Replacing nonexistant public symbol") } if (undefined !== Module[name].overloadTable && undefined !== numArguments) { Module[name].overloadTable[numArguments] = value } else {
          Module[name] = value;
          Module[name].argCount = numArguments
        }
      } function embind__requireFunction(signature, rawFunction) {
        signature = readLatin1String(signature);
        function makeDynCaller(dynCall) {
          var args = [];
          for (var i = 1;
            i < signature.length;
            ++i) { args.push("a" + i) } var name = "dynCall_" + signature + "_" + rawFunction;
          var body = "return function " + name + "(" + args.join(", ") + ") {\n";
          body += "    return dynCall(rawFunction" + (args.length ? ", " : "") + args.join(", ") + ");\n"; body += "};\n";
          return new Function("dynCall", "rawFunction", body)(dynCall, rawFunction)
        } var fp;
        if (Module["FUNCTION_TABLE_" + signature] !== undefined) { fp = Module["FUNCTION_TABLE_" + signature][rawFunction] } else if (typeof FUNCTION_TABLE !== "undefined") { fp = FUNCTION_TABLE[rawFunction] } else {
          var dc = Module["dynCall_" + signature];
          if (dc === undefined) {
            dc = Module["dynCall_" + signature.replace(/f/g, "d")];
            if (dc === undefined) { throwBindingError("No dynCall invoker for signature: " + signature) }
          } fp = makeDynCaller(dc)
        } if (typeof fp !== "function") { throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction) } return fp
      } var UnboundTypeError = undefined;
      function getTypeName(type) {
        var ptr = ___getTypeName(type);
        var rv = readLatin1String(ptr);
        _free(ptr);
        return rv
      } function throwUnboundTypeError(message, types) {
        var unboundTypes = [];
        var seen = {};
        function visit(type) {
          if (seen[type]) { return } if (registeredTypes[type]) { return } if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return
          } unboundTypes.push(type);
          seen[type] = true
        } types.forEach(visit);
        throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]))
      } function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn) {
        var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        name = readLatin1String(name);
        rawInvoker = embind__requireFunction(signature, rawInvoker);
        exposePublicSymbol(name, function () { throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes) }, argCount - 1);
        whenDependentTypesAreResolved([], argTypes, function (argTypes) {
          var invokerArgsArray = [argTypes[0], null].concat(argTypes.slice(1));
          replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn), argCount - 1);
          return []
        })
      } function integerReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0: return signed ? function readS8FromPointer(pointer) { return HEAP8[pointer] } : function readU8FromPointer(pointer) { return HEAPU8[pointer] };
          case 1: return signed ? function readS16FromPointer(pointer) { return HEAP16[pointer >> 1] } : function readU16FromPointer(pointer) { return HEAPU16[pointer >> 1] };
          case 2: return signed ? function readS32FromPointer(pointer) { return HEAP32[pointer >> 2] } : function readU32FromPointer(pointer) { return HEAPU32[pointer >> 2] };
          default: throw new TypeError("Unknown integer type: " + name)
        }
      } function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
        name = readLatin1String(name);
        if (maxRange === -1) { maxRange = 4294967295 } var shift = getShiftFromSize(size);
        var fromWireType = function (value) { return value };
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = function (value) { return value << bitshift >>> bitshift }
        } var isUnsignedType = name.indexOf("unsigned") != -1;
        registerType(primitiveType, { name: name, "fromWireType": fromWireType, "toWireType": function (destructors, value) { if (typeof value !== "number" && typeof value !== "boolean") { throw new TypeError('Cannot convert "' + _embind_repr(value) + '" to ' + this.name) } if (value < minRange || value > maxRange) { throw new TypeError('Passing a number "' + _embind_repr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ", " + maxRange + "]!") } return isUnsignedType ? value >>> 0 : value | 0 }, "argPackAdvance": 8, "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null })
      } function __embind_register_memory_view(rawType, dataTypeIndex, name) {
        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle];
          var data = heap[handle + 1];
          return new TA(heap["buffer"], data, size)
        } name = readLatin1String(name);
        registerType(rawType, { name: name, "fromWireType": decodeMemoryView, "argPackAdvance": 8, "readValueFromPointer": decodeMemoryView }, { ignoreDuplicateRegistrations: true })
      } function __embind_register_std_string(rawType, name) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, {
          name: name, "fromWireType": function (value) {
            var length = HEAPU32[value >> 2];
            var str;
            if (stdStringIsUTF8) {
              var endChar = HEAPU8[value + 4 + length];
              var endCharSwap = 0;
              if (endChar != 0) {
                endCharSwap = endChar;
                HEAPU8[value + 4 + length] = 0
              } var decodeStartPtr = value + 4;
              for (var i = 0;
                i <= length;
                ++i) {
                var currentBytePtr = value + 4 + i;
                if (HEAPU8[currentBytePtr] == 0) {
                  var stringSegment = UTF8ToString(decodeStartPtr);
                  if (str === undefined) str = stringSegment;
                  else {
                    str += String.fromCharCode(0);
                    str += stringSegment
                  } decodeStartPtr = currentBytePtr + 1
                }
              } if (endCharSwap != 0) HEAPU8[value + 4 + length] = endCharSwap
            } else {
              var a = new Array(length);
              for (var i = 0;
                i < length;
                ++i) { a[i] = String.fromCharCode(HEAPU8[value + 4 + i]) } str = a.join("")
            } _free(value);
            return str
          }, "toWireType": function (destructors, value) {
            if (value instanceof ArrayBuffer) { value = new Uint8Array(value) } var getLength;
            var valueIsOfTypeString = typeof value === "string";
            if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) { throwBindingError("Cannot pass non-string to std::string") } if (stdStringIsUTF8 && valueIsOfTypeString) { getLength = function () { return lengthBytesUTF8(value) } } else { getLength = function () { return value.length } } var length = getLength();
            var ptr = _malloc(4 + length + 1);
            HEAPU32[ptr >> 2] = length;
            if (stdStringIsUTF8 && valueIsOfTypeString) { stringToUTF8(value, ptr + 4, length + 1) } else {
              if (valueIsOfTypeString) {
                for (var i = 0;
                  i < length;
                  ++i) {
                  var charCode = value.charCodeAt(i);
                  if (charCode > 255) {
                    _free(ptr);
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits")
                  } HEAPU8[ptr + 4 + i] = charCode
                }
              } else {
                for (var i = 0;
                  i < length;
                  ++i) { HEAPU8[ptr + 4 + i] = value[i] }
              }
            } if (destructors !== null) { destructors.push(_free, ptr) } return ptr
          }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function (ptr) { _free(ptr) }
        })
      } function __embind_register_std_wstring(rawType, charSize, name) {
        name = readLatin1String(name);
        var getHeap, shift;
        if (charSize === 2) {
          getHeap = function () { return HEAPU16 };
          shift = 1
        } else if (charSize === 4) {
          getHeap = function () { return HEAPU32 };
          shift = 2
        } registerType(rawType, {
          name: name, "fromWireType": function (value) {
            var HEAP = getHeap();
            var length = HEAPU32[value >> 2];
            var a = new Array(length);
            var start = value + 4 >> shift;
            for (var i = 0;
              i < length;
              ++i) { a[i] = String.fromCharCode(HEAP[start + i]) } _free(value);
            return a.join("")
          }, "toWireType": function (destructors, value) {
            var HEAP = getHeap();
            var length = value.length;
            var ptr = _malloc(4 + length * charSize);
            HEAPU32[ptr >> 2] = length;
            var start = ptr + 4 >> shift;
            for (var i = 0;
              i < length;
              ++i) { HEAP[start + i] = value.charCodeAt(i) } if (destructors !== null) { destructors.push(_free, ptr) } return ptr
          }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function (ptr) { _free(ptr) }
        })
      } function __embind_register_void(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, { isVoid: true, name: name, "argPackAdvance": 0, "fromWireType": function () { return undefined }, "toWireType": function (destructors, o) { return undefined } })
      } function requireHandle(handle) { if (!handle) { throwBindingError("Cannot use deleted val. handle = " + handle) } return emval_handle_array[handle].value } function requireRegisteredType(rawType, humanName) {
        var impl = registeredTypes[rawType];
        if (undefined === impl) { throwBindingError(humanName + " has unknown type " + getTypeName(rawType)) } return impl
      } function __emval_as(handle, returnType, destructorsRef) {
        handle = requireHandle(handle);
        returnType = requireRegisteredType(returnType, "emval::as");
        var destructors = [];
        var rd = __emval_register(destructors);
        HEAP32[destructorsRef >> 2] = rd;
        return returnType["toWireType"](destructors, handle)
      } function __emval_get_property(handle, key) {
        handle = requireHandle(handle);
        key = requireHandle(key);
        return __emval_register(handle[key])
      } function __emval_incref(handle) { if (handle > 4) { emval_handle_array[handle].refcount += 1 } } var emval_symbols = {};
      function getStringOrSymbol(address) {
        var symbol = emval_symbols[address];
        if (symbol === undefined) { return readLatin1String(address) } else { return symbol }
      } function __emval_new_cstring(v) { return __emval_register(getStringOrSymbol(v)) } function __emval_run_destructors(handle) {
        var destructors = emval_handle_array[handle].value;
        runDestructors(destructors);
        __emval_decref(handle)
      } function __emval_take_value(type, argv) {
        type = requireRegisteredType(type, "_emval_take_value");
        var v = type["readValueFromPointer"](argv);
        return __emval_register(v)
      } function _abort() { Module["abort"]() } function _emscripten_get_heap_size() { return HEAP8.length } function abortOnCannotGrowMemory(requestedSize) { abort("OOM") } function emscripten_realloc_buffer(size) {
        var PAGE_MULTIPLE = 65536;
        size = alignUp(size, PAGE_MULTIPLE);
        var oldSize = buffer.byteLength;
        try {
          var result = wasmMemory.grow((size - oldSize) / 65536);
          if (result !== (-1 | 0)) {
            buffer = wasmMemory.buffer;
            return true
          } else { return false }
        } catch (e) { return false }
      } function _emscripten_resize_heap(requestedSize) {
        var oldSize = _emscripten_get_heap_size();
        var PAGE_MULTIPLE = 65536;
        var LIMIT = 2147483648 - PAGE_MULTIPLE;
        if (requestedSize > LIMIT) { return false } var MIN_TOTAL_MEMORY = 16777216;
        var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
        while (newSize < requestedSize) { if (newSize <= 536870912) { newSize = alignUp(2 * newSize, PAGE_MULTIPLE) } else { newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT) } } if (!emscripten_realloc_buffer(newSize)) { return false } updateGlobalBufferViews();
        return true
      } function _emscripten_memcpy_big(dest, src, num) { HEAPU8.set(HEAPU8.subarray(src, src + num), dest) } function ___setErrNo(value) {
        if (Module["___errno_location"]) HEAP32[Module["___errno_location"]() >> 2] = value;
        return value
      } embind_init_charCodes();
      BindingError = Module["BindingError"] = extendError(Error, "BindingError");
      InternalError = Module["InternalError"] = extendError(Error, "InternalError");
      init_emval();
      UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
      var asmGlobalArg = {};
      var asmLibraryArg = { "c": abort, "t": setTempRet0, "b": ___assert_fail, "B": ___cxa_allocate_exception, "u": ___cxa_throw, "j": ___setErrNo, "s": ___syscall140, "i": ___syscall146, "r": ___syscall54, "q": ___syscall6, "p": __embind_register_bool, "F": __embind_register_emval, "o": __embind_register_float, "g": __embind_register_function, "e": __embind_register_integer, "d": __embind_register_memory_view, "n": __embind_register_std_string, "E": __embind_register_std_wstring, "D": __embind_register_void, "h": __emval_as, "C": __emval_decref, "m": __emval_get_property, "l": __emval_incref, "A": __emval_new_cstring, "z": __emval_run_destructors, "f": __emval_take_value, "k": _abort, "y": _emscripten_get_heap_size, "x": _emscripten_memcpy_big, "w": _emscripten_resize_heap, "v": abortOnCannotGrowMemory, "a": DYNAMICTOP_PTR };
      var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);
      Module["asm"] = asm;
      var ___errno_location = Module["___errno_location"] = function () { return Module["asm"]["G"].apply(null, arguments) };
      var ___getTypeName = Module["___getTypeName"] = function () { return Module["asm"]["H"].apply(null, arguments) };
      var _free = Module["_free"] = function () { return Module["asm"]["I"].apply(null, arguments) };
      var _malloc = Module["_malloc"] = function () { return Module["asm"]["J"].apply(null, arguments) };
      var globalCtors = Module["globalCtors"] = function () { return Module["asm"]["Y"].apply(null, arguments) };
      var dynCall_ifffffffffffff = Module["dynCall_ifffffffffffff"] = function () { return Module["asm"]["K"].apply(null, arguments) };
      var dynCall_ii = Module["dynCall_ii"] = function () { return Module["asm"]["L"].apply(null, arguments) };
      var dynCall_iidiiii = Module["dynCall_iidiiii"] = function () { return Module["asm"]["M"].apply(null, arguments) };
      var dynCall_iifffffffffffff = Module["dynCall_iifffffffffffff"] = function () { return Module["asm"]["N"].apply(null, arguments) };
      var dynCall_iii = Module["dynCall_iii"] = function () { return Module["asm"]["O"].apply(null, arguments) };
      var dynCall_iiii = Module["dynCall_iiii"] = function () { return Module["asm"]["P"].apply(null, arguments) };
      var dynCall_jiji = Module["dynCall_jiji"] = function () { return Module["asm"]["Q"].apply(null, arguments) };
      var dynCall_v = Module["dynCall_v"] = function () { return Module["asm"]["R"].apply(null, arguments) };
      var dynCall_vi = Module["dynCall_vi"] = function () { return Module["asm"]["S"].apply(null, arguments) };
      var dynCall_vii = Module["dynCall_vii"] = function () { return Module["asm"]["T"].apply(null, arguments) };
      var dynCall_viii = Module["dynCall_viii"] = function () { return Module["asm"]["U"].apply(null, arguments) };
      var dynCall_viiii = Module["dynCall_viiii"] = function () { return Module["asm"]["V"].apply(null, arguments) };
      var dynCall_viiiii = Module["dynCall_viiiii"] = function () { return Module["asm"]["W"].apply(null, arguments) };
      var dynCall_viiiiii = Module["dynCall_viiiiii"] = function () { return Module["asm"]["X"].apply(null, arguments) };
      Module["asm"] = asm;
      Module["then"] = function (func) {
        if (Module["calledRun"]) { func(Module) } else {
          var old = Module["onRuntimeInitialized"];
          Module["onRuntimeInitialized"] = function () {
            if (old) old();
            func(Module)
          }
        } return Module
      };
      function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status
      } ExitStatus.prototype = new Error;
      ExitStatus.prototype.constructor = ExitStatus;
      dependenciesFulfilled = function runCaller() {
        if (!Module["calledRun"]) run();
        if (!Module["calledRun"]) dependenciesFulfilled = runCaller
      };
      function run(args) {
        args = args || Module["arguments"];
        if (runDependencies > 0) { return } preRun();
        if (runDependencies > 0) return;
        if (Module["calledRun"]) return;
        function doRun() {
          if (Module["calledRun"]) return;
          Module["calledRun"] = true;
          if (ABORT) return;
          ensureInitRuntime();
          preMain();
          if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
          postRun()
        } if (Module["setStatus"]) {
          Module["setStatus"]("Running...");
          setTimeout(function () {
            setTimeout(function () { Module["setStatus"]("") }, 1);
            doRun()
          }, 1)
        } else { doRun() }
      } Module["run"] = run;
      function abort(what) {
        if (Module["onAbort"]) { Module["onAbort"](what) } if (what !== undefined) {
          out(what);
          err(what);
          what = JSON.stringify(what)
        } else { what = "" } ABORT = true;
        EXITSTATUS = 1;
        throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info."
      } Module["abort"] = abort;
      if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
        while (Module["preInit"].length > 0) { Module["preInit"].pop()() }
      } Module["noExitRuntime"] = true;
      run();
      Module["ready"] = new Promise(function (resolve, reject) {
        delete Module["then"];
        Module["onAbort"] = function (what) { reject(what) };
        addOnPostRun(function () { resolve(Module) })
      });



      return Module
    }
  );

})();

export default Module;
