Vim�UnDo� c�F��V8���Y��4НO^1(�i�v�2      function! CreateFile(tfilename)                              c�2�    _�                             ����                                                                                                                                                                                                                                                                                                                                                             c�)�     �                   �               5��                                         �      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c�)�    �                  5��                                                  5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c�*M     �                	    endif�                        :norm gf�                3        echom "File created: ". expand(newfilepath)�                /        :execute "!touch ". expand(newfilepath)�   
                 else�   	                    :norm gf�      
          !       echo "File already exists"�      	               if filereadable(newfilepath)�                =    let newfilepath=expand('%:p:h') .'/'. expand(a:tfilename)�               :    " complete filepath from the file where this is called5��                         q                     �                         �                     �                         �                     �                                             �    	                     "                    �    
                     /                    �                         5                    �                        6                    �                         _                    �                        `                    �                         �                    �                        �                    �                         �                    5�_�                            ����                                                                                                                                                                                                                                                                                                                                                V       c�+9    �                 nnoremap gf <C-W>gf    :noremap <leader>cf :call CreateFile(expand("<cfile>"))<CR>5��                                   P               5�_�                            ����                                                                                                                                                                                                                                                                                                                                                          c�2�    �                     7	" complete filepath from the file where this is called   :	let newfilepath=expand('%:p:h') .'/'. expand(a:tfilename)       	if filereadable(newfilepath)   	   echo "File already exists"   	   :norm gf   	else   )		:execute "!touch ". expand(newfilepath)   -		echom "File created: ". expand(newfilepath)   
		:norm gf   	endif       endfunction�                function! CreateFile(tfilename)5��                                                  �                          !                      �                          #                      �                          \                      �                          �                      �                          �                      �                          �                      �                          �                      �                          �                      �    	                      �                      �    
                                           �                          H                     �                          T                     �                          \                     �                          ^                     5�_�                             ����                                                                                                                                                                                                                                                                                                                                                          c�2�    �                   "function! CreateFile(tfilename)   "   8"	" complete filepath from the file where this is called   ;"	let newfilepath=expand('%:p:h') .'/'. expand(a:tfilename)   "   "	if filereadable(newfilepath)   "	   echo "File already exists"   "	   :norm gf   "	else   *"		:execute "!touch ". expand(newfilepath)   ."		echom "File created: ". expand(newfilepath)   "		:norm gf   "	endif   "   "endfunction5��                                                  �                                                 �                          !                      �                          Y                      �                          �                      �                          �                      �                          �                      �                          �                      �                          �                      �    	                      �                      �    
                                           �                          =                     �                          H                     �                          O                     �                          P                     5��