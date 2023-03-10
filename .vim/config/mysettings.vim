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
set ruler
set noexpandtab
set nosmarttab
set nocindent
set nosmartindent
set showcmd
set wildmenu
set wildmode=longest:full,full
set clipboard=unnamedplus
set laststatus=2
set shortmess=IFw

"set cursorline
"set cursorcolumn
set list
set listchars=
set ignorecase
set smartcase
set listchars+=tab:\ \ ░
set mouse=ar
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

if has('win32')
  set guioptions-=t
endif
""
if &t_Co > 2 || has("gui_running")
"  " Revert with ":syntax off".
"
	syntax on

  " I like highlighting strings inside C comments.
  " Revert with ":unlet c_comment_strings".
  let c_comment_strings=1
endif

"
set timeout		" time out for key codes
set ttimeoutlen=50	" wait up to 100ms after Esc for special key

"other colorscheme commands
highlight Comment cterm=italic

"Actually setting  the colorscheme ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"colorscheme habamax

set termguicolors

set number
set undodir=~/.vim/undodir

if has("vms")
  set nobackup		" do not keep a backup file, use versions instead
else
  set backup		" keep a backup file (restore to previous version)
  if has('persistent_undo')
    set undofile	" keep an undo file (undo changes after closing)
  endif
endif

set hlsearch
set formatoptions-=cro


if has('langmap') && exists('+langremap')
  " Prevent that the langmap option applies to characters that result from a
  " mapping.  If set (default), this may break plugins (but it's backward
  " compatible).
  set nolangremap
endif
