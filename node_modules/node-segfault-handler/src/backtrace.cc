#include "backtrace.hpp"

#ifdef NATIVE_STACKTRACE
char *demangle(char *name) {
  #if USE_DEMANGLER==DEMANGLER_CXXABI
    int status = 0;
    return abi::__cxa_demangle(name, NULL, NULL, &status);
  #elif USE_DEMANGLER==DEMANGLER_MSVC
    return name; // TODO: implement MSVC demangler
  #else
    return name;
  #endif
}
#endif // NATIVE_STACKTRACE

/**
 * Print native stack trace of current thread.
 */
void Backtrace::PrintNative(FILE *file) {

  #ifdef NATIVE_STACKTRACE
    unw_cursor_t cursor;
    unw_context_t context;

    // print out all the frames to stderr
    // Initialize cursor to current frame for local unwinding.
    unw_getcontext(&context);
    unw_init_local(&cursor, &context);

    // Unwind frames one by one, going up the frame stack.
    while (unw_step(&cursor))
    {
      unw_word_t offset, instruction_pointer, stack_pointer;

      unw_get_reg(&cursor, UNW_REG_IP, &instruction_pointer);
      unw_get_reg(&cursor, UNW_REG_SP, &stack_pointer);

      fprintf(file, "[pc=0x%016lx, sp=0x%016lx] ", instruction_pointer, stack_pointer);

      char symbol_name[256] = {"<unknown symbol>"};
      char *name = symbol_name;
      if (unw_get_proc_name(&cursor, symbol_name, sizeof(symbol_name), &offset) == 0)
      {
        // If cannot demangle name, use the symbol name
        if ((name = demangle(symbol_name)) == 0)
        { // Failed to demangle symbol_name
          name = symbol_name;
        }
      }

      fprintf(file, "in %s+0x%lx\n", name, offset);
    }
  #else
    fprintf(file, "Cannot unwind stacktraces: Feature disabled / Missing libunwind on your system\n");
  #endif
}

#ifdef __V8__ 

/**
 * Print V8 stack trace of isolated context.
 */ 
void Backtrace::PrintV8(v8::Isolate *isolate, FILE *file) {
  if (isolate == nullptr) {
    fprintf(file, "Cannot print V8 stacktraces: Isolate is null\n");
    return;
  }

  // Retrieve current stacktraces from isolate
  v8::Local<v8::StackTrace> traces = v8::StackTrace::CurrentStackTrace(isolate, 255);
  for (int i = 0; i < traces->GetFrameCount(); i++) {
    //Retrieve specific frame
    v8::Local<v8::StackFrame> frame = traces->GetFrame(isolate, i);
    // Convert to function name to UTF8 string
    v8::String::Utf8Value funcName(isolate, frame->GetFunctionName());
    // Convert to script name to UTF8 string
    v8::String::Utf8Value scriptName(isolate, frame->GetScriptName());
    int lineNumber = frame->GetLineNumber();
    int column = frame->GetColumn();
    fprintf(file, "at %s (%s:%d:%d)\n", *funcName, *scriptName, lineNumber, column);
  }
}

#endif // __V8__
