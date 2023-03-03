local set = vim.opt

vim.cmd([[ highlight Comment cterm=italic gui=italic]])

set.bg = "dark"
local colorscheme = "tokyonight"
if not os.getenv("DISPLAY") then
	vim.cmd([[colorscheme elflord]])
else
	local status_ok = nil
	status_ok, _ = pcall(vim.cmd, "colorscheme " .. colorscheme)

	if not status_ok then
		vim.cmd([[colorscheme blue]])
	end
end
-- add complete/completeopt
set.modeline = false
set.completeopt = 'menu,menuone,noselect'
set.shortmess = "IFw"
set.hlsearch = true
set.undofile = true --persistent undo
set.gdefault = true
set.nrformats = set.nrformats - 'octal'
set.formatoptions = set.formatoptions - 'cro'
local noCRO = vim.api.nvim_create_augroup("no_cro", { clear = true }) --disables automatic comments
vim.api.nvim_create_autocmd("FileType", {
	pattern = "*",
	command = "setlocal formatoptions-=c formatoptions-=r formatoptions-=o",
	group = noCRO,
})
set.history = 2000
set.autoread = true
set.scrolloff = 3 -- show a few lines around cursor
set.display = "lastline"
set.shiftwidth = 4 --how much indentation from >
set.softtabstop = 4 --lets us delete by tabs when expandtab is on
set.tabstop = 4
--set.path = set.path + "**"
set.expandtab = false
set.smarttab = false
set.cindent = false
set.smartindent = false
set.wildmenu = true
set.wildmode = 'longest:full,full'
set.wildignorecase = true
set.wildignore = '*.git/*,*.tags,tags,*.o,*.class,*.ccls-cache'
set.ignorecase = true
set.smartcase = true
set.splitbelow = true
set.splitright = true
set.list = true
set.listchars = ''
set.listchars = set.listchars + 'trail:␣'
set.listchars = set.listchars + 'lead:·'
set.listchars = set.listchars + 'extends:»'
set.listchars = set.listchars + 'precedes:«'
set.listchars = set.listchars + 'tab:   '
set.listchars = set.listchars + 'nbsp:⣿'
set.clipboard = 'unnamedplus'
vim.g.netrw_liststyle = 3
vim.g.netrw_banner = 0
vim.g.netrw_liststyle = 3
vim.g.c_comment_strings = 1 --can be any value
set.pumheight = 10
set.shada = "'1000,%"
