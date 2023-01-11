-- DO NOT change the paths and don't remove the colorscheme
local root = vim.fn.fnamemodify("./.repro", ":p")

-- set stdpaths to use .repro
for _, name in ipairs({ "config", "data", "state", "cache" }) do
	vim.env[("XDG_%s_HOME"):format(name:upper())] = root .. "/" .. name
end

-- bootstrap lazy
local lazypath = root .. "/plugins/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
	vim.fn.system({
		"git",
		"clone",
		"--filter=blob:none",
		"--single-branch",
		"https://github.com/folke/lazy.nvim.git",
		lazypath,
	})
end
vim.opt.runtimepath:prepend(lazypath)

-- install plugins
local plugins = {
	"folke/tokyonight.nvim",
	-- add any other plugins here
	{"nvim-treesitter/nvim-treesitter",
	config = function()
		require 'nvim-treesitter.configs'.setup({ensure_installed = {"lua","c","python"}}) 
	end

}
, 
"andymass/vim-matchup",
"ellisonleao/gruvbox.nvim"
	}	

	require("lazy").setup(plugins, {
		root = root .. "/plugins",
	})

	vim.cmd.colorscheme("tokyonight")
	-- add anything else here

