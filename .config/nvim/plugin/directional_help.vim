"determine where help appears
"not sure what <args means here>
command -nargs=* -complete=help Lelp vertical topleft help <args>
command -nargs=* -complete=help Relp vertical belowright help <args>
command -nargs=* -complete=help Telp  topleft help <args>
command -nargs=* -complete=help Belp  belowright help <args>
command -nargs=* -complete=help Olp  help <args> | only

"have to ask why cnoremap makes typing in command lines slow

cnoreabbrev <expr> lelp  getcmdtype() == ":" && getcmdline() == "lelp" ? "Lelp" : "lelp"
cnoreabbrev <expr> relp  getcmdtype() == ":" && getcmdline() == "relp" ? "Relp" : "relp"
cnoreabbrev <expr> telp  getcmdtype() == ":" && getcmdline() == "telp" ? "Telp" : "telp"
cnoreabbrev <expr> belp  getcmdtype() == ":" && getcmdline() == "belp" ? "Belp" : "belp"

cnoreabbrev <expr> olp  getcmdtype() == ":" && getcmdline() == "olp" ? "Olp" : "olp"


	command -bar -nargs=? -complete=help HCW execute s:HCW(<q-args>) | bdelete help.txt
	let s:did_open_help = v:false

	function s:HCW(subject) abort
	  let mods = 'silent noautocmd keepalt'
	  if !s:did_open_help
	    execute mods .. ' help'
	    execute mods .. ' helpclose'
	    let s:did_open_help = v:true
	  endif
	  if !empty(getcompletion(a:subject, 'help'))
	    execute mods .. ' edit ' .. &helpfile
	    set buftype=help
	  endif
	  return 'keepjumps help ' .. a:subject
	endfunction

cnoreabbrev <expr> hh  getcmdtype() == ":" && getcmdline() == "hh" ? "HCW" : "hh"
