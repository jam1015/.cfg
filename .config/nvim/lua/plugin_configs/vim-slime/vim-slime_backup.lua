local keymap = vim.keymap.set
if os.getenv("TMUX") then

	vim.g.slime_target = "tmux"
	vim.g.slime_default_config = { socket_name = "default", target_pane = "{next}" }
else

	vim.cmd([[colorscheme NeoSolarized]])
	vim.g.slime_target = "neovim"

	local slime_autocmds = vim.api.nvim_create_augroup("slime_autocomds", { clear = true })

	vim.api.nvim_create_autocmd("TermOpen", {
		pattern = "*",
		callback = function()

			require("notify")("terminal opened", vim.log.levels.WARN,
				{ timeout = 1000, animate = false, render = "minimal" })
			vim.g.recent_terminal = vim.b.terminal_job_id
		end,
		group = slime_autocmds
	})

	vim.api.nvim_create_autocmd("TermClose", {
		pattern = "*",
		callback = function()

			require("notify")("closed", vim.log.levels.WARN,
				{ timeout = 1000, animate = false, render = "minimal" })
			if (vim.g.recent_terminal == vim.b.terminal_job_id) then
				vim.cmd([[unlet vim.g.recent_terminal]])
			end

		end,
		group = slime_autocmds
	})
end

--vim.cmd([[
--
-- 	"let g:slime_default_config = {"socket_name": "default", "target_pane": "{next}"}
-- 	nmap gz <Plug>SlimeMotionSend
-- 	nmap gzz <Plug>SlimeLineSend
-- 	xmap gz <Plug>SlimeRegionSend
-- 	]])

-- function -> command -> mapping
--  function should test whether we have b.terminal_job_id set, then test if that job is running; if it is we
--     b.terminal_job_id?
--			running?
--				run the command
--			else:
--				reset and run command
--		else:
--			set the b.terminal_job_id from gloal and run command


local function check_set_jobid()

	if vim.b.slime_config and vim.b.slime_config["jobid"] then
		return
	end

	if vim.g.recent_terminal then
		if not vim.b.slime_config then
			vim.b.slime_config = { jobid = vim.g.recent_terminal }
		else

			vim.b.slime_config["jobid"] = vim.g.recent_terminal
		end

	else
		error("no recent terminal")
	end
end

--- setting operator
vim.cmd([[
noremap slime_Operator :<c-u>call slime#store_curpos()<cr>:set opfunc=slime#send_op<cr>g@
]])

local function slime_motion_send()

	local status_ok, _ = pcall(check_set_jobid)

	if not status_ok then
		print("could not set terminal")
		return
	end
	vim.cmd([[slime_Operator]])
end

keymap("n", "gz", slime_motion_send, { noremap = false, silent = true })


--- send single line
vim.api.nvim_create_user_command('SlimeLineSendCmd', "call slime#send_lines(v:count1)", { bar = true })
local function slime_line_send()

	local status_ok, _ = pcall(check_set_jobid)

	if not status_ok then
		print("could not set terminal")
		return
	end

	vim.cmd([[SlimeLineSendCmd]])

end

keymap("n", "gzz", slime_line_send, { noremap = false, silent = true })





----- send region
vim.api.nvim_create_user_command('SlimeRegionSendCmd', "<c-u>call slime#send_op(visualmode(), 1)<cr>", { bar = true })
local function slime_region_send()

	local status_ok, _ = pcall(check_set_jobid)

	if not status_ok then
		print("could not set terminal")
		return
	end
	vim.cmd([[SlimeRegionSendCmd]])
end

keymap("x", "gz", slime_region_send, { noremap = false, silent = true })
