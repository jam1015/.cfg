local servers = { "tsserver", "vimls", "clangd", "r_language_server", "texlab", "pyright", "jsonls", "cssls", "eslint",
	"emmet_ls", "html", "lua_ls", "julials" }

--local mason_settings_ok, settings_obj = pcall(require,"plugin_configs.lsp.lsp_handlerss")
local settings_obj = require("plugin_configs.lsp.mason_settings")
--if not mason_settings_ok then
--	vim.notify("failed to load mason settings\n")
--	vim.cmd([[colorscheme delek]])
--	return
--end

local settings = settings_obj.settings()
require("mason").setup(settings)

require("mason-lspconfig").setup({
	ensure_installed       = servers,
	automatic_installation = true --if we set it up with lspconfig then we install it
})


local lspconfig_status_ok, lspconfig = pcall(require, "lspconfig")
if not lspconfig_status_ok then
	vim.notify("failed to load lspconfig")
	return
end
--local cmp_lsp = require("cmp-nvim-lsp")
local handlers_ok, handlers_obj = pcall(require, "plugin_configs.lsp.lsp_handlers")
if not handlers_ok then
	vim.notify("failed to load handlers/n")
	vim.cmd([[colorscheme delek]])
	return
end

handlers_obj.buf_keymaps()
--
local opts = {}
for _, server in ipairs(servers) do
	opts = {
		on_attach = handlers_obj.on_attach,
		capabilities = handlers_obj.capabilities,
		flags = handlers_obj.lsp_flags
	}

	server = vim.split(server, "@")[1]
--
--	--vim.notify("trying to set up " .. server )
	local require_ok, conf_opts = pcall(require, "plugin_configs.lsp.settings." .. server)
	if require_ok then
		opts = vim.tbl_deep_extend("force", conf_opts, opts)
	end
--
--	--vim.notify("setting up " .. server )
	lspconfig[server].setup(opts)
end
