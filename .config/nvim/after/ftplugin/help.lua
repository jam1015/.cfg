vim.api.nvim_create_autocmd('BufWinEnter', {
	pattern = '*',
	callback = function(event)
		if vim.bo[event.buf].filetype == 'help' then
			vim.bo[event.buf].buflisted = true
		end
	end,
})