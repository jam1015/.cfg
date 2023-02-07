local runtime_path = vim.split(package.path, ';')
print(runtime_path)
table.insert(runtime_path, 'lua/?.lua')
table.insert(runtime_path, 'lua/?/init.lua')

return {
	settings = {
		runtime = {
			-- Tell the language server which version of Lua you're using (most likely LuaJIT in the case of Neovim)
			version = 'LuaJIT',
			-- Setup your lua path
			path = runtime_path,
		},

		Lua = {
			diagnostics = {
				globals = { "vim" },
			},
			workspace = {
				library = { vim.api.nvim_get_runtime_file('', true),
					"${3rd}/luassert/library",
					[vim.fn.expand("$VIMRUNTIME/lua")] = true,
					[vim.fn.stdpath("config") .. "/lua"] = true,
				},
				checkThirdParty = false,
				--library = {
				--	  -- Make the server aware of Neovim runtime files
				--},
			},
			telemetry = {
				enable = false,
			},
		},
	},
}
