;; Set up package.el to work with MELPA
(blink-cursor-mode 0)
(require 'package)

(add-to-list 'package-archives' ("melpa" . "https://melpa.org/packages/"))
(when (< emacs-major-version 24)
(add-to-list 'package-archives '("gnu" . "http://elpa.gnu.org/packages/")))
(when (>= emacs-major-version 24)
  (add-to-list 'package-archives '("melpa" . "http://melpa.milkbox.net/packages/") t)
  )

;(setq package-archives '(("gnu" . "https://elpa.gnu.org/packages/")
;                         ("marmalade" . "https://marmalade-repo.org/packages/")
;                         ("melpa" . "https://melpa.org/packages/")))
;

(package-initialize)
;(package-refresh-contents)

;(require 'package)
;
;(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
;;; Comment/uncomment this line to enable MELPA Stable if desired.
;;; See `package-archive-priorities` and `package-pinned-packages`.
;;; Most users will not need or want to do this.
;;; (add-to-list 'package-archives
;;;              '("melpa-stable" . "https://stable.melpa.org/packages/") t)
;(package-initialize)
(unless (package-installed-p 'god-mode)
  (package-install 'god-mode))

(unless (package-installed-p 'evil-god-state)
  (package-install 'evil-god-state))

;; Download Evil
(unless (package-installed-p 'evil)
  (package-install 'evil))

;; Enable Evil
(require 'evil)
(evil-mode 1)
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(evil)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

(global-set-key (kbd "C-,") 'evil-execute-in-god-state)
