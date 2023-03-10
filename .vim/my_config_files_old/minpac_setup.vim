	command! PackUpdate source $MYVIMRC  | call minpac#update() 
	command! PackClean  source $MYVIMRC  | call minpac#clean() 
	command! PackStatus packadd minpac | call minpac#status()

	" used by the next two functions
	function! PackList(...)
		call PackInit()
		return join(sort(keys(minpac#getpluglist())), "\n")
	endfunction

	"opens browser at install directory of package
	command! -nargs=1 -complete=custom,PackList
				\ PackOpenDir call PackInit() | call term_start(&shell,
				\    {'cwd': minpac#getpluginfo(<q-args>).dir,
				\     'term_finish': 'close'})
	"opens URL of installed package
	command! -nargs=1 -complete=custom,PackList
				\ PackOpenUrl call PackInit() | call openbrowser#open(
				\    minpac#getpluginfo(<q-args>).url)
