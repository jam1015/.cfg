require 'nvim-treesitter.configs'.setup {
	incremental_selection = {
		enable = true,
		keymaps = {
			init_selection = "<leader>is", --normal mode
			node_incremental = "<leader>ni", --visual mode
			scope_incremental = "<leader>si", --visual mode
			node_decremental = "<leader>nd",
		},
	},
	-- One of "all", "maintained" (parsers with maintainers), or a list of languages
	ensure_installed = {"r", "lua", "c", "python" ,"html","typescript","javascript", "bash",},
	ignore_install = { "phpdoc", "tree-sitter-phpdoc", },
	autopairs = true,

	-- Install languages synchronously (only applied to `ensure_installed`)
	sync_install = false,

	-- List of parsers to ignore installing
	-- ignore_install = { "javascript" },

	textobjects = { enable = true },
	highlight = {
		-- `false` will disable the whole extension
		enable = true,

		-- NOTE: these are the names of the parsers and not the filetype. (for example if you want to
		-- disable highlighting for the `tex` filetype, you need to include `latex` in this list as this is
		-- the name of the parser)
		-- list of language that will be disabled
		disable = {  "latex", "help", "markdown"},

		-- Setting this to true will run `:h syntax` and tree-sitter at the same time.
		-- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
		-- Using this option may slow down your editor, and you may see some duplicate highlights.
		-- Instead of true it can also be a list of languages
		additional_vim_regex_highlighting = false,
	},
	indent = { enable = false },
	context_commentstring = {
		enable = true,
		enable_autocmd = false,
	},
	matchup = { enable = true },
	-- ...
}
