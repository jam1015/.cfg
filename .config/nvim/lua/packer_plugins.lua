-- This file can be loaded by calling `lua require('plugins')` from your init.vim
local ensure_packer = function()
	local fn = vim.fn
	local install_path = fn.stdpath('data') .. '/site/pack/packer/start/packer.nvim'
	if fn.empty(fn.glob(install_path)) > 0 then
		fn.system({ 'git', 'clone', '--depth', '1', 'https://github.com/wbthomason/packer.nvim', install_path })
		vim.cmd [[packadd packer.nvim]]
		return true
	end
	return false
end

local packer_bootstrap = ensure_packer()

-- Only required if you have packer configured as `opt`
-- vim.cmd [[packadd packer.nvim]]


local packerRecompile = vim.api.nvim_create_augroup("packer_recompile", { clear = true })
vim.api.nvim_create_autocmd("BufWritePost", {
	pattern = "packer_plugins.lua",
	command = "source <afile> | PackerSync",
	group = packerRecompile,
})

local status_ok, packer = pcall(require, "packer")
if not status_ok then
	vim.notify("packer failed to load")
	return
end

packer.init({ ensure_dependencies = true })

-- Install your plugins here
return packer.startup(function(use)

	use("wbthomason/packer.nvim")
	use { "mzlogin/vim-markdown-toc" }
	use 'dstein64/vim-startuptime'
	use 'lewis6991/impatient.nvim'
	use("nvim-lua/plenary.nvim")
	use("nvim-lua/popup.nvim")
	use("andymass/vim-matchup")
	use("farmergreg/vim-lastplace")
	use { "airblade/vim-rooter", config = function()
		vim.cmd([[let g:rooter_manual_only = 1
 nnoremap <leader>fr:  :edit <c-r>=FindRootDirectory()<CR>/**/*
 ]])
	end }

use {
	"windwp/nvim-autopairs",
    config = function() require("plugin_configs.nvim-autopairs") end
}
--TODO: add autopairs, jjj

	use({
		"sitiom/nvim-numbertoggle",
		opt = true,
		event = { "CursorMoved *", "CmdLineEnter *", "InsertEnter *" },
		setup = function()
			vim.cmd([[
  	set number
  	set relativenumber
  	]])
		end,
	})


	--use { "vim-scripts/ScrollColors" } --
	use { "aktersnurra/no-clown-fiesta.nvim" }
	use({
		"folke/tokyonight.nvim",
		branch = "main",
		config = function()
			require("plugin_configs.tokyonight")
		end,
	})

	use({
		"ellisonleao/gruvbox.nvim",
		config = function()
			-- vim.o.background = "dark"
		end,
	})
	use "overcache/NeoSolarized"
	use { "catppuccin/nvim", as = "catppuccin", config = function() require("plugin_configs.catpuccin") end }
	-- plugins
	use("tpope/vim-unimpaired")

	use({
		"lervag/vimtex",
		setup = function()
			vim.cmd([[
  let g:vimtex_view_method = 'zathura'
  let g:vimtex_view_general_viewer = 'zathura'
  let g:vimtex_view_enabled=1
  let g:vimtex_complete_enabled=0
 	]])
		end,
	})


	use("kana/vim-textobj-entire")
	use("kana/vim-textobj-user")
	-- 	use("fladson/vim-kitty")
	--
	--
	--
	use({
		"kylechui/nvim-surround",
		tag = "*", -- Use for stability; omit to use `main` branch for the latest features
		config = function()
			require("plugin_configs.nvim-surround")
		end,
	})


	use({
		"folke/which-key.nvim",
		config = function()
			require("which-key").setup({
				-- your configuration comes here
				-- or leave it empty to use the default settings
				-- refer to the configuration section below
			})
		end,
	})

	use("bronson/vim-visual-star-search")
	use("tpope/vim-repeat")
	use("qpkorr/vim-bufkill")
	use("kevinoid/vim-jsonc")
	use({
		"jpalardy/vim-slime",
		config = function()
			require("plugin_configs.vim-slime")
		end,
	})


	use({
		"mattn/emmet-vim",
		opt = true,

		config = function()
			require("plugin_configs.emmet-vim")
		end,
		ft = { "js", "ts", "html", "htm", "tsx", "jsx" },
	})

	use("lukas-reineke/indent-blankline.nvim")

	use({ -- run 'call firenvim#install(0)' to perhaps fix issues when it is not running in browser
		"glacambre/firenvim",
		run = function()
			vim.fn["firenvim#install"](0)
		end,
		setup = function()
			require("plugin_configs.firenvim")
		end,
	})

	use({
		"jalvesaq/Nvim-R",
		branch = "stable",
		config = function()
			vim.cmd([[
  let R_external_term = 'alacritty -e' 
   ]])
		end,
	})

	use("ibhagwan/fzf-lua")

	use({
		"nvim-telescope/telescope.nvim",
		requires = {
			{ "nvim-telescope/telescope-file-browser.nvim" },
			{ "nvim-lua/plenary.nvim" },
			{ "nvim-telescope/telescope-fzf-native.nvim", run = "make" },
		},
		config = function()
			require("plugin_configs.telescope")
		end,
	})
	--
	--
	--#region
	--#region
	--#region
	--
	use({
		"phaazon/hop.nvim",
		disable = true,
		config = function()
			vim.cmd([[
   lua require'hop'.user()
   nnoremap  <leader>ww :HopWord<CR>
   	]])
		end,
	})

	use({
		"ggandor/leap.nvim",
		config = function()
			require("leap").add_default_mappings()

		end,
	})

	use({
		"nvim-treesitter/nvim-treesitter",
	requires = {"p00f/nvim-ts-rainbow", enable = false},
		--event = { "BufReadPre", "BufNewfile" },
		run = "TSUpdate",
		config = vim.schedule(function()
			require("plugin_configs.nvim-treesitter")
		end),
	})

	use({
		"folke/trouble.nvim",
		requires = { "kyazdani42/nvim-web-devicons" },
		event = "VimEnter",
		config = function()
			require("plugin_configs.trouble")
		end,
	})

	use({ 'MunifTanjim/prettier.nvim', disable = true, config = function()
		require("plugin_configs.prettier")
	end })

	use({
		"jose-elias-alvarez/null-ls.nvim",
		event = "VimEnter",
		config = function()
			require("plugin_configs.lsp/null-ls")
		end,
	})

	use({ 'neovim/nvim-lspconfig',
		requires = { "onsails/lspkind.nvim",
			"williamboman/mason.nvim",

			"williamboman/mason-lspconfig.nvim",
		},
		event = { "InsertEnter", "BufReadPre", "BufNewFile", "BufRead" },


		config = function()

			require("plugin_configs.lsp")
		end
	})


	use({
		"hrsh7th/nvim-cmp",
		disable = false,
		event = { 'InsertEnter', 'CmdLineEnter' },
		requires = {
			{ "onsails/lspkind.nvim", },
			{ "hrsh7th/cmp-nvim-lsp" },
			{ "hrsh7th/cmp-nvim-lua" },
			{ "hrsh7th/cmp-buffer" },
			{ "hrsh7th/cmp-path" },
			{ "hrsh7th/cmp-cmdline" },
			{
				"L3MON4D3/LuaSnip", -- tag = "v<CurrentMajor>.*",
				requires = { "rafamadriz/friendly-snippets" },
				config = function()
					require("plugin_configs.LuaSnip")
				end, --after = "nvim-cmp"

			},
			{ "saadparwaiz1/cmp_luasnip" }
		},
		config = function()
			require("plugin_configs.nvim-cmp")
		end,
	})


	use({
		"neoclide/coc.nvim",
		branch = "release",
		disable = true,
		requires = { "neoclide/coc-snippets" },
		setup = function()
			require("plugin_configs.coc")
		end,
	})

	use { "lifecrisis/vim-difforig" }
	use {"numToStr/Comment.nvim", config = function() require("plugin_configs.Comment") end}
	use "JoosepAlviste/nvim-ts-context-commentstring"

	--	-- Automatically set up your configuration after cloning packer.nvim
	--	-- Put this at the end after all plugins
	if packer_bootstrap then
		require("packer").sync()
	end
end)
