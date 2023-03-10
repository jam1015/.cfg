
nnoremap <Space> <Nop>
let maplocalleader="\\"
let mapleader=" "

" CTRL-U in insert mode deletes a lot.  Use CTRL-G u to first break undo,
" so that you can undo CTRL-U after inserting a line break.
" Revert with ":iunmap <C-U>".
inoremap <C-U> <C-G>u<C-U>

"lets you use escape in terminal mode
tnoremap <localleader><Esc> <C-\><C-N>

" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
" Only define it when not defined already.
" Revert with: ":delcommand DiffOrig".
if !exists(":DiffOrig")
	command DiffOrig vert new | set bt=nofile | r ++edit # | 0d_ | diffthis
				\ | wincmd p | diffthis
endif


" Don't use Ex mode, use Q for formatting.
" Revert with ":unmap Q".
map Q gq

"force visual motion     
nnoremap dj dvj
nnoremap dk dvk
nnoremap 0 ^
nnoremap ^ 0
"nnoremap $ g$
"nnoremap g$ $
"nnoremap 0 g0
"nnoremap g0 0
"nnoremap ^ g^
"nnoremap g^ ^

"<leader>l means no highlighting anymore
nnoremap <silent> <leader>ll :noh<CR>

"make * not move 
nmap <silent> <leader>** yiw<Esc>: let @/ = @"" <CR> :set hls <CR>

"remap omnicomplete
inoremap <C-j> <C-x><C-o>

"for better pasting
inoremap <C-r> <C-r><C-p>


command -nargs=* -complete=help Ter ter ++curwin ++close <args>
cnoreabbrev <expr> ter getcmdtype() == ":" && getcmdline() == "ter" ? "Ter" : "ter"

if !empty($TMUX)
	tnoremap <silent> <C-w> <C-\\><C-n><C-w>
else
	nmap <silent> <C-a> <C-w>
	tmap <C-a> <C-\\><C-o>
endif
