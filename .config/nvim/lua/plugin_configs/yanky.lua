local utils = require("yanky.utils")
--local mapping_ok, mapping  = pcall(require, "yanky.telescope.mapping")

local function telescope_mappings(mode)
	local mapping_ok, mapping = pcall(require, "yanky.telescope.mapping")
	if mapping_ok then
		if mode == "i" then
			return ({
					["<c-p>"] = mapping.put("p"),
					["<c-k>"] = mapping.put("P"),
					["<c-x>"] = mapping.delete(),
					["<c-r>"] = mapping.set_register(utils.get_default_register()),
				})
		elseif mode == "n" then
			return ({
					{
						p = mapping.put("p"),
						P = mapping.put("P"),
						d = mapping.delete(),
						r = mapping.set_register(utils.get_default_register())
					}
				})
		elseif mode == "default" then
			return mapping.put("p")
		else
			return {}
		end
	end
end

require("yanky").setup({
	ring = {
		history_length = 100,
		storage = "shada",
		sync_with_numbered_registers = true,
		cancel_event = "update",
	},
	picker = {
		select = {
			action = nil, -- nil to use default put action
		},
		telescope = {
			mappings = {
				default = telescope_mappings("default"),
				i = telescope_mappings("i"),
				n = telescope_mappings("n"),
			}
		},
	},

	system_clipboard = {
		sync_with_ring = true,
	},
	highlight = {
		on_put = true,
		on_yank = true,
		timer = 200,
	--	yank_higroup = "Visual",
	--	put_higroup = "Visual",
	},
	preserve_cursor_position = {
		enabled = true,
	},
})

require("plugin_keymaps").pluginKeymaps("yanky.nvim")
