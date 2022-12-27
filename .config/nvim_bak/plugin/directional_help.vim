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
