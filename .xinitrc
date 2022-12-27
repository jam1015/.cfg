#!/bin/sh

userresources=$HOME/.Xresources
usermodmap=$HOME/.Xmodmap
sysresources=/etc/X11/xinit/.Xresources
pactl info > /dev/null #makes sure pulse audio is working
sysmodmap=/etc/X11/xinit/.Xmodmap

# merge in defaults and keymaps
# setting this first because otherwise it undoes the other ones.
setxkbmap -model kinesis -layout us -variant mac -option "terminate:ctrl_alt_bksp" #-option "ctrl:swapcaps"

if [ -f $sysresources ]; then

    xrdb -merge $sysresources

fi



if [ -f $sysmodmap ]; then
    xmodmap $sysmodmap
fi


if [ -f "$userresources" ]; then


    xrdb -merge "$userresources"

fi


if [ -f "$usermodmap" ]; then
    xmodmap "$usermodmap"
fi





# start some nice programs

if [ -d /etc/X11/xinit/xinitrc.d ] ; then
 for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
  [ -x "$f" ] && . "$f"
 done
 unset f
fi

export QT_QPA_PLATFORMTHEME=qt5ct
# twm &
# xclock -geometry 50x50-1+1 &
# xterm -geometry 80x50+494+51 &
# xterm -geometry 80x20+494-0 &
# exec xterm -geometry 80x66+0+0 -name login

if [ $(pgrep xflux | wc -l) -lt 1 ]
then
  xflux -z 15217 -k 2000 > /dev/null
fi

source /home/jordan/.screenlayout/monitor_left.sh
xset dpms 1201 1205 1210
xset r rate 250 35
sysctl -p /etc/sysctl.d/40-ipv6.conf
exec i3
