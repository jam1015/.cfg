return {
	{ "lukas-reineke/indent-blankline.nvim", config = function() require("plugin_configs.indent-blankline") end,
		event = "VeryLazy" },
	"overcache/NeoSolarized",
	({
		"folke/tokyonight.nvim",
		branch = "main",
		config = function()
			require("plugin_configs.tokyonight")
		end,
		--event = "VeryLazy"
	}),

	{
		'pappasam/papercolor-theme-slim'
	},

	({
		"ellisonleao/gruvbox.nvim", --event = "VeryLazy"
	}),
	{ "samjwill/nvim-unception",
		enabled = true,
		init = function()
			require("plugin_configs.nvim-unception")
		end },
	{
		"rcarriga/nvim-notify",

		config = function() require("plugin_configs/notify") end,
	},

	{ 'dstein64/vim-startuptime',
		enabled = true,
		event = "VeryLazy",
		config = function() require("plugin_configs/vim-startuptime") end },
	("nvim-lua/plenary.nvim"),
	("nvim-lua/popup.nvim"),
	({ "ethanholz/nvim-lastplace", config = function() require("plugin_configs.nvim-lastplace") end }),
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

	{ "mzlogin/vim-markdown-toc", ft = { "markdown", "md", }, },

	{ "tpope/vim-unimpaired",     event = "VeryLazy" },
	{
		"windwp/nvim-autopairs",
		enabled = false,
		event = "VeryLazy",
		config = function() require("plugin_configs.nvim-autopairs") end
	},

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
	{ "tpope/vim-repeat",               event = "VeryLazy" },
	{ "qpkorr/vim-bufkill",             event = "VeryLazy" },
	{ "kevinoid/vim-jsonc",             event = "VeryLazy" },

	({
		--"jam1015/vim-slime",
		--event = "VeryLazy",
		dir = "/home/jordan/Documents/vim-slime",

		init = function()
			require("plugin_configs.vim-slime.initi")
		end,

		config = function()
			require("plugin_configs.vim-slime.config")
		end,
	}),


	({
		"mattn/emmet-vim", event = "VeryLazy",
		lazy = true,
		init = function()
			require("plugin_configs.emmet-vim.initi")
		end,

		config = function()
			require("plugin_configs.emmet-vim.config")
		end,
		ft = { "js", "ts", "html", "htm", "tsx", "jsx", "md" },
	}),

	({ -- run 'call firenvim#install(0)' to perhaps fix issues when it is not running in browser
		"glacambre/firenvim",
		build = function()
			vim.fn["firenvim#install"](0)
		end,
		--event = "VeryLazy",

		config = function()
			require("plugin_configs.firenvim")
		end,
	}),

	({
		"jalvesaq/Nvim-R", ft = { "R", "r", "rmd", "Rmd", "RMD" },
		enabled = false,
		branch = "stable",
		config = function()
			require("plugin_configs.Nvim-R")
		end,
	}),

	{
		"jbyuki/instant.nvim",
		config = function()
			require("plugin_configs.instant")
		end
	},
	{ "equalsraf/neovim-gui-shim" },

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

	{ "ggandor/flit.nvim", event = "VeryLazy", dependencies = "ggandor/leap.nvim",
		config = function() require("plugin_configs.flit") end },
	({
		"ggandor/leap.nvim", event = "VeryLazy",
		config = function()
			require('plugin_configs.leap')
		end,
	}),

	{ "andymass/vim-matchup",                        event = { "BufNewFile", "BufRead" }, },
	{ "numToStr/Comment.nvim",                       config = function() require("plugin_configs.Comment") end, event = "VeryLazy" },
	{ "JoosepAlviste/nvim-ts-context-commentstring", event = "VeryLazy" },

	({
		"nvim-treesitter/nvim-treesitter", --event = "VeryLazy",
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



	{ "lifecrisis/vim-difforig", event = "VeryLazy" },
	{ "lewis6991/gitsigns.nvim", config = function() require("plugin_configs.gitsigns") end, lazy = true },
	{
		'nvim-tree/nvim-tree.lua', event = "VeryLazy",
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



	{ "neovim/nvim-lspconfig",
		enabled = true,
		event = { "BufReadPre" },
		--	lazy = true,
		--						event = {"InsertEnter"}
		--
		--event = { "BufReadPre", "BufNewFile", "BufRead" },

		dependencies = { "onsails/lspkind.nvim",
			"williamboman/mason.nvim",
			"williamboman/mason-lspconfig.nvim",
			"folke/neodev.nvim"

		}, -- "RRethy/vim-illuminate" },
		config = function()
			require("plugin_configs.lsp")
		end },
	--"mfussenegger/nvim-dap",

	({
		"hrsh7th/nvim-cmp",
		enabled = true,
		event = "VeryLazy",
		dependencies = {
			{ "onsails/lspkind.nvim", event = "VeryLazy" },
			{ "hrsh7th/cmp-nvim-lsp", event = "VeryLazy" },
			{ "hrsh7th/cmp-nvim-lua", event = "VeryLazy" },
			{ "hrsh7th/cmp-buffer",   event = "VeryLazy" },
			{ "hrsh7th/cmp-path",     event = "VeryLazy" },
			{ "hrsh7th/cmp-cmdline",  event = "VeryLazy" },
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

}
