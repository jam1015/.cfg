function! s:configureKeymaps(plugin_in) abort
	if a:plugin_in == "vim-unimpaired"
		function! s:ArgNext(...)
			try
				let l:files = ""
				for file in a:000
					let l:files .= file .. " "
				endfor
				execute "next" l:files
				args
			catch /^Vim\%((\a\+)\)\=:E163:/
				first
				args
			catch /^Vim\%((\a\+)\)\=:E165:/
				first
				args
			finally
			endtry
		endfunction

		function! s:ArgPrev(...)
			try
				previous
				args
			catch /^Vim\%((\a\+)\)\=:E163:/
				last
				args
			catch /^Vim\%((\a\+)\)\=:E164:/
				last
				args
			finally
			endtry
		endfunction

		command -nargs=* Anext call <SID>ArgNext(<f-args>)
		command Aprev call <SID>ArgPrev(<f-args>)


		nnoremap ]a <Cmd>Anext<cr>
		nnoremap [a <Cmd>Aprev<cr>


		cnoreabbrev <expr> next  getcmdtype() == ":" && getcmdline() == "next" ? "Anext" : "next"
		cnoreabbrev <expr> n  getcmdtype() == ":" && getcmdline() == "n" ? "Anext" : "n"
		cnoreabbrev <expr> prev  getcmdtype() == ":" && getcmdline() == "prev" ? "Aprev" : "prev"
		cnoreabbrev <expr> previous  getcmdtype() == ":" && getcmdline() == "prevous" ? "Aprev" : "previous"
	elseif a:plugin_in == "blue"
		colorscheme blue
	else
		echo "plugin " .. a:plugin_in .. " not found"
	endif
endfunction

command -bar -nargs=1 ConfigureKeymaps call s:configureKeymaps(<q-args>)
