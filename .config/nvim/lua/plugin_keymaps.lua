-- see ~/.config/nvim/lua/keymaps/init.lua for other plugins
-- function that returns keymaps based on name of plugin supplied
M = {}
function M.pluginKeymaps(plugin, setup_type)
	local keymap = vim.api.nvim_set_keymap
	local opts = { noremap = true, silent = true }
	if plugin == "vim-unimpaired" then
		vim.cmd([[
		function! s:ArgNext(...)
			try
				 let l:files = ""
				 for file in a:000
					let l:files .= file .. " "
				 endfor
				execute "next" l:files
				args
			catch /^Vim\%((\a\+)\)\=:E163:/
				first
				args
			catch /^Vim\%((\a\+)\)\=:E165:/
				first
				args
			finally
			endtry
		endfunction

		function! s:ArgPrev(...)
			try
				previous
				args
			catch /^Vim\%((\a\+)\)\=:E163:/
				last
				args
			catch /^Vim\%((\a\+)\)\=:E164:/
				last
				args
			finally
			endtry
		endfunction

		command -nargs=* Anext call <SID>ArgNext(<f-args>)
		command Aprev call <SID>ArgPrev(<f-args>)


		nnoremap ]a <Cmd>Anext<cr>
		nnoremap [a <Cmd>Aprev<cr>


		cnoreabbrev <expr> next  getcmdtype() == ":" && getcmdline() == "next" ? "Anext" : "next"
		cnoreabbrev <expr> n  getcmdtype() == ":" && getcmdline() == "n" ? "Anext" : "n"
		cnoreabbrev <expr> prev  getcmdtype() == ":" && getcmdline() == "prev" ? "Aprev" : "prev"
		cnoreabbrev <expr> previous  getcmdtype() == ":" && getcmdline() == "prevous" ? "Aprev" : "previous"
		]])
	elseif plugin == "yanky.nvim" then
		vim.keymap.set({ "n", "x" }, "p", "<Plug>(YankyPutAfter)")
		vim.keymap.set({ "n", "x" }, "P", "<Plug>(YankyPutBefore)")
		vim.keymap.set({ "n", "x" }, "gp", "<Plug>(YankyGPutAfter)")
		vim.keymap.set({ "n", "x" }, "gP", "<Plug>(YankyGPutBefore)")
		vim.keymap.set("n", "<c-n>", "<Plug>(YankyCycleForward)")
		vim.keymap.set("n", "<c-p>", "<Plug>(YankyCycleBackward)")
		vim.keymap.set({ "n", "x" }, "y", "<Plug>(YankyYank)")

		local _, telescope = pcall(require, "telescope")
		telescope.load_extension("yank_history")
		--		vim.api.nvim_create_user_command("YankyRingHistory",
		--			function() require("telescope").extensions.yank_history.yank_history(require('telescope.themes').get_ivy()) end,
		--			{})

		keymap("n", "<leader>yr",
			"<cmd>Telescope yank_history<cr>", opts)
	elseif plugin == "emmet-vim" then
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
	elseif plugin == "bufdelete.nvim" then
		vim.cmd([[
			cnoreabbrev <expr> bd  getcmdtype() == ":" && getcmdline() == "bd" ? "Bdelete" : "bd"
			cnoreabbrev <expr> bw  getcmdtype() == ":" && getcmdline() == "bw" ? "Bwipeout" : "bw"
			cnoreabbrev <expr> wbd  getcmdtype() == ":" && getcmdline() == "wbd" ? "w \| Bdelete" : "bd"
			cnoreabbrev <expr> wbw  getcmdtype() == ":" && getcmdline() == "wbw" ? "w \| Bwipeout" : "bw"
		]])
	elseif plugin == "hop" then
		vim.cmd([[
		    onoremap <leader>ww :HopWord<CR>
			nnoremap <leader>ww :HopWord<CR>
			]])
	elseif plugin == "nvim-cmp" then
		local function cmp_disable()
			require('cmp').setup.buffer { enabled = false }
		end

		local function cmp_enable()
			require('cmp').setup.buffer { enabled = true }
		end
		vim.api.nvim_create_user_command('CmpEnable', cmp_enable, { bar = true })
		vim.api.nvim_create_user_command('CmpDisable', cmp_disable, { bar = true })

	elseif plugin == "telescope" then
		keymap("n", "<leader>tf",
			"<cmd>lua require'telescope.builtin'.find_files()<cr>",
			opts)

		keymap("n", "<leader>tg", "<cmd>Telescope live_grep<cr>", opts)

		keymap("n", "<leader>bb", "<cmd>Telescope buffers<cr>", opts)
		keymap("n", "<leader>bb",
			"<cmd>lua require'telescope.builtin'.buffers(require('telescope.themes').get_ivy())<cr>", opts)
		--:lua require'telescope.builtin'.buffers(equire('telescope.themes').get_cursor()<cr>)
	elseif plugin == "mason" then
		return {
			toggle_package_expand = "<CR>",
			-- Keymap to install the package under the current cursor position
			install_package = "i",
			-- Keymap to reinstall/update the package under the current cursor position
			update_package = "u",
			-- Keymap to check for new version for the package under the current cursor position
			check_package_version = "c",
			-- Keymap to update all installed packages
			update_all_packages = "U",
			-- Keymap to check which installed packages are outdated
			check_outdated_packages = "C",
			-- Keymap to uninstall a package
			uninstall_package = "X",
			-- Keymap to cancel a package installation
			cancel_installation = "<C-c>",
			-- Keymap to apply language filter
			apply_language_filter = "<C-f>",
		}
	elseif plugin == "PushPop.vim" then
		vim.cmd([[
	    cnoreabbrev <expr> pud  getcmdtype() == ":" && getcmdline() == "pud" ? "Pushd" : "pud"
		cnoreabbrev <expr> pod  getcmdtype() == ":" && getcmdline() == "pod" ? "Popd" : "pod"
		cnoreabbrev <expr> dirs  getcmdtype() == ":" && getcmdline() == "dirs" ? "Dirs" : "dirs"
		]])
	else
		error("plugin " .. plugin .. " not found\n")
	end
end

return M
