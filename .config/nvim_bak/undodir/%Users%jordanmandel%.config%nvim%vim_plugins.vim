Vim�UnDo� !�=4G>��]�;�(}�Rc�{��G�2[   
   4		"call minpac#add('lervag/vimtex',{'type': 'opt'})                              a�A    _�                            ����                                                                                                                                                                                                                                                                                                                                                             a���     �                   �               5��                                         |      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a���    �                  5��                                                  5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             a���     �               �               5��                          |                     5�_�                    	        ����                                                                                                                                                                                                                                                                                                                                                             a���     �   	            �   	            5��    	                      }                     5�_�                   
        ����                                                                                                                                                                                                                                                                                                                                                             a���     �   
            �   
            5��    
                      ~              4       5�_�      	              
        ����                                                                                                                                                                                                                                                                                                                                                             a���     �   	   
           5��    	                      }                     5�_�                 	   	        ����                                                                                                                                                                                                                                                                                                                                                             a���    �      	           5��                          |                     5�_�   	      
          	       ����                                                                                                                                                                                                                                                                                                                                                             a���     �   	            �   	            5��    	                      �              '       5�_�                    
       ����                                                                                                                                                                                                                                                                                                                                                             a���    �   	              &			call minpac#add("tpope/vim-repeat")5��    	                     �                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             a�A    �         
      4		"call minpac#add('lervag/vimtex',{'type': 'opt'}) 5��                         <                      5�_�   	              
   	       ����                                                                                                                                                                                                                                                                                                                                                             a���     �   	   
        �   	   
       $   '" gruvbox -----------------------------   #let g:gruvbox_contrast_light='soft'   $let g:gruvbox_contrast_dark='medium'   let g:gruvbox_italics=1   let g:gruvbox_italic=1   !let g:gruvbox_improved_warnings=1       "---- folke/tokyonight.nvim   let g:tokyonight_style = "day"       2 "------------------------- overcache/NeoSolarized   P" Default value is "normal", Setting this option to "high" or "low" does use the   M" same Solarized palette but simply shifts some values up or down in order to   /" expand or compress the tonal range displayed.   &let g:neosolarized_contrast = "normal"       P" Special characters such as trailing whitespace, tabs, newlines, when displayed   N" using ":set list" can be set to one of three levels depending on your needs.   >" Default value is "normal". Provide "high" and "low" options.   (let g:neosolarized_visibility = "normal"       L" I make vertSplitBar a transparent background color. If you like the origin   9" solarized vertSplitBar style more, set this value to 0.   'let g:neosolarized_vertSplitBgTrans = 1       M" If you wish to enable/disable NeoSolarized from displaying bold, underlined   M" or italicized" typefaces, simply assign 1 or 0 to the appropriate variable.   " Default values:   let g:neosolarized_bold = 1    let g:neosolarized_underline = 1   let g:neosolarized_italic = 1       O" Used to enable/disable "bold as bright" in Neovim terminal. If colors of bold   M" text output by commands like `ls` aren't what you expect, you might want to   *" try disabling this option. Default value   'let g:neosolarized_termBoldAsBright = 15��    	               $       �              �      5�_�                    
        ����                                                                                                                                                                                                                                                                                                                                                             a���     �   
           �   
             $		if exists('g:started_by_firenvim')   			packadd firenvim   			set guifont=Consolas:h10:w10   		endif5��    
                      ~              a       5�_�                             ����                                                                                                                                                                                                                                                                                                                                                             a���     �              �              8       +		call minpac#add('overcache/NeoSolarized')   >		call minpac#add('folke/tokyonight.nvim', {'branch': 'main'})   +		call minpac#add('EdenEast/nightfox.nvim')   2		call minpac#add('eddyekofo94/gruvbox-flat.nvim')   1		call minpac#add('ishan9299/nvim-solarized-lua')   +		call minpac#add('tanvirtin/monokai.nvim')   +		call minpac#add('overcache/NeoSolarized')   0		call minpac#add('marko-cerovac/material.nvim')   		"material -----------------   *		lua vim.g.material_style = 'deep ocean'    2		"deep ocean, oceanic, palenight, lighter, darker   		lua <<EOF   		 require('material').setup({       d			contrast = true, -- Enable contrast for sidebars, floating windows and popup menus like Nvim-Tree   E			borders = false, -- Enable borders between verticaly split windows       `			popup_menu = "dark", -- Popup menu style ( can be: 'dark', 'light', 'colorful' or 'stealth' )       			italics = {   .				comments = true, -- Enable italic comments   /				keywords = false, -- Enable italic keywords   1				functions = false, -- Enable italic functions   ,				strings = true, -- Enable italic strings   0				variables = false -- Enable italic variables   			},       W			contrast_windows = { -- Specify which windows get the contrasted (darker) background   -				"terminal", -- Darker terminal background   )				"packer", -- Darker packer background   %				"qf" -- Darker qf list background   			},       			text_contrast = {   E				lighter = false, -- Enable higher contrast text for lighter style   B				darker = false -- Enable higher contrast text for darker style   			},       			disable = {   s				background = false, -- Prevent the theme from setting the background (NeoVim then uses your teminal background)   J				term_colors = false, -- Prevent the theme from setting terminal colors   5				eob_lines = false -- Hide the end-of-buffer lines   			},       ?			custom_highlights = {} -- Overwrite highlights with your own   })   EOF           1		call minpac#add('yashguptaz/calvera-dark.nvim')   -		call minpac#add('mhartington/oceanic-next')   2		call minpac#add('projekt0n/github-nvim-theme')		   			"plugins for motion in nvim   I			call minpac#add('jalvesaq/Nvim-R',{'branch': 'stable','type': 'opt'})    2			call minpac#add('kyazdani42/nvim-web-devicons')5��                   7                      E      5��