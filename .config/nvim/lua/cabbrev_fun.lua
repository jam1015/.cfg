local M = {}

function M.cabbrev(input, replace)
	local cmd = 'cnoreabbrev <expr> %s v:lua.require("cabbrev_fun").match_command("%s", "%s")'

	vim.cmd(cmd:format(input, input, replace))
end

function M.match_command(cmd, match)
	if vim.fn.getcmdtype() == ':' and vim.fn.getcmdline():match('^' .. cmd) then
		return match
	else
		return cmd
	end
end

return M
