return {

	{ 'dstein64/vim-startuptime', config = function() require("plugin_configs/vim-startuptime") end },
	("nvim-lua/plenary.nvim"),
	("nvim-lua/popup.nvim"),
	({ "farmergreg/vim-lastplace" }),

	{ "airblade/vim-rooter", config = function()
		require("plugin_configs.vim-rooter")
	end },

	({
		"sitiom/nvim-numbertoggle",
		lazy = true,
		event = { "CursorMoved *", "CmdLineEnter *", "InsertEnter *" },
		init = function()
			require("plugin_configs.nvim-numbertoggle_init")
		end,
	}),

	{ "mzlogin/vim-markdown-toc", event = "VeryLazy",
	},
	({
		"folke/tokyonight.nvim",
		branch = "main",
		config = function()

			require("plugin_configs.tokyonight")
		end
	}),

	({
		"ellisonleao/gruvbox.nvim"
	}),
	"overcache/NeoSolarized",
	("tpope/vim-unimpaired"),

	({
		"lervag/vimtex", event = "VeryLazy",

		build = function()
			require("plugin_configs.vimtex")
		end,
	}),

	{
		"kana/vim-textobj-entire", event = "VeryLazy",
		dependencies = "kana/vim-textobj-user",
	},
	({
		"kylechui/nvim-surround", event = "VeryLazy",
		config = function()
			require("plugin_configs.nvim-surround")
		end,
	}),


	({
		"folke/which-key.nvim", event = "VeryLazy",
		config = function()
			require("plugin_configs.which-key")
		end,
	}),

	{ "bronson/vim-visual-star-search", event = "VeryLazy" },
	{ "tpope/vim-repeat", event = "VeryLazy" },
	{ "qpkorr/vim-bufkill", event = "VeryLazy" },
	{ "kevinoid/vim-jsonc", event = "VeryLazy" },
	({
		"jpalardy/vim-slime", event = "VeryLazy",
		config = function()
			require("plugin_configs.vim-slime")
		end,
	}),


	({
		"mattn/emmet-vim", event = "VeryLazy",
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
		"jalvesaq/Nvim-R", ft = { "R", "r", "rmd", "Rmd", "RMD" },
		branch = "stable",
		config = function()
			require("plugin_configs.Nvim-R")
		end,
	}),

	({ "ibhagwan/fzf-lua", event = "VeryLazy" }),

	({
		"nvim-telescope/telescope.nvim", event = "VeryLazy",
		dependencies = { "nvim-lua/plenary.nvim",
			{ "nvim-telescope/telescope-fzf-native.nvim",
				build = 'cmake -S. -Bbuild -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release && cmake --install build --prefix build' },
			"nvim-telescope/telescope-file-browser.nvim" },
		config = function()
			require("plugin_configs.telescope")
		end
	}),

	({
		"phaazon/hop.nvim", event = "VeryLazy",
		disable = true,
		config = function()
			require('plugin_configs.hop')
		end,
	}),

	({
		"ggandor/leap.nvim", event = "VeryLazy",
		config = function()

			require('plugin_configs.leap')
		end,
	}),

	{ "andymass/vim-matchup", dependencies = "nvim-treesitter" }, --,event = "VeryLazy"},
	({
		"nvim-treesitter/nvim-treesitter",
		build = "TSUpdate",
		config = vim.schedule(function()
			require("plugin_configs.nvim-treesitter")
		end),
	}),


	({
		"folke/trouble.nvim", event = "VeryLazy",
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





	{ "neovim/nvim-lspconfig",
		event = { "BufReadPost" },
		lazy = true,
		--						event = {"InsertEnter"}
		--
		--event = { "BufReadPre", "BufNewFile", "BufRead" },

		dependencies = { "onsails/lspkind.nvim",
			"williamboman/mason.nvim",
			"williamboman/mason-lspconfig.nvim",

		}, -- "RRethy/vim-illuminate" },
		config = function()

			require("plugin_configs.lsp")
		end },
	--"mfussenegger/nvim-dap",

	({
		"hrsh7th/nvim-cmp",
		disable = false,
		event = "VeryLazy",
		dependencies = {
			{ "onsails/lspkind.nvim", event = "VeryLazy" },
			{ "hrsh7th/cmp-nvim-lsp", event = "VeryLazy" },
			{ "hrsh7th/cmp-nvim-lua", event = "VeryLazy" },
			{ "hrsh7th/cmp-buffer", event = "VeryLazy" },
			{ "hrsh7th/cmp-path", event = "VeryLazy" },
			{ "hrsh7th/cmp-cmdline", event = "VeryLazy" },
			{
				"L3MON4D3/LuaSnip", -- tag = "v<CurrentMajor>.*",
				dependencies = { "rafamadriz/friendly-snippets" },
				config = function()
					require("plugin_configs.LuaSnip")
				end,

				event = "VeryLazy"
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
		event = "VeryLazy",
	}),

	{ "lifecrisis/vim-difforig", event = "VeryLazy" },
	{ "numToStr/Comment.nvim", config = function() require("plugin_configs.Comment") end, event = "VeryLazy" },
	{ "JoosepAlviste/nvim-ts-context-commentstring", event = "VeryLazy" },

	{ "lewis6991/gitsigns.nvim", config = function() require("plugin_configs.gitsigns") end, lazy = true },
	{
		'nvim-tree/nvim-tree.lua',
		dependencies = {
		},
		tag = 'nightly', -- optional, updated every week. (see issue #1193)
		config = function() require("plugin_configs.nvim-tree") end

	},

	{ "moll/vim-bbye" },

	{ 'akinsho/bufferline.nvim',
		enabled = false,
		--tag = "v3.*",
		config = function() require("plugin_configs.bufferline") end
	},

	'nvim-tree/nvim-web-devicons',
}
