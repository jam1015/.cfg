			vim.g.slime_target = "tmux"
			vim.cmd([[
 	let g:slime_default_config = {"socket_name": "default", "target_pane": "{next}"}
 	nmap gz <Plug>SlimeMotionSend
 	nmap gzz <Plug>SlimeLineSend
 	xmap gz <Plug>SlimeRegionSend
 
 	]])
