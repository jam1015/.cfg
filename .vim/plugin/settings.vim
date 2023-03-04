syntax on
set incsearch
set history=2000		" keep 200 lines of command line history
set nomodeline                  " security vulnerabiliy to enable
set gdefault
set nrformats-=octal
set autoindent
set scrolloff=3                 " show a few lines around cursor
set display=truncate
set shiftwidth=4 "how much indentation from >
set softtabstop=4 "lets us delete by tabs when expandtab is on
set tabstop=4
let g:python_recommended_style=0
set hidden
set noexpandtab
set nosmarttab
set nocindent
set nosmartindent
set wildmenu
set wildmode=full
"set cursorline
"set cursorcolumn
set list
set listchars=
set ignorecase
set smartcase
set listchars+=tab:··░

set listchars+=lead:·

set listchars+=trail:␣
set listchars+=extends:»
set listchars+=precedes:«
set listchars+=nbsp:⣿
let g:netrw_liststyle= 3

" some things for zathura+synctex
let g:vimtex_view_method = 'zathura'
let g:latex_view_general_viewer = 'zathura'
let g:vimtex_compiler_progname = 'nvr'
let g:vimtex_view_enabled=1

filetype plugin indent on

set undodir=~/.vim/undodir
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



"other colorscheme commands
highlight Comment cterm=italic

"Actually setting  the colorscheme ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
colorscheme habamax

set termguicolors

set number
set undofile "persistent undo

set hlsearch
