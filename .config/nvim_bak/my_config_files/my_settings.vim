
"---------- setting other settings -----------
" convert to lua with local set = vim.opt, and then replace spaces with
" period
"to let vim have correct colors in tmux

"other colorscheme commands
highlight Comment cterm=italic

"Actually setting  the colorscheme ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

set termguicolors


if empty($DISPLAY)
  colorscheme elflord
else
  "set bg=dark
  colorscheme tokyonight-night

"colorscheme gruvbox
endif
set completeopt=menu,menuone,noselect
set hlsearch
set undofile "persistent undo
set undodir=~/.config/nvim/undodir "the folder where the undo history is kept rather than the local directory for the file
set gdefault
set nrformats-=octal
set formatoptions-=cro
set history=2000
set scrolloff=3                 " show a few lines around cursor
set display=lastline
set shiftwidth=4 "how much indentation from >
set softtabstop=4 "lets us delete by tabs when expandtab is on
set tabstop=4
set noexpandtab
set nosmarttab
set nocindent
set nosmartindent
set wildmenu
set wildmode=longest:full,full
set wildignorecase
set wildignore=*.git/*,*.tags,tags,*.o,*.class,*.ccls-cache
set ignorecase
set smartcase
set list
set listchars=
set listchars+=trail:␣
set listchars+=lead:·
set listchars+=extends:»
set listchars+=precedes:«
set listchars+=tab:\ \ \ 
set listchars+=nbsp:⣿

let g:netrw_liststyle= 3

" highlight yanked text for 200ms using the Visual highlight group
augroup highlight_yank
autocmd!
au TextYankPost * silent! lua vim.highlight.on_yank({higroup="Visual", timeout=200})
augroup END


augroup vim_help
	autocmd!
"	autocmd FileType help setlocal conceallevel=0 "probably to show the stars and bars
"	autocmd FileType help setlocal number
	autocmd FileType help hi link HelpBar Normal
	autocmd FileType help hi link HelpStar Normal
augroup END

