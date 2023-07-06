let segfaultHandler = require('bindings')('NodeSegfaultHandler');

module.exports = {
    registerHandler: segfaultHandler.registerHandler,
    segfault: segfaultHandler.segfault,
    printNativeStacktraces: segfaultHandler.printNativeStacktraces
};