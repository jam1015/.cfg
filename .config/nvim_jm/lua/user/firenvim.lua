	vim.cmd([[
	let g:firenvim_config = {
				\ 'globalSettings': {
					\ 'alt': 'all',
					\  },
					\ 'localSettings': {
						\ '.*': {
							\ 'cmdline': 'neovim',
							\ 'content': 'text',
							\ 'priority': 1,
							\ 'takeover': 'never',
							\ },
							\ }
							\ }

	if exists('g:started_by_firenvim')
		packadd firenvim
		set guifont=Consolas:h11
	endif
	]])
