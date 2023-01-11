local status_ok, _ = pcall(require, "lspconfig")
if not status_ok then
  return
end
require "plugin_configs.lsp.mason-lspconfig_config"
require("plugin_configs.lsp.lsp_handlers").setup()

--require "plugin_configs.lsp.null-ls"
