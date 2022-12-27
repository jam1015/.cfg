local settings = {
	ui = {
		icons = {
			package_installed = "✓",
			package_pending = "➜",
			package_uninstalled = "✗"
		}
	}
}

require("mason").setup(settings)


local servers = {"vimls", "clangd", "r_language_server", "texlab", "pyright", "jsonls", "cssls", "eslint", "sumneko_lua"}

require("mason-lspconfig").setup({
	ensure_installed       = servers,
	automatic_installation = true
})


local lspconfig_status_ok, lspconfig = pcall(require, "lspconfig")
if not lspconfig_status_ok then
	return
end

--local cmp_lsp = require("cmp-nvim-lsp")


-- Mappings.
-- See `:help vim.diagnostic.*` for documentation on any of the below functions
-- Use an on_attach function to only map the following keys
-- after the language server attaches to the current buffer
-- Use a loop to conveniently call 'setup' on multiple servers and
-- map buffer local keybindings when the language server attaches



-- other servers
--  clangd pyright texlab
require("setup.lsp.handlers").buf_keymaps()

local opts = {}
for _, server in ipairs(servers) do

	opts = {
		on_attach = require("setup.lsp.handlers").on_attach,
		capabilities = require("setup.lsp.handlers").capabilities,
		flags = require("setup.lsp.handlers").lsp_flags
	}

	server = vim.split(server, "@")[1]

	--vim.notify("trying to set up " .. server )
	local require_ok, conf_opts = pcall(require, "setup.lsp.settings." .. server)
	if require_ok then
		opts = vim.tbl_deep_extend("force", conf_opts, opts)
	end

		--vim.notify("setting up " .. server )
	lspconfig[server].setup(opts)
end

