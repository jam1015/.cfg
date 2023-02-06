local keymap = vim.keymap.set
keymap("n", "gz", "<Plug>SlimeMotionSend", { noremap = false, silent = true })
keymap("n", "gzz", "<Plug>SlimeLineSend", { noremap = false, silent = true })
keymap("x", "gz", "<Plug>SlimeRegionSend", { noremap = false, silent = true })
