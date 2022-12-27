" basic vimrc taken from https://dash9.dev/posts/nvim-1/
" ~/.config/nvim/init.vim
set nomodeline                  " security vulnerabiliy to enable
"set mouse=a			" enable mouse in all modes
"set suffixes=.bak,~,.swp,.o,.info,.aux,.log,.dvi,.bbl,.blg,.brf,.cb,.ind,.idx,.ilg,.inx,.out,.toc



" CTRL-U in insert mode deletes a lot.  Use CTRL-G u to first break undo,
" so that you can undo CTRL-U after inserting a line break.
" Revert with ":iunmap <C-U>".
inoremap <C-U> <C-G>u<C-U>

"lets you use escape in terminal mode
tnoremap <Esc> <C-\><C-n>


" Put these in an autocmd group, so that you can revert them with:
" ":augroup vimStartup | au! | augroup END"
"silent! augroup! vimStartup

if exists('#vimStartup')
	augroup! vimStartup
endif

augroup vimStartup
	autocmd!

	" When editing a file, always jump to the last known cursor position.
	" Don't do it when the position is invalid, when inside an event handler
	" (happens when dropping a file on gvim) and for a commit message (it's
	" likely a different one than last time).
	autocmd BufReadPost *
				\ if line("'\"") >= 1 && line("'\"") <= line("$") && &ft !~# 'commit'
				\ |   exe "normal! g`\""
				\ | endif

augroup END


" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
" Only define it when not defined already.
" Revert with: ":delcommand DiffOrig".
if !exists(":DiffOrig")
	command DiffOrig vert new | set bt=nofile | r ++edit # | 0d_ | diffthis
				\ | wincmd p | diffthis
endif

