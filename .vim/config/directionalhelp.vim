command -nargs=* -complete=help Lelp vertical topleft help <args>
command -nargs=* -complete=help Relp vertical belowright help <args>
command -nargs=* -complete=help Telp  topleft help <args>
command -nargs=* -complete=help Belp  belowright help <args>

"have to ask why cnoremap makes typing in command lines slow

cnoreabbrev <expr> lelp  getcmdtype() == ":" && getcmdline() == "lelp" ? "Lelp" : "lelp"
cnoreabbrev <expr> relp  getcmdtype() == ":" && getcmdline() == "relp" ? "Relp" : "relp"
cnoreabbrev <expr> telp  getcmdtype() == ":" && getcmdline() == "telp" ? "Telp" : "telp"
cnoreabbrev <expr> belp  getcmdtype() == ":" && getcmdline() == "belp" ? "Belp" : "belp"

"use %% to get relative filepath of file to vim base directory
cnoremap <expr> %% getcmdtype() == ':' ? expand('%:h').'/' : '%%'
