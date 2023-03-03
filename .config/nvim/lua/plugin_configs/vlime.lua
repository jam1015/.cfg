vim.cmd([[
augroup CustomVlimeInputBuffer
  autocmd!
  autocmd FileType vlime_input inoremap <silent> <buffer> <Tab> <C-R>=vlime#plugin#VlimeKey( "tab" )<CR>
  autocmd FileType vlime_input setlocal omnifunc=vlime#plugin#CompleteFunc
  autocmd FileType vlime_input setlocal indentexpr=vlime#plugin#CalcCurIndent()
augroup end
]])
