Vim�UnDo� etM��mkWő�Z�Nٞ9,���D[��b��   +                                   c���    _�                             ����                                                                                                                                                                                                                                                                                                                                                          c���    �                 (require 'package)   (add-to-list 'package-archives   +'("melpa" . "https://melpa.org/packages/"))   ";;(when (< emacs-major-version 24)   M;;(add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))   (package-initialize)   (package-refresh-contents)   ;;   '(unless (package-installed-p 'god-mode)     (package-install 'god-mode))   ;;   ;; Enable god-mode   (require 'god-mode)   
(god-mode)   +(global-set-key (kbd "C-[") #'god-mode-all)   !(setq god-exempt-major-modes nil)    (setq god-exempt-predicates nil)   (custom-set-variables   - ;; custom-set-variables was added by Custom.   @ ;; If you edit it by hand, you could mess it up, so be careful.   9 ;; Your init file should contain only one such instance.   5 ;; If there is more than one, they won't work right.   * '(package-selected-packages '(god-mode)))   (custom-set-faces   ) ;; custom-set-faces was added by Custom.   @ ;; If you edit it by hand, you could mess it up, so be careful.   9 ;; Your init file should contain only one such instance.   5 ;; If there is more than one, they won't work right.    )�               (blink-cursor-mode 0)5��                          *                      �                         *                     �                          B                      �                          W                      �                          x                      �                          �                      �                          �                      �                                               �                          2                     �    	                      O                     �    
                      T                     �                          ~                     �                          �                     �                          �                     �                          �                     �                          �                     �                          �                     �                          
                     �                          .                     �                          Q                     �                          i                     �                          �                     �                          �                     �                                               �                          P                     �                          }                     �                          �                     �                          �                     �                                                �                          <                     �                          t                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c��x     �               ;;(blink-cursor-mode 0)5��                          *                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c��x     �               ;(blink-cursor-mode 0)5��                          *                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c��z     �               ;;(require 'package)5��                          @                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c��z     �               ;(require 'package)5��                          @                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c��~     �                ;;(add-to-list 'package-archives5��                          S                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c��~    �               ;(add-to-list 'package-archives5��                          S                      5�_�      	                      ����                                                                                                                                                                                                                                                                                                                                                             c���     �               -;;'("melpa" . "https://melpa.org/packages/"))5��                          r                      5�_�      
           	           ����                                                                                                                                                                                                                                                                                                                                                             c���    �               ,;'("melpa" . "https://melpa.org/packages/"))5��                          r                      5�_�   	              
            ����                                                                                                                                                                                                                                                                                                                                                             c���    �                  );;;; Set up package.el to work with MELPA   (blink-cursor-mode 0)   (require 'package)   (add-to-list 'package-archives   +'("melpa" . "https://melpa.org/packages/"))   $;;;;(when (< emacs-major-version 24)   O;;;;(add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))   ;;(package-initialize)   ;;(package-refresh-contents)   ;;;;   );;(unless (package-installed-p 'god-mode)    ;;  (package-install 'god-mode))   ;;;;   ;;;; Enable god-mode   ;;(require 'god-mode)   ;;(god-mode)   -;;(global-set-key (kbd "C-[") #'god-mode-all)   #;;(setq god-exempt-major-modes nil)   ";;(setq god-exempt-predicates nil)   ;;(custom-set-variables   /;; ;; custom-set-variables was added by Custom.   B;; ;; If you edit it by hand, you could mess it up, so be careful.   ;;; ;; Your init file should contain only one such instance.   7;; ;; If there is more than one, they won't work right.   ,;; '(package-selected-packages '(god-mode)))   ;;(custom-set-faces   +;; ;; custom-set-faces was added by Custom.   B;; ;; If you edit it by hand, you could mess it up, so be careful.   ;;; ;; Your init file should contain only one such instance.   7;; ;; If there is more than one, they won't work right.   ;; )5�5�_�   
                          ����                                                                                                                                                                                                                                                                                                                                                        c���    �         +      ;;(god-mode)   -;;(global-set-key (kbd "C-[") #'god-mode-all)   #;;(setq god-exempt-major-modes nil)   ";;(setq god-exempt-predicates nil)5��                          �                     �                          �                     �                          �                     �                                                5��