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





augroup highlight_yank
	autocmd!
	au TextYankPost * silent! lua vim.highlight.on_yank({higroup="Visual", timeout=200})
augroup END

augroup numbertoggle
	autocmd!
	autocmd BufEnter,FocusGained,InsertLeave,CmdLineLeave * set relativenumber
	autocmd BufLeave,FocusLost,InsertEnter  * set norelativenumber
	autocmd CmdLineEnter * set norelativenumber | redraw
augroup END

augroup vim_help
	autocmd!
	autocmd FileType help setlocal conceallevel=0 "probably to show the stars and bars
	autocmd FileType help setlocal number
	autocmd FileType help hi link HelpBar Normal
	autocmd FileType help hi link HelpStar Normal
augroup END
