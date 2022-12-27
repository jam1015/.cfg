 	vim.cmd(
 	[[
 
 nmap <silent> [g <Plug>(coc-diagnostic-prev)
 nmap <silent> ]g <Plug>(coc-diagnostic-next)
 " GoTo code navigation.
 nmap <silent> gd <Plug>(coc-definition)
 nmap <silent> gy <Plug>(coc-type-definition)
 nmap <silent> <leader>gi <Plug>(coc-implementation)
 nmap <silent> gr <Plug>(coc-references)
 
 xmap <leader>aa  <Plug>(coc-codeaction-selected)
 nmap <leader>aa  <Plug>(coc-codeaction-selected)
 " Remap keys for applying codeAction to the current buffer.
 nmap <leader>ac  <Plug>(coc-codeaction)
 " Apply AutoFix to problem on the current line.
 nmap <leader>ca  <Plug>(coc-fix-current)
 
 " Run the Code Lens action on the current line.
 nmap <leader>cl  <Plug>(coc-codelens-action)
 " formatting
 nmap <leader>ff <plug>(coc-format)
 
 let g:coc_start_at_startup = 1
 inoremap <silent><expr> <c-space> coc#refresh()
 "enable or disable coc
 cnoreabbrev <expr> dd  getcmdtype() == ":" && getcmdline() == "dd" ? "CocDisable" : "dd"
 cnoreabbrev <expr> de  getcmdtype() == ":" && getcmdline() == "de" ? "CocEnable" : "de"
 
 " use <tab> for trigger completion and navigate to the next complete item
 function! s:check_back_space() abort
 	let col = col('.') - 1
 	return !col || getline('.')[col - 1]  =~ '\s'
 endfunction
 
 
   " Insert <tab> when previous text is space, refresh completion if not.
 "  inoremap <silent><expr> <TAB>
 "	\ coc#pum#visible() ? coc#pum#next(1):
 "	\ <SID>check_back_space() ? "\<Tab>" :
 "	\ coc#refresh()
 
 "coc version more similar to vscode ------------
   inoremap <silent><expr> <TAB> 
     \ coc#pum#visible() ? coc#_select_confirm() :
     \ coc#expandableOrJumpable() ?
     \ "\<C-r>=coc#rpc#request('doKeymap', ['snippets-expand-jump',''])\<CR>" :
     \ CheckBackSpace() ? "\<TAB>" :
     \ coc#refresh()
 
 let g:coc_snippet_next = '<tab>'
 
 "-----------
 
 inoremap <expr> <Tab> coc#pum#visible() ? coc#pum#next(1) : "\<Tab>"
 inoremap <expr> <S-Tab> coc#pum#visible() ? coc#pum#prev(1) : "\<S-Tab>"
 
 " Use K to show documentation in preview window.
 nnoremap <silent> K :call <SID>show_documentation()<CR>
 
 	]]
 	)
