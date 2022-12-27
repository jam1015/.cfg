if exists('skip_defaults_vim')
  finish
endif
"
"
if has('win32')
  set guioptions-=t
endif
""
if &t_Co > 2 || has("gui_running")
"  " Revert with ":syntax off".

  " I like highlighting strings inside C comments.
  " Revert with ":unlet c_comment_strings".
  let c_comment_strings=1
endif
