if os.getenv("TMUX") then

	vim.g.slime_target = "tmux"

	vim.g.slime_default_config = { socket_name = "default", target_pane = "{next}" }
else

	vim.g.slime_target = "neovim"
	vim.g.autoconfig = "true"

--	local slime_autocmds = vim.api.nvim_create_augroup("slime_autocomds", { clear = true })
--	vim.api.nvim_create_autocmd("TermOpen", {
--		pattern = "*",
--		--command = "if !v:event.status | exe 'bdelete! '..expand('<abuf>') | endif",
--		callback = function()
--			vim.g.slime_last_channel = vim.b.terminal_job_id
--		end,
--		group = slime_autocmds
--	})
end
