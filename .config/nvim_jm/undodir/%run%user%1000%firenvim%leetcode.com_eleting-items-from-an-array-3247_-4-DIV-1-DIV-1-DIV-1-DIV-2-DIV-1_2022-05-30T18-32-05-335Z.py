Vim�UnDo� ��@�bwOS��&A������%��î�#�h2�          ra_bound = range(len(nums))                             b��    _�                             ����                                                                                                                                                                                                                                                                                                                                                       b��    �                         upper = max(ra_bound)           copy_index = 0           for k in ra_bound:   "            if copy_index > upper:                   break               if nums[k] == val:                   copy_index += 1   &            nums[k] = nums[copy_index]               copy_index += 1   #        for d in range(copy_index):               nums.pop()�                   ra_bound = range(len(nums))5��                         D                      �                         h                      �                         �                      �                         �                      �                         �                      �                         �                      �                                              �    	                     (                     �    
                     L                     �                         w                     �                         �                     �                         �                     5��