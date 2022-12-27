;;;; Set up package.el to work with MELPA
(blink-cursor-mode 0)
(require 'package)
(add-to-list 'package-archives
'("melpa" . "https://melpa.org/packages/"))
(when (< emacs-major-version 24)
(add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))
(package-initialize)
;;(package-refresh-contents)
;;;;
;;(unless (package-installed-p 'god-mode)
;;  (package-install 'god-mode))
;;;;
;;;; Enable god-mode
(require 'god-mode)
(god-mode)
(global-set-key (kbd "<escape>") #'god-mode-all)
(global-set-key (kbd "C-,") #'god-mode-all)
(setq god-exempt-major-modes nil)
(setq god-exempt-predicates nil)
;;(custom-set-variables
;; ;; custom-set-variables was added by Custom.
;; ;; If you edit it by hand, you could mess it up, so be careful.
;; ;; Your init file should contain only one such instance.
;; ;; If there is more than one, they won't work right.
;; '(package-selected-packages '(god-mode)))
;;(custom-set-faces
;; ;; custom-set-faces was added by Custom.
;; ;; If you edit it by hand, you could mess it up, so be careful.
;; ;; Your init file should contain only one such instance.
;; ;; If there is more than one, they won't work right.
;; )
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(god-mode)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
