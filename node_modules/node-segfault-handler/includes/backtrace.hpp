#ifndef __BACKTRACE_H__
#define __BACKTRACE_H__

#include <stdio.h>
#include <signal.h>
#include <stdlib.h>

#if !defined(_WIN32) && (defined(__unix__) || defined(__unix) || (defined(__APPLE__) && defined(__MACH__)))
  #include <unistd.h>
#elif defined(_WIN32)
  #include <process.h>
  #define pid_t int
#endif

#define DEMANGLER_NONE 0
#define DEMANGLER_CXXABI 1
#define DEMANGLER_MSVC 2

#define USE_DEMANGLER DEMANGLER_NONE

#define UNW_LOCAL_ONLY
#if USE_LIBUNWIND==1 && __has_include(<libunwind.h>)
  #define NATIVE_STACKTRACE
  #if __has_include(<cxxabi.h>)
    #include <cxxabi.h>
    #define USE_DEMANGLER DEMANGLER_CXXABI
  #elif defined(_WIN32)
    #include "dbghelp.h"
    #pragma comment(lib, "dbghelp.lib")
    #define USE_DEMANGLER DEMANGLER_MSVC
  #endif
#endif

#ifdef NATIVE_STACKTRACE
  #include <libunwind.h>
#endif

#ifdef __V8__
  #include <nan.h>
#endif // __V8__

class Backtrace {
  public:
    static void PrintNative(FILE *file);
    
    #ifdef __V8__
      static void PrintV8(v8::Isolate *isolate, FILE *file);
    #endif // __V8__
};

#endif // __BACKTRACE_H__