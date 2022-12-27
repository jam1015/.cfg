local not_has_words_before = function()
	local line, col = unpack(vim.api.nvim_win_get_cursor(0))
	return col == 0 or vim.api.nvim_buf_get_lines(0, line - 1, line, true)[1]:sub(col, col):match("%s") --== nil
end

--local check_backspace = function()
--	local col = vim.fn.col "." - 1
--	return col == 0 or vim.fn.getline("."):sub(col, col):match "%s"
--end

local in_comment = function()
	local context = require("cmp.config.context")
	return (
		context.in_treesitter_capture("comment") or context.in_syntax_group("Comment")
		)
end
local luasnip = require("luasnip") -- Set up nvim-cmp.
local cmp = require 'cmp'

local lspkind = require('lspkind')
require("luasnip.loaders.from_vscode").lazy_load()

-- Set the behavior of tab
vim.cmd([[set completeopt=menu,menuone,noselect]])

cmp.setup({
	view = { entries = { name = 'custom', selection_order = 'near_cursor' } },
	snippet = {
		-- REQUIRED - you must specify a snippet engine
		expand = function(args)
			require('luasnip').lsp_expand(args.body) -- For `luasnip` users.
		end,
	},

	mapping = {
		['<C-b>'] = cmp.mapping.scroll_docs(-4),
		['<C-f>'] = cmp.mapping.scroll_docs(4),
		['<C-Space>'] = cmp.mapping.complete(),
		['<C-e>'] = cmp.mapping.abort(),
		['<CR>'] = cmp.mapping.confirm({ select = false }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
		["<Tab>"] = cmp.mapping(function(fallback)
			if cmp.visible() then
				cmp.select_next_item()
			elseif luasnip.expand_or_jumpable() then
				luasnip.expand_or_jump()
			elseif not_has_words_before() then
				fallback()
			else
				fallback()
			end
		end, { "i", "s" }),

		["<S-Tab>"] = cmp.mapping(function(fallback)
			if cmp.visible() then
				cmp.select_prev_item()
			elseif luasnip.jumpable(-1) then
				luasnip.jump(-1)
			else
				fallback()
			end
		end, { "i", "s" }),
	},
	formatting =
	{
		fields = { "kind", "abbr", "menu" },
		format =
		function(outer_entry, outer_vim_item) --vscode like popup
			local kind = lspkind.cmp_format({
				mode = "symbol_text",
				maxwidth = 100, -- prevent the popup from showing more than provided characters (e.g 50 will not show more than 50 characters)
				ellipsis_char = '...', -- when popup menu exceed maxwidth, the truncated part would show ellipsis_char instead (must define maxwidth first)
				before = function(entry, vim_item)

					vim_item.menu = ({
						buffer = "[Buffer]",
						nvim_lsp = "[LSP]",
						luasnip = "[LuaSnip]",
						nvim_lua = "[Lua]",
						latex_symbols = "[Latex]",
					})[entry.source.name]

					return vim_item

				end
			})(outer_entry, outer_vim_item)
			local strings = vim.split(kind.kind, "%s", { trimempty = true })
			kind.kind = " " .. strings[1] .. " "
			kind.menu = "    (" .. strings[2] .. ")"

			return kind
		end,

	},

	sources = cmp.config.sources({
		{ name = "nvim_lsp" },
		{ name = "nvim_lua" },
		{ name = "luasnip" },
		{ name = "buffer" },
		{ name = "path" }, --
	}),

	confirm_opts = {
		behavior = cmp.ConfirmBehavior.Replace,
		select = false,
	},
	window = {
		documentation = {
			border = "single" -- { "╭", "─", "╮", "│", "╯", "─", "╰", "│" },
		},
		completion = {
			border = "single" --{ "╭", "─", "╮", "│", "╯", "─", "╰", "│" },
		},
		-- completion = cmp.config.window.bordered(),
		--documentation = cmp.config.window.bordered(),
	},
	experimental = {
		ghost_text = false,
	},
})

-- Set configuration for specific filetype.
cmp.setup.filetype('gitcommit', {
	sources = cmp.config.sources({
		{ name = 'cmp_git' }, -- You can specify the `cmp_git` source if you were installed it.
	}, {
		{ name = 'buffer' },
	})
})

-- Use buffer source for `/` and `?` (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline({ '/', '?' }, {
	mapping = cmp.mapping.preset.cmdline(),
	sources = {
		{ name = 'buffer' }
	}
})

-- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline(':', {
	mapping = cmp.mapping.preset.cmdline(),
	sources = cmp.config.sources({
		{ name = 'path' }
	}, {
		{ name = 'cmdline' }
	})
})

-- Set up lspconfig.
--  local capabilities = require('cmp_nvim_lsp').default_capabilities()
--  -- Replace <YOUR_LSP_SERVER> with each lsp server you've enabled.
--  require('lspconfig')['clangd'].setup {
--	capabilities = capabilities
--  }
