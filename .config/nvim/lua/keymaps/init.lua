local opts = { noremap = true, silent = true }
local keymap = vim.keymap.set

keymap("n", "<Space>", "", opts)
vim.g.mapleader = " "
vim.g.mapllocaleader = "\\"

-- defining functions that can be used to make command line abbreviations elsewhere
keymap("n", "<leader>ll", ":nohlsearch<CR>", opts)

if os.getenv("TMUX") then
	keymap("t", "<C-w>", "<C-\\><C-n><C-w>", { noremap = false, silent = true })
else
	--using my favored tmux prefix
	keymap("n", "<C-a>", "<C-w>", { remap = true, silent = true })
	keymap("t", "<C-a>", "<C-\\><C-n><C-w>", { remap = true, silent = true })
end

keymap("i", "<C-j>", "<C-x><C-o>", { remap = false, silent = true }) -- activate omni completeion
keymap("t", "<C-o>", "<C-\\><C-o>", { remap = false, silent = true }) --issue single terminal command
--keymap("n", "<C-w>s", "<cmd>colorscheme blue<cr>", opts)

keymap("n", "<leader>km", ":redir! > nvim_keys.txt<CR>:silent verbose map<CR>:redir END<CR>:edit nvim_keys.txt<CR>"
	, opts) --output keymap

--https://neovim.io/doc/user/map.html#user-commands
--https://neovim.io/doc/user/api.html and search nvim_create_user_command
-- and section 40 of the manual

local function term_vsplit()
	if vim.bo.buftype == 'terminal' then
		vim.cmd([[vsplit | term]])
	else
		vim.cmd([[vsplit]])
	end
end

local function term_hsplit()
	if vim.bo.buftype == 'terminal' then
		vim.cmd([[split | term]])
	else
		vim.cmd([[split]])
	end
end

vim.api.nvim_create_user_command('Tsplit', term_hsplit, { bar = true })
vim.api.nvim_create_user_command('Tvsplit', term_vsplit, { bar = true })

keymap("n", "<C-w>s", term_hsplit, opts)
keymap("t", "<C-w>s", term_hsplit, opts)
keymap("n", "<C-w>v", term_vsplit, opts)
keymap("t", "<C-w>v", term_vsplit, opts)

keymap("t", "<localleader><Esc>", "<C-\\><C-N>", opts)
keymap("n", "<leader>tt", "<cmd>terminal<cr>i", opts)
keymap("n", "<leader>tv", "<C-w>v<cmd>terminal<cr>i", opts)
keymap("n", "<leader>ts", "<C-w>s<cmd>terminal<cr>i", opts)
keymap("i", "<C-r>", "<C-r><C-p>", opts) --helpw sith pasting from insert moce
keymap("c", "%%", "getcmdtype() == ':' ? expand('%:h').'/' : '%%'", {expr = true, remap=false})

keymap("n", "<leader>gt", "<cmd>tabprev<cr>", { remap = true, silent = true, expr = true })

require("keymaps.directional_help")


vim.cmd([[




" changing size
if bufwinnr(1)
  map + <C-W>+
  map - <C-W>-
  map <leader>. <C-W><
  map <leader>, <C-W>>
endif

noremap <leader>cf :call CreateFile(expand("<cfile>"))<CR>

map Q gq
" get current file
cnoreabbr <expr> %% fnameescape(expand('%:p'))
" new windows

" in insert mode control u deletes to beginning of line, this makes it part of a new change
inoremap <C-U> <C-G>u<C-U>


""add type these after a search to instantly move text
""move to text
"cnoremap $t <CR>:t''<CR>
""move text to
"cnoremap $m <CR>:m''<CR>
""delete
"cnoremap $d <CR>:d<CR>``
"
"" makes count up and down motions actual lines if a number is given
"nnoremap <expr> k (v:count == -1 ? 'gk' : 'k')
"nnoremap <expr> j (v:count == 0 ? 'gj' : 'j')
"
""force visual motion
"nnoremap dj dvj
"nnoremap dk dvk
"nnoremap 0 ^
"nnoremap ^ 0
""nnoremap $ g$
""nnoremap g$ $
""nnoremap 0 g0
""nnoremap g0 0
""nnoremap ^ g^
""nnoremap g^ ^
]])
