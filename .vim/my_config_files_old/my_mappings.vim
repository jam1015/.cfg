"---custom keybindings go here--------
nnoremap <Space> <Nop>
let mapleader="\\"
let maplocalleader=" "

"add type these after a search to instantly move text
"move to text
"cnoremap $t <CR>:t''<CR>  
"move text to 
"cnoremap $m <CR>:m''<CR>
"delete
"cnoremap $d <CR>:d<CR>``

" makes count up and down motions actual lines if a number is given
"nnoremap <expr> k (v:count == 0 ? 'gk' : 'k')
"nnoremap <expr> j (v:count == 0 ? 'gj' : 'j')

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

inoremap <C-r> <C-r><C-p>

augroup vim_help
	autocmd!
	autocmd FileType help setlocal conceallevel=0 "probably to show the stars and bars
	autocmd FileType help setlocal number
	autocmd FileType help hi link HelpBar Normal
	autocmd FileType help hi link HelpStar Normal
augroup END

"determine where help appears
"not sure what <args means here>
command -nargs=* -complete=help Lelp vertical topleft help <args>
command -nargs=* -complete=help Relp vertical belowright help <args>
command -nargs=* -complete=help Telp  topleft help <args>
command -nargs=* -complete=help Belp  belowright help <args>

"have to ask why cnoremap makes typing in command lines slow

cnoreabbrev <expr> lelp  getcmdtype() == ":" && getcmdline() == "lelp" ? "Lelp" : "lelp"
cnoreabbrev <expr> relp  getcmdtype() == ":" && getcmdline() == "relp" ? "Relp" : "relp"
cnoreabbrev <expr> telp  getcmdtype() == ":" && getcmdline() == "telp" ? "Telp" : "telp"
cnoreabbrev <expr> belp  getcmdtype() == ":" && getcmdline() == "belp" ? "Belp" : "belp"

"use %% to get relative filepath of file to vim base directory
cnoremap <expr> %% getcmdtype() == ':' ? expand('%:h').'/' : '%%'



function! Synctex()
    let vimura_param = " --synctex-forward " . line('.') . ":" . col('.') . ":" . expand('%:p') . " " . substitute(expand('%:p'),"tex$","pdf", "")
    if has('nvim')
        call jobstart("vimura neovim" . vimura_param)
    else
        exe "silent !vimura vim" . vimura_param . "&"
    endif
    redraw!
endfunction

map <leader>st :call Synctex()<cr>
