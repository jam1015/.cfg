local api = vim.api

-- Highlight on yank
local aesthetics = api.nvim_create_augroup("aesthetic_settings", { clear = true })
api.nvim_create_autocmd("TextYankPost", {
	command = "silent! lua vim.highlight.on_yank({higroup = \"Visual\", timeout = 200})",
	group = aesthetics,
})




-- concurrency ----------------------------
local function set_concurrent() --lets you edit multiple files at the same time
	vim.v.swapchoice = "e"
	require("notify")("concurrent editing", vim.log.levels.WARN,
		{ timeout = 1000, animate = false, render = "minimal" })
end

local concurrent = api.nvim_create_augroup("concurrent_editing", { clear = true })
api.nvim_create_autocmd("SwapExists", {
	callback = set_concurrent,
	group = concurrent,
})


-- terminal related --------------------
local term_autocmds = api.nvim_create_augroup("term_autocomds", { clear = true })


local function no_term_num()
	vim.opt_local.number = false
	vim.opt_local.relativenumber = false
end

api.nvim_create_autocmd("TermOpen", {
	callback = no_term_num,
	group = term_autocmds,
})



api.nvim_create_autocmd("TermClose", {
	pattern = "*",
	command = "if !v:event.status | exe 'bdelete! '..expand('<abuf>') | endif",
	group = term_autocmds
})

api.nvim_create_autocmd("TermOpen", {
	pattern = "*",
	--command = "if !v:event.status | exe 'bdelete! '..expand('<abuf>') | endif",
	callback = function()
		vim.g.recent_terminal = vim.b.terminal_job_id
	end,
	group = term_autocmds
})
--api.nvim_create_autocmd({
--"BufWritePost", "VimEnter"
--}, {
--	callback = function()
--
--		local hr = tonumber(os.date('%H', os.time()))
--		if hr > 6 and hr < 18 then -- day between 6am and 9pm
--			vim.cmd([[colorscheme gruvbox]])
--			vim.opt.background = 'light'
--		else -- night
--			vim.cmd([[colorscheme tokyonight]])
--			vim.opt.background = 'dark'
--		end
--
--	end,
--	group = aesthetics,
--})
