local M = {}

M.buf_keymaps = function()

	local opts = { noremap = true, silent = false, }
	vim.keymap.set("n", "<space>e", vim.diagnostic.open_float, opts)
	vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, opts)
	vim.keymap.set("n", "]d", vim.diagnostic.goto_next, opts)
	vim.keymap.set("n", "<space>q", vim.diagnostic.setloclist, opts)
end

local function lsp_keymaps(bufnr)

	-- Enable completion triggered by <c-x><c-o>
	vim.api.nvim_buf_set_option(bufnr, "omnifunc", "v:lua.vim.lsp.omnifunc")
	local bufopts = { noremap = true, silent = false, buffer = bufnr }
	vim.keymap.set("n", "<space>e", vim.diagnostic.open_float, bufopts)
	vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, bufopts)
	vim.keymap.set("n", "]d", vim.diagnostic.goto_next, bufopts)
	vim.keymap.set("n", "<space>q", vim.diagnostic.setloclist, bufopts)

	vim.keymap.set("n", "gD", vim.lsp.buf.declaration, bufopts)
	vim.keymap.set("n", "gd", vim.lsp.buf.definition, bufopts)
	vim.keymap.set("n", "K", vim.lsp.buf.hover, bufopts)
	vim.keymap.set("n", "gi", vim.lsp.buf.implementation, bufopts)
	vim.keymap.set("n", "<C-k>", vim.lsp.buf.signature_help, bufopts)
	vim.keymap.set("n", "<space>wa", vim.lsp.buf.add_workspace_folder, bufopts)
	vim.keymap.set("n", "<space>wr", vim.lsp.buf.remove_workspace_folder, bufopts)
	vim.keymap.set("n", "<space>wl", function()
		print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
	end, bufopts)
	vim.keymap.set("n", "<space>D", vim.lsp.buf.type_definition, bufopts)
	vim.keymap.set("n", "<space>rn", vim.lsp.buf.rename, bufopts)
	vim.keymap.set("n", "<space>ca", vim.lsp.buf.code_action, bufopts)
	vim.keymap.set("n", "gr", vim.lsp.buf.references, bufopts)
	vim.keymap.set("n", "<leader>ff", function()
		vim.lsp.buf.format({ async = true })
	end, bufopts)
end

M.on_attach = function(client, bufnr)

	--  if client.name == "tsserver" then
	--    client.server_capabilities.documentFormattingProvider = false
	--  end
	lsp_keymaps(bufnr)
	--vim.cmd([[colorscheme delek]])

	--		local status_ok, illuminate = pcall(require, "illuminate")
	--		if not status_ok then
	--			return
	--		end
	--		illuminate.on_attach(client)
end


local status_ok, cmp_nvim_lsp = pcall(require, "cmp_nvim_lsp")
if not status_ok then
	--vim.cmd([[colorscheme elflord]])
	return
end

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true -- need to see what this does
M.capabilities = cmp_nvim_lsp.default_capabilities(capabilities)

M.lsp_flags = {
	-- Allow using incremental sync for buffer edits
	allow_incremental_sync = true,
	-- Debounce didChange notifications to the server in milliseconds (default=150 in Nvim 0.7+)
	debounce_text_changes = 150,
}

M.setup = function() -- more setup things
	local signs = {
		{ name = "DiagnosticSignError", text = "" },
		{ name = "DiagnosticSignWarn", text = "" },
		{ name = "DiagnosticSignHint", text = "" },
		{ name = "DiagnosticSignInfo", text = "" },
	}

	for _, sign in ipairs(signs) do
		vim.fn.sign_define(sign.name, { texthl = sign.name, text = sign.text, numhl = "" })
	end

	local config = {
		-- disable virtual text
		virtual_text = true,
		-- show signs
		signs = {
			active = signs,
		},
		update_in_insert = true,
		underline = true,
		severity_sort = true,
		float = {
			focusable = false,
			style = "minimal",
			border = "rounded",
			source = "always",
			header = "",
			prefix = "",
		},
	}

	vim.diagnostic.config(config)

	vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, {
		--		border = "rounded",
	})

	vim.lsp.handlers["textDocument/signatureHelp"] = vim.lsp.with(vim.lsp.handlers.signature_help, {
		--		border = "rounded",
	})
end

return M
