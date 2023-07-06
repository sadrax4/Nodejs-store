{
  "targets": [
    {
      "target_name": "NodeSegfaultHandler",
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "includes"
      ],
      "sources": ["src/segfault-handler.cc", "src/backtrace.cc"],
      "cflags": [ "-O0", "-funwind-tables" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "variables": {
        # "static_libunwind": "<!(pkg-config --libs libunwind 1>/dev/null 2>/dev/null && echo '-fPIC -Bstatic -llibunwind' || echo '')",
        # "dynamic_libunwind": "<!(pkg-config --libs libunwind 2> /dev/null || echo '')",
        # "use_libunwind": "<!(pkg-config --libs libunwind 1>/dev/null 2>/dev/null && echo 'USE_LIBUNWIND=1' || echo 'USE_LIBUNWIND=0')",
        # "use_musl": "<!(ldd --version 2>&1 | grep musl 1>/dev/null && echo '1' || echo '')"
      },
      "conditions": [
        # [
        #   "use_musl==1", {
        #     "libraries": [
        #       "<(dynamic_libunwind)"
        #     ],
        #     "defines": [
        #       "__V8__",
        #       "<(use_libunwind)"
        #     ]
        #   }
        # ],
        [ 'OS=="linux"', {
          "libraries": [
            "<!(pkg-config --libs libunwind 2> /dev/null || echo '')",
          ],
          "defines": [
            "__V8__",
            "<!(pkg-config --libs libunwind 1>/dev/null 2>/dev/null && echo 'USE_LIBUNWIND=1' || echo 'USE_LIBUNWIND=0')"
          ]
        }],
        [ 'OS!="linux"', {
          "defines": [
            "__V8__",
            "USE_LIBUNWIND=0"
          ]
        }]
      ]
    }
  ]
}
