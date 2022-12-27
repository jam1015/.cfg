
--"---- personal vimrc----------------------|
pcall(require, "impatient")
--" setting other settings
--
require('plugins') -- ~/.config/nvim/lua/plugins.lua

vim.cmd([[
runtime! my_config_files/*
]])


