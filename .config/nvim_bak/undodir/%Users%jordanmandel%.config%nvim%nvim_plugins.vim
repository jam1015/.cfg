Vim�UnDo� ���>�r�W(� �(TS��0�eo�J�a����   9   			source lspconfig.vim   9   
                       a�A	    _�                             ����                                                                                                                                                                                                                                                                                                                                                             a��)     �                   �               5��                                                5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��@     �               �               5��                                         �      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��A     �                  5��                                                  5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��B    �                  5��                                                  5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             a��]     �               �               5��                          �                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��`     �               �               5��                          �                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a��b    �               �               5��                          �              a       5�_�      	                      ����                                                                                                                                                                                                                                                                                                                                                             a���     �                 		�               5��                          �                     �                          �                     �                          �                     �                          �                     �                          �                     �                          �                     �                          �                     �                         �                    �                         �                    �                          �                     5�_�      
           	           ����                                                                                                                                                                                                                                                                                                                                                             a���    �               �               5��                          �              �       5�_�   	              
           ����                                                                                                                                                                                                                                                                                                                                                             a��-     �                 		�               5��                          �                     �                          �                     �                         �                     �                          �                     �                         �                     �                         �                     �                        �                    �                         �                     5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                                             a��2    �               �               5��                          �              �      5�_�                    ,       ����                                                                                                                                                                                                                                                                                                                                                             a� ;     �   ,            �   ,            5��    ,                      �              �       5�_�                    /       ����                                                                                                                                                                                                                                                                                                                                                             a�     �   .   /          +			call minpac#add("neovim/nvim-lspconfig")5��    .                      �      ,               5�_�                    1       ����                                                                                                                                                                                                                                                                                                                                                             a�    �   1            �   1            5��    1                      P              ,       5�_�                    2       ����                                                                                                                                                                                                                                                                                                                                                             a�6    �   2              			�   2            5��    2                      |                     �    2                                          5�_�                   .       ����                                                                                                                                                                                                                                                                                                                                                             a��     �   .   4   3    �   .   /   3    5��    .                      �              �       5�_�                    6        ����                                                                                                                                                                                                                                                                                                                                                             a��   	 �   6   8   9      			�   6   8   8    5��    6                      �                     �    6                     �                     �    6                    	                    5�_�                    7   
    ����                                                                                                                                                                                                                                                                                                                                                             a�@�     �   6   8   9      			source treesitterconfig.vim5��    6   
                  	                     5�_�                     9   
    ����                                                                                                                                                                                                                                                                                                                                                             a�A    �   8              			source lspconfig.vim5��    8   
                  `	                     5�_�                    .       ����                                                                                                                                                                                                                                                                                                                                                             a��     �   .   /   3    �   .   /   3   H   	lua << EOF   !require'lspconfig'.clangd.setup{}   Urequire'lspconfig'.sqlls.setup{cmd = {"sql-language-server","up","--method","stdio"}}   "require'lspconfig'.pyright.setup{}   ,require'lspconfig'.r_language_server.setup{}   !require'lspconfig'.texlab.setup{}   7-- will switch to better markdown tool like neuron.nvim   grequire'lspconfig'.zeta_note.setup{cmd = {'/Users/jordanmandel/.config/nvim/manual_lsp/zeta-note-macos'   }}       @local capabilities = vim.lsp.protocol.make_client_capabilities()   Icapabilities.textDocument.completion.completionItem.snippetSupport = true   require'lspconfig'.html.setup {   	  capabilities = capabilities,   	  }   EOF   2"actually setting up LSP; script taken from github   
lua << EOF   %local nvim_lsp = require('lspconfig')       ;-- Use an on_attach function to only map the following keys   ;-- after the language server attaches to the current buffer   )local on_attach = function(client, bufnr)   P  local function buf_set_keymap(...) vim.api.nvim_buf_set_keymap(bufnr, ...) end   P  local function buf_set_option(...) vim.api.nvim_buf_set_option(bufnr, ...) end       -  --Enable completion triggered by <c-x><c-o>   6  buf_set_option('omnifunc', 'v:lua.vim.lsp.omnifunc')         -- Mappings.   ,  local opts = { noremap=true, silent=true }       J  -- See `:help vim.lsp.*` for documentation on any of the below functions   K  buf_set_keymap('n', 'gD', '<Cmd>lua vim.lsp.buf.declaration()<CR>', opts)   J  buf_set_keymap('n', 'gd', '<Cmd>lua vim.lsp.buf.definition()<CR>', opts)   D  buf_set_keymap('n', 'K', '<Cmd>lua vim.lsp.buf.hover()<CR>', opts)   N  buf_set_keymap('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', opts)   Q  buf_set_keymap('n', '<C-k>', '<cmd>lua vim.lsp.buf.signature_help()<CR>', opts)   [  buf_set_keymap('n', '<space>wa', '<cmd>lua vim.lsp.buf.add_workspace_folder()<CR>', opts)   ^  buf_set_keymap('n', '<space>wr', '<cmd>lua vim.lsp.buf.remove_workspace_folder()<CR>', opts)   q  buf_set_keymap('n', '<space>wl', '<cmd>lua print(vim.inspect(vim.lsp.buf.list_workspace_folders()))<CR>', opts)   U  buf_set_keymap('n', '<space>D', '<cmd>lua vim.lsp.buf.type_definition()<CR>', opts)   M  buf_set_keymap('n', '<space>rn', '<cmd>lua vim.lsp.buf.rename()<CR>', opts)   R  buf_set_keymap('n', '<space>ca', '<cmd>lua vim.lsp.buf.code_action()<CR>', opts)   J  buf_set_keymap('n', 'gr', '<cmd>lua vim.lsp.buf.references()<CR>', opts)     -- shows the error   c  buf_set_keymap('n', '<leader>e', '<cmd>lua vim.lsp.diagnostic.show_line_diagnostics()<CR>', opts)   P  buf_set_keymap('n', '[d', '<cmd>lua vim.lsp.diagnostic.goto_prev()<CR>', opts)   P  buf_set_keymap('n', ']d', '<cmd>lua vim.lsp.diagnostic.goto_next()<CR>', opts)   X  buf_set_keymap('n', '<space>q', '<cmd>lua vim.lsp.diagnostic.set_loclist()<CR>', opts)   R  buf_set_keymap("n", "<leader>gf", "<cmd>lua vim.lsp.buf.formatting()<CR>", opts)       end       B-- Use a loop to conveniently call 'setup' on multiple servers and   A-- map buffer local keybindings when the language server attaches   Clocal servers = {"clangd","r_language_server","texlab","zeta_note"}    for _, lsp in ipairs(servers) do     nvim_lsp[lsp].setup {       on_attach = on_attach,       flags = {   "      debounce_text_changes = 150,       }     }       Cvim.lsp.handlers["textDocument/publishDiagnostics"] = vim.lsp.with(   0    vim.lsp.diagnostic.on_publish_diagnostics, {   %        virtual_text = {spacing = 0,}       }   )   end   EOF5��    .               H       �              �      5��