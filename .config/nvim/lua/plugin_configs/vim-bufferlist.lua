local opts = { noremap = true, silent = true }
--
----local term_opts = { silent = true }
--
---- Shorten function name
local keymap = vim.api.nvim_set_keymap
--
keymap("n", "<leader>bl", ":call BufferList()<CR>", opts)
