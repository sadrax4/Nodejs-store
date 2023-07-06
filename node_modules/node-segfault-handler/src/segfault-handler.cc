#include <nan.h>

#define __V8__
#include "backtrace.hpp"

// V8 Isolated context
static FILE *errOutputFile = stderr;
static bool contextAlreadySet = false;

void segfault_handler(int sig) {  

  // Retrieve process ID
  pid_t pid = getpid();

  // Start printing frames
  fprintf(errOutputFile, "=========== Caught a Segmentation Fault [pid=%d] ===========\n", pid);

  // Print native stacktraces
  fprintf(errOutputFile, "-----[ Native Stacktraces ]-----\n");
  Backtrace::PrintNative(errOutputFile);
  
  fprintf(errOutputFile, "\n---[ V8 JavaScript Stacktraces ]---\n");
  // Print V8 stacktraces
  Backtrace::PrintV8(Nan::GetCurrentContext()->GetIsolate(), errOutputFile);
  
  fprintf(errOutputFile, "============================================================\n");
  fclose(errOutputFile);

  exit(1);
}

/**
 * Print native stacktrace
 */
NAN_METHOD(PrintNativeStacktraces) {
  Backtrace::PrintNative(errOutputFile);
}

/**
 * Initialize the segfault handler.
 */
NAN_METHOD(RegisterHandler) {
  if (contextAlreadySet) {
    Nan::ThrowTypeError("Cannot register handler twice");
    return;
  }

  if (info.Length() > 0) {
    if (info[0]->IsString()) {
      auto path = info[0]->ToString(info.GetIsolate()->GetCurrentContext());
      if (!path.IsEmpty()) {
        Nan::Utf8String utfPath(info[0]);
        std::string strUtfPath(*utfPath, utfPath.length());
        errOutputFile = fopen(strUtfPath.c_str(), "w");
        if (errOutputFile == nullptr) {
          Nan::ThrowTypeError("Cannot open file");
          return;
        }
      } else {
        Nan::ThrowTypeError("Path must not be empty");
        return;
      }
    } else if (!info[0]->IsUndefined()) {
      Nan::ThrowTypeError("Expected a string");
      return;
    }
  }

  contextAlreadySet = true;
  // Setup the signal handler
  signal(SIGSEGV, segfault_handler);
}

/**
 * Causes the program to segfault
 */
NAN_METHOD(Segfault) {
  int *bad_ptr = (int*)-1; // make a bad pointer
  printf("%d\n", *bad_ptr); // causes segfault
}

/**
 * When we initialize the module, we register the functions we want to exports
 */
NAN_MODULE_INIT(Init) {
  // Register the functions
  Nan::Set(
    target,
    Nan::New<v8::String>("registerHandler").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(RegisterHandler)).ToLocalChecked()
  );
  Nan::Set(
    target,
    Nan::New<v8::String>("segfault").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(Segfault)).ToLocalChecked()
  );
  Nan::Set(
    target,
    Nan::New<v8::String>("printNativeStacktraces").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(PrintNativeStacktraces)).ToLocalChecked()
  );
}

NODE_MODULE(segfault_handler, Init)