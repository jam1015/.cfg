function! CreateFile(tfilename)

	" complete filepath from the file where this is called
	let newfilepath=expand('%:p:h') .'/'. expand(a:tfilename)

	if filereadable(newfilepath)
	   echo "File already exists"
	   :norm gf
	else
		:execute "!touch ". expand(newfilepath)
		echom "File created: ". expand(newfilepath)
		:norm gf
	endif

endfunction
