local status_ok, comment = pcall(require, "Comment")
if not status_ok then
	vim.cmd([[colorscheme delek]])
  return
end

comment.setup {
 pre_hook = require('ts_context_commentstring.integrations.comment_nvim').create_pre_hook()
}
