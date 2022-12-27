local api = vim.api

-- Highlight on yank
local yankGrp = api.nvim_create_augroup("yank_highlight", { clear = true })
api.nvim_create_autocmd("TextYankPost", {
  command = "silent! lua vim.highlight.on_yank({higroup = \"Visual\", timeout = 200})",
  group = yankGrp,
})


