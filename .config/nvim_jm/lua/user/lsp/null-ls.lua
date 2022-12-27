local null_ls = require("null-ls")
-- formatting sources
local formatting = null_ls.builtins.formatting

              local	sources = {
		null_ls.builtins.formatting.stylua,
	},

null_ls.setup({ source = sources
})
