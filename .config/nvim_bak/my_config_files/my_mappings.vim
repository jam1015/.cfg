"---custom keybindings go here--------
nnoremap <Space> <Nop>
let mapleader="\\"
"let maplocalleader="\<Space>"
let maplocalleader=" "
"
"
""<leader>l means no highlighting anymore
nnoremap <silent> <leader>ll :noh<CR>
"


"make * not move 
nmap <silent> <leader>** yiw<Esc>: let @/ = @"" <CR> :set hls <CR>

"remap omnicomplete
inoremap <C-j> <C-x><C-o>

inoremap <C-r> <C-r><C-p>

"use %% to get relative filepath of file to vim base directory
cnoremap <expr> %% getcmdtype() == ':' ? expand('%:h').'/' : '%%'

" changing size
if bufwinnr(1) 
  map + <C-W>+
  map - <C-W>-
  map <leader>. <C-W><
  map <leader>, <C-W>>
endif

noremap <leader>cf :call CreateFile(expand("<cfile>"))<CR>

map Q gq
" get current file
cnoreabbr <expr> %% fnameescape(expand('%:p'))
" new windows

"
""add type these after a search to instantly move text
""move to text
"cnoremap $t <CR>:t''<CR>  
""move text to 
"cnoremap $m <CR>:m''<CR>
""delete
"cnoremap $d <CR>:d<CR>``
"
"" makes count up and down motions actual lines if a number is given
"nnoremap <expr> k (v:count == 0 ? 'gk' : 'k')
"nnoremap <expr> j (v:count == 0 ? 'gj' : 'j')
"
""force visual motion     
"nnoremap dj dvj
"nnoremap dk dvk
"nnoremap 0 ^
"nnoremap ^ 0
""nnoremap $ g$
""nnoremap g$ $
""nnoremap 0 g0
""nnoremap g0 0
""nnoremap ^ g^
""nnoremap g^ ^
