return {

	'dstein64/vim-startuptime',
	("nvim-lua/plenary.nvim"),
	("nvim-lua/popup.nvim"),
	("andymass/vim-matchup"),
	("farmergreg/vim-lastplace"),

	{ "airblade/vim-rooter", config = function()
		vim.cmd([[let g:rooter_manual_only = 1
 nnoremap <leader>f:  :edit <c-r>=FindRootDirectory()<CR>/**/*
 ]])
	end },

	({
		"sitiom/nvim-numbertoggle",
		lazy = true,
		event = { "CursorMoved *", "CmdLineEnter *", "InsertEnter *" },
		config = function()
			require("numbertoggle").setup()
		end,
		init = function()
			vim.cmd([[
  	set number
  	set relativenumber
  	]])
		end,
	}),


	{ "vim-scripts/ScrollColors" }, --
	({
		"folke/tokyonight.nvim",
		branch = "main",
		config = function()

			require("plugin_configs.tokyonight")
		end,
	}),
	-- 	--
	({
		"ellisonleao/gruvbox.nvim",
		config = function()
			-- vim.o.background = "dark"
		end,
	}),
	"overcache/NeoSolarized",
	{ "catppuccin/nvim", as = "catppuccin", config = function() require("plugin_configs.catpuccin") end },
	-- plugins
	("tpope/vim-unimpaired"),

	({
		"lervag/vimtex",

		init = function()
			vim.cmd([[
     
  let g:vimtex_view_method = 'zathura'
  let g:vimtex_view_general_viewer = 'zathura'
  let g:vimtex_view_enabled=1
  let g:vimtex_complete_enabled=0
    	]])
		end,
	}),

	{
		"kana/vim-textobj-,
		dependencies = "kana/vim-textobj-entire",
	},
	-- 	("fladson/vim-kitty"),
	--
	--
	--
	({
		"kylechui/nvim-surround",
		config = function()
			require("plugin_configs.nvim-surround")
		end,
	}),


	({
		"folke/which-key.nvim",
		config = function()
			require("which-key").setup({
				-- your configuration comes here
				-- or leave it empty to  the default settings
				-- refer to the configuration section below
			})
		end,
	}),

	("bronson/vim-visual-star-search"),
	("tpope/vim-repeat"),
	("qpkorr/vim-bufkill"),
	("kevinoid/vim-jsonc"),
	({
		"jpalardy/vim-slime",
		config = function()
			require("plugin_configs.vim-slime")
		end,
	}),


	({
		"mattn/emmet-vim",
		lazy = true,

		config = function()
			require("plugin_configs.emmet-vim")
		end,
		ft = { "js", "ts", "html", "htm", "tsx", "jsx" },
	}),

	("lukas-reineke/indent-blankline.nvim"),

	({ -- run 'call firenvim#install(0)' to perhaps fix issues when it is not running in browser
		"glacambre/firenvim",
		build = function()
			vim.fn["firenvim#install"](0)
		end,
		init = function()
			require("plugin_configs.firenvim")
		end,
	}),

	({
		"jalvesaq/Nvim-R",
		branch = "stable",
		config = function()
			vim.cmd([[
  let R_external_term = 'alacritty -e' 
   ]])
		end,
	}),

	("ibhagwan/fzf-lua"),

	({
		"nvim-telescope/telescope.nvim",
		dependencies = { "nvim-lua/plenary.nvim",
--			{ "nvim-telescope/telescope-fzf-native.nvim",
--				build = 'cmake -S. -Bbuild -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release && cmake --install build --prefix build' },
			{
				"nvim-telescope/telescope-arecibo.nvim",
				--rocks = {"openssl", "lua-http-parser"}
			},
			"nvim-telescope/telescope-file-browser.nvim" },
		config = function()
			require("plugin_configs.telescope")
		end
	}),

	({
		"phaazon/hop.nvim",
		disable = true,
		config = function()
			--require'hop'.)
			vim.cmd([[
   nnoremap  <leader>ww :HopWord<CR>
   	]])
		end,
	}),

	({
		"ggandor/leap.nvim",
		config = function()
			require("leap").add_default_mappings()

		end,
	}),

	({
		"nvim-treesitter/nvim-treesitter",
		build = "TSUpdate",
		config = vim.schedule(function()
			require("plugin_configs.nvim-treesitter")
		end),
	}),

	({
		"folke/trouble.nvim",
		dependencies = { "kyazdani42/nvim-web-devicons" },
		event = "VimEnter",
		config = function()
			require("plugin_configs.trouble")
		end,
	}),

	--	({ 'MunifTanjim/prettier.nvim', disable = true, config = function()
	--		require("plugin_configs.prettier")
	--	end }),

	--	({
	--		"jose-elias-alvarez/null-ls.nvim",
	--		event = "VimEnter",
	--		config = function()
	--			require("plugin_configs.lsp/null-ls")
	--		end,
	--	}),



	{ "williamboman/mason.nvim",
	},

	{ "williamboman/mason-lspconfig.nvim",
	},


	{ "neovim/nvim-lspconfig",
		--						event = {"InsertEnter"}
		--
		event = { "BufReadPre", "BufNewFile", "BufRead" },

		dependencies = { "onsails/lspkind.nvim", }, -- "RRethy/vim-illuminate" },
		config = function()

			require("plugin_configs.lsp")
		end },
	--"mfussenegger/nvim-dap",

	({
		"hrsh7th/nvim-cmp",
		disable = false,
		event = { 'InsertEnter', 'CmdLineEnter', 'BufReadPre' },
		dependencies = {
			{ "onsails/lspkind.nvim", },
			{ "hrsh7th/cmp-nvim-lsp", },
			{ "hrsh7th/cmp-nvim-lua", },
			{ "hrsh7th/cmp-buffer", },
			{ "hrsh7th/cmp-path", },
			{ "hrsh7th/cmp-cmdline", },
			{
				"L3MON4D3/LuaSnip", -- tag = "v<CurrentMajor>.*",
				dependencies = { "rafamadriz/friendly-snippets" },
				config = function()
					require("plugin_configs.LuaSnip")
				end,

			},
			{ "saadparwaiz1/cmp_luasnip", }
		},
		config = function()
			require("plugin_configs.nvim-cmp")
		end,
	}),


	({
		"neoclide/coc.nvim",
		branch = "release",
		enabled = false,
		dependencies = { "neoclide/coc-snippets" },
		init = function()
			require("plugin_configs.coc")
		end,
	}),

}
