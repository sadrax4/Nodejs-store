# node-segfault-handler

A C++ Node.js module that helps gathering informations on segmentation fault

## Supported Platforms

| Linux | Linux Alpine | Windows | MacOS |
|:-----:|:------------:|:-------:|:-----:|
| Supported    | Supported           |      Partial | Partial    |

## Installation

```bash
sudo apt install pkg-config libunwind-dev
```

```
npm install node-segfault-handler
```

## Requirements

The library `libunwind-dev` is `optionnal`, if not present on your system the library `node-segfault-handler` will still compile but you wont have have the native stacktraces printed when a segfault occurs, you will only see the javascript stacktraces from V8.

The package `node-segfault-handler` relies on `pkg-config` to detect if `libunwind-dev` is installed, if `pkg-config` is not present on your system `node-segfault-handler` will still compile but you wont have have the native stacktraces printed when a segfault occurs, you will only see the javascript stacktraces from V8.

### Compilation

On Linux / MacOS you need to have `GCC` or `Clang` installed

On Windows you need to have either `MSVC` or `MinGW` installed

## Platform Specifications
### Linux & Linux Alpine
If the library `libunwind-dev` is installed on your system, the library `node-segfault-handler` will be compiled with it and the native stacktraces will be printed when a segfault occurs.

In all cases, if the library `libunwind-dev` is installed or not, you will still have the Javascript Stacktraces from V8 printed.
### Other
Native Stacktraces are always disabled on other OS than Linux, but you will still have the Javascript Stacktraces from V8 printed.

## Usage

```ts
let segfaultHandler = require('node-segfault-handler');

/**
 * Once a segfault occurs, 
 * stacktraces from V8 and native stacktraces will be printed to the STDERR or you can provide a path to write to.
 * 
 * @param path File path, if null write to stderr
 */ 
segfaultHandler.registerHandler(path: string?);


// Simulate a segfault from a native module
segfaultHandler.segfault();

```

## Example

```js
let segfaultHandler = require('node-segfault-handler');

function foo() {
  bar();
}

function bar() {
  segfaultHandler.segfault();
}

function main() {
  segfaultHandler.registerHandler();
  foo();
}

main();
```

```
=========== Caught a Segmentation Fault [pid=14435] ===========
-----[ Native Stacktraces ]-----
[pc=0x00007f17bffff7bf, sp=0x00007ffdf48ba120] in segfault_handler(int)+0x4f
[pc=0x00007f17bfad7210, sp=0x00007ffdf48ba140] in killpg+0x40
[pc=0x00007f17bffff844, sp=0x00007ffdf48ba6f8] in Segfault(Nan::FunctionCallbackInfo<v8::Value> const&)+0x4
[pc=0x00007f17bffff90c, sp=0x00007ffdf48ba700] in Nan::imp::FunctionCallbackWrapper(v8::FunctionCallbackInfo<v8::Value> const&)+0xac
[pc=0x0000000000c065f9, sp=0x00007ffdf48ba760] in v8::internal::MaybeHandle<v8::internal::Object> v8::internal::(anonymous namespace)::HandleApiCallHelper<false>(v8::internal::Isolate*, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::HeapObject>, v8::internal::Handle<v8::internal::FunctionTemplateInfo>, v8::internal::Handle<v8::internal::Object>, v8::internal::BuiltinArguments)+0x1c9
[pc=0x0000000000c083e7, sp=0x00007ffdf48ba8a0] in v8::internal::Builtin_HandleApiCall(int, unsigned long*, v8::internal::Isolate*)+0xb7
[pc=0x000000000140df99, sp=0x00007ffdf48ba920] in Builtins_CEntry_Return1_DontSaveFPRegs_ArgvOnStack_BuiltinExit+0x39
[pc=0x0000000001393724, sp=0x00007ffdf48ba930] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba940] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba950] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba960] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba970] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba980] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba990] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba9a0] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba9b0] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001393724, sp=0x00007ffdf48ba9c0] in Builtins_InterpreterEntryTrampoline+0x2a4
[pc=0x0000000001390c9d, sp=0x00007ffdf48ba9d0] in Builtins_JSEntryTrampoline+0x5d
[pc=0x0000000001390a78, sp=0x00007ffdf48ba9e0] in Builtins_JSEntry+0x78
[pc=0x0000000000ceca30, sp=0x00007ffdf48ba9f0] in v8::internal::(anonymous namespace)::Invoke(v8::internal::Isolate*, v8::internal::(anonymous namespace)::InvokeParams const&)+0x1b0
[pc=0x0000000000cecee8, sp=0x00007ffdf48bb000] in v8::internal::Execution::Call(v8::internal::Isolate*, v8::internal::Handle<v8::internal::Object>, v8::internal::Handle<v8::internal::Object>, int, v8::internal::Handle<v8::internal::Object>*)+0x58
[pc=0x0000000000bac32b, sp=0x00007ffdf48bb090] in v8::Function::Call(v8::Local<v8::Context>, v8::Local<v8::Value>, int, v8::Local<v8::Value>*)+0x16b
[pc=0x00000000009e6e41, sp=0x00007ffdf48bb1c0] in node::ExecuteBootstrapper(node::Environment*, char const*, std::vector<v8::Local<v8::String>, std::allocator<v8::Local<v8::String> > >*, std::vector<v8::Local<v8::Value>, std::allocator<v8::Local<v8::Value> > >*)+0x71
[pc=0x00000000009e7156, sp=0x00007ffdf48bb240] in node::StartExecution(node::Environment*, char const*)+0x216
[pc=0x00000000009e8518, sp=0x00007ffdf48bb310] in node::StartExecution(node::Environment*, std::function<v8::MaybeLocal<v8::Value> (node::StartExecutionCallbackInfo const&)>)+0x568
[pc=0x0000000000988f01, sp=0x00007ffdf48bb3a0] in node::LoadEnvironment(node::Environment*)+0x61
[pc=0x0000000000a5d704, sp=0x00007ffdf48bb400] in node::NodeMainInstance::Run()+0x154
[pc=0x00000000009eab6c, sp=0x00007ffdf48bb520] in node::Start(int, char**)+0x2ac
[pc=0x00007f17bfab80b3, sp=0x00007ffdf48bb6a0] in __libc_start_main+0xf3
[pc=0x0000000000981fe5, sp=0x00007ffdf48bb770] in _start+0x29

---[ V8 JavaScript Stacktraces ]---
at bar (/home/shiranuit/node-segfault-handler/tests/test.js:8:19)
at foo (/home/shiranuit/node-segfault-handler/tests/test.js:4:3)
at main (/home/shiranuit/node-segfault-handler/tests/test.js:13:3)
at (null) (/home/shiranuit/node-segfault-handler/tests/test.js:16:1)
at Module._compile (internal/modules/cjs/loader.js:999:30)
at Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
at Module.load (internal/modules/cjs/loader.js:863:32)
at Module._load (internal/modules/cjs/loader.js:708:14)
at executeUserEntryPoint (internal/modules/run_main.js:60:12)
at (null) (internal/main/run_main_module.js:17:47)
============================================================

```
