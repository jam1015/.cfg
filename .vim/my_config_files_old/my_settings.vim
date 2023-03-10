
"---------- setting other settings -----------
"
"to let vim have correct colors in tmux

"other colorscheme commands
highlight Comment cterm=italic

"Actually setting  the colorscheme ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

set termguicolors
colorscheme tokyonight

set hlsearch
"toggles relnum vs absnum
augroup numbertoggle
autocmd!
autocmd BufEnter,FocusGained,InsertLeave,CmdLineLeave * set relativenumber
autocmd BufLeave,FocusLost,InsertEnter  * set norelativenumber
autocmd CmdLineEnter * set norelativenumber | redraw
augroup END
" Don't use Ex mode, use Q for formatting.
" Revert with ":unmap Q".
map Q gq
set number
set undofile "persistent undo
if has('nvim')
set undodir=~/.config/nvim/undodir "the folder where the undo history is kept rather than the local directory for the file
else
set undodir=~/.vim/undodir
endif
set gdefault
set nrformats-=octal
set autoindent
set scrolloff=3                 " show a few lines around cursor
set display=truncate
"set smartindent
set shiftwidth=4 "how much indentation from >
set softtabstop=4 "lets us delete by tabs when expandtab is on
set tabstop=4
let g:python_recommended_style=0
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
if has('nvim')
set listchars+=lead:·
		lua <<EOF
-- highlight yanked text for 200ms using the "Visual" highlight group
vim.cmd[[
augroup highlight_yank
autocmd!
au TextYankPost * silent! lua vim.highlight.on_yank({higroup="Visual", timeout=200})
augroup END
]]
EOF
endif
set listchars+=trail:␣
set listchars+=extends:»
set listchars+=precedes:«
set listchars+=nbsp:⣿
let g:netrw_liststyle= 3



"set spell spelllang=en_us
"hi clear SpellBad
"hi clear SpellLocal
"jset listchars+=space:·
" onoremap K -J
" always split windows vertically; need to learn vimscript to understand
"set splitright
"set splitbelow



"if exists('#vim_help') "formatting for vim help; show bars/asterisks
"	augroup! vim_help
"endif

"turns and helpbars and help stars
filetype plugin indent on
