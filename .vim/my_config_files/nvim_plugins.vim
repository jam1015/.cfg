"----- firenvim config

" moving on -------------------
"call minpac#add('hkupty/iron.nvim',{'type': 'opt'})



"lightspeed


lua <<EOF

EOF


"trouble.nvim
call minpac#add("folke/trouble.nvim")
call minpac#add()
lua << EOF
EOF


call minpac#add("nvim-treesitter/nvim-treesitter", {'do': ':TSUpdate'})
source ~/.config/nvim/my_config_files/treesitterconfig.vim





"""""""""" Native LSP """""""""""""""""""""""""""""""""""""""
call minpac#add("neovim/nvim-lspconfig")
"source ~/.config/nvim/my_config_files/lspconfig.vim
