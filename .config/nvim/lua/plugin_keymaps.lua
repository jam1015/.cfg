-- function that returns keymaps based on name of plugin supplied
M = {}
function M.pluginKeymaps(plugin, setup_type)

	local keymap = vim.api.nvim_set_keymap
	local opts = { noremap = true, silent = true }
	if plugin == "emmet-vim" then
		if setup_type == "config" then
			return (function()
				vim.cmd([[
				 nmap <leader>m,   <plug>(emmet-expand-abbr)
				 nmap <leader>m;   <plug>(emmet-expand-word)
				 nmap <leader>mu   <plug>(emmet-update-tag)
				 nmap <leader>md   <plug>(emmet-balance-tag-inward)
				 nmap <leader>mD   <plug>(emmet-balance-tag-outward)
				 nmap <leader>mn   <plug>(emmet-move-next)
				 nmap <leader>mN   <plug>(emmet-move-prev)
				 nmap <leader>mi   <plug>(emmet-image-size)
				 nmap <leader>m/   <plug>(emmet-toggle-comment)
				 nmap <leader>mj   <plug>(emmet-split-join-tag)
				 nmap <leader>mk   <plug>(emmet-remove-tag) 
				 nmap <leader>ma   <plug>(emmet-anchorize-url)
				 nmap <leader>mA   <plug>(emmet-anchorize-summary)
				 nmap <leader>mm   <plug>(emmet-merge-lines)
				 nmap <leader>mc   <plug>(emmet-code-pretty)
 	]])
			end)
		elseif setup_type == "init" then
			return (function()
				vim.g.user_emmet_leader_key = "<C-B>" --use this followed by comma to expand emmet
			end)
		else
		end

	elseif plugin == "hop" then

		vim.cmd([[
onoremap <leader>ww :HopWord<CR>
nnoremap <leader>ww :HopWord<CR>
]])
	elseif plugin == "telescope" then


		keymap("n", "<leader>tf",
			"<cmd>lua require'telescope.builtin'.find_files()<cr>",
			opts)

		keymap("n", "<leader>tg", "<cmd>Telescope live_grep<cr>", opts)

		keymap("n", "<leader>bb", "<cmd>Telescope buffers<cr>", opts)
		keymap("n", "<leader>bb", "<cmd>lua require'telescope.builtin'.buffers(require('telescope.themes').get_ivy())<cr>", opts)
		--:lua require'telescope.builtin'.buffers(equire('telescope.themes').get_cursor()<cr>)

	else
		error("plugin " .. plugin .. " not found\n")
	end
end

return M
