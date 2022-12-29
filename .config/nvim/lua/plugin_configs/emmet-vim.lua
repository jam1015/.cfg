vim.cmd([[
 nmap <leader>m,   <plug>(emmet-expand-abbr)
 nmap <leader>m;   <plug>(emmet-expand-word)
 nmap <leader>mu   <plug>(emmet-update-tag)
 nmap <leader>md   <plug>(emmet-balance-tag-inward)
 nmap <leader>mD   <plug>(emmet-balance-tag-outward)
 nmap <leader>mn   <plug>(emmet-move-next)
 nmap <leader>mN   <plug>(emmet-move-prev)
 nmap <leader>mi   <plug>(emmet-image-size)
 nmap <leader>m/   <plug>(emmet-toggle-comment)
 nmap <leader>mj   <plug>(emmet-split-join-tag)
 nmap <leader>mk   <plug>(emmet-remove-tag)
 nmap <leader>ma   <plug>(emmet-anchorize-url)
 nmap <leader>mA   <plug>(emmet-anchorize-summary)
 nmap <leader>mm   <plug>(emmet-merge-lines)
 nmap <leader>mc   <plug>(emmet-code-pretty)
 "let g:user_emmet_leader_key = '<M-y>'
 	]])
vim.g.user_emmet_leader_key = "<M-y>" --use this to expand emmet

