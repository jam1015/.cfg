# something that has to do with anaconda ```````````````
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!

## Use powerline
#USE_POWERLINE="true"
## Source manjaro-zsh-configuration
#if [[ -e /usr/share/zsh/manjaro-zsh-config ]]; then
#  source /usr/share/zsh/manjaro-zsh-config
#fi
## Use manjaro zsh prompt
#if [[ -e /usr/share/zsh/manjaro-zsh-prompt ]]; then
#  source /usr/share/zsh/manjaro-zsh-prompt
#fi

__conda_setup="$('/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup

if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi
# <<< conda initialize <<<

# ``````````Vim configuration things`````
export vimrc="$HOME/.config/nvim/init.lua"
export NVIM_LISTEN_ADDRESS="/tmp/nvimsocket"
alias vi='nvim'
alias python='ptpython --vi --dark-bg'
#alias tmux="tmux -u"

#alias vim='nvim'
export VISUAL=/usr/bin/nvim #use nvim as default editor
export EDITOR=/usr/bin/nvim #use nvim as default editor
export VIMCONFIG=~/.config/nvim #vim configuration directory
export VIMDATA=~/.local/share/nvim # vim data directory (need to learn more about this)
#alias van="man -P 'nvim -c call\ ToggleNumberToggle\(\) -c set\ norelativenumber -c set\ nonumber  -c Man!'" #use vim as man pager
alias van="man -P 'nvim -c Man! -c set\ nonumber -c set\ norelativenumber'" # -c call\ ToggleNumberToggle\(\) -c set\ norelativenumber -c set\ nonumber  -c Man!'" #use vim as man pager # use gO to for TOC
set -o vi #use vi editing mode in the terminal
bindkey '^?' backward-delete-char
KEYTIMEOUT=1

#settings for cs50
#export CC="clang"
#export CFLAGS="-fsanitize=signed-integer-overflow -fsanitize=undefined -ggdb3 -O0 -std=c11 -Wall -Werror -Wextra -Wno-sign-compare -Wno-unused-parameter -Wno-unused-variable -Wshadow"
#export LDLIBS="-lcs50 -lm"

export FLASK_DEBUG=1
export FLASK_APP=application.py
export API_KEY=pk_c16b282717334bbeaae03699c19a03e1

# ````````````` Not sure what these settings are for
export LIBRARY_PATH=/usr/local/lib
export C_INCLUDE_PATH=/usr/local/include
export LD_LIBRARY_PATH=/usr/local/lib
export LDFLAGS="-L/usr/local/opt/sqlite/lib"
export CPPFLAGS="-I/usr/local/opt/sqlite/include"
export PKG_CONFIG_PATH="/usr/local/opt/sqlite/lib/pkgconfig"
# ```````````````Path Settings ``````````````````
#this is supposed to help with doom emacs
#export PATH="/usr/bin:$PATH"
export PATH=$PATH:~/doom-emacs/bin
export PATH=$PATH:"/usr/local/opt/llvm/bin"
#might help for sqlite
export PATH="/usr/local/opt/sqlite/bin:$PATH"
#alacrity colorcheme
export PATH=$PATH:"/Users/jordanmandel/Library/Python/4.8/bin"
export PATH=$PATH:"$HOME/.local/bin"
export PATH="${PATH}:${HOME}/bin"
export PATH="${PATH}:${HOME}/Documents/lsps/lua-language-server/bin"

#history settings
SAVEHIST=100000 #stting the history length
HISTSIZE=100000 #stting the history length
HISTFILE=~/.zhistory
bindkey "^R" history-incremental-pattern-search-backward

# setting some useful environment variables
export todo="$HOME/Documents/diaries/to_do.md"
export diaries="$HOME/Documents/diaries/diaries.md"
export tododir="$HOME/Documents/diaries/"
export thoughts="$HOME/Documents/diaries/thoughts.md"
export memories="$HOME/Documents/diaries/memories.md"

export swap="$HOME/.local/share/nvim/swap"
#export BROWSER="/usr/bin/firefox-developer-edition"

# 
#setting purple prompt
#
# msgcat --color=test
# for x in {0..8}; do for i in {30..37}; do for a in {40..47}; do echo -ne "\e[$x;$i;$a""m\\\e[$x;$i;$a""m\e[0;37;40m "; done; echo; done; done; echo ""
#


# perform parameter expansion/command substitution in prompt
setopt PROMPT_SUBST

vim_ins_mode=">"
vim_cmd_mode="%%"
vim_mode=$vim_ins_mode

function zle-keymap-select {
  vim_mode="${${KEYMAP/vicmd/${vim_cmd_mode}}/(main|viins)/${vim_ins_mode}}"
  zle reset-prompt
}

zle -N zle-keymap-select

function zle-line-finish {
  vim_mode=$vim_ins_mode
}
zle -N zle-line-finish



if [[ "$EUID" = 0 ]]
then 
PS1='%B%F{green}su:%3~ ${vim_mode}%f%b '
else
PS1='%B%F{magenta}%3~ ${vim_mode}%f%b '
fi


# setting other alases
alias cb=clipboard
alias ll='ls -lG'
alias ls='ls -G'
alias pd='pandoc'

# to run these commands install gnustep-base
defaults write -g InitialKeyRepeat -int 15 #normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 1 # normal minimum is 2 (30 ms)


if [[ $TERM == "xterm-kitty" ]]; then
alias ssh="kitty +kitten ssh"
echo "changed ssh for kitty"
fi
#automatic tmux colors
if [ -n "$TMUX" ]; then
    T=$(tmux display -p '#{client_termname}')
    case "$T" in
    *-256color)
         export TERM=tmux-256color
         ;;
    *)
         export TERM=tmux
         ;;
    esac
fi


mkcd () {
  mkdir "$1" && cd "$1"
}


mkcdp () {
  mkdir -p "$1" && cd "$1"
}


cpc() {
cp basic_headers.cpp $1
}
#xset r rate 250 35
#=======
export ght="https://gitlab.com/jam1015/ght.git/"
#http-server -a localhost -p 8000


alias luamake=/home/jordan/Documents/lsps/lua-language-server/3rd/luamake/luamake
alias pdflatex="pdflatex -synctex=1"
alias j4-dmenu-desktop='j4-dmenu-desktop --dmenu="(cat ; (stest -flx $(echo $PATH | tr : ' ') | sort -u)) | dmenu"'

ocl() {
    "$@" &
    disown
    exit
}


cl() {
    "$@" &
    disown
}

#init nvm
FILE=/usr/share/nvm/init-nvm.sh
if test -f "$FILE"; then
    source $FILE
fi


if [ -n "$TMUX" ]; then
	function refresh {
		 echo $(tmux show-environment | grep "^I3SOCK") > /dev/null
		 echo $(tmux show-environment | grep "^SSH_AUTH_LOCK") > /dev/null
		 echo $(tmux show-environment | grep "^SSH_CONNECTION") > /dev/null
		 echo $(tmux show-environment | grep "^DISPLAY") > /dev/null
	}

else
	function refresh { }
fi

function preexec {
	refresh

}

echo ".zshrc sourced"



# bun completions
[ -s "/home/jordan/.bun/_bun" ] && source "/home/jordan/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
