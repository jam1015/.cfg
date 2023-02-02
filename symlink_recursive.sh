#!/bin/bash

#
# script meant to be kept in my dotfiles to recursively link the files to the home directory
# clone the dotfiles repo to ~
# then run this script to recursively copy all of the files
# TODO use basename in declaration of loop rather than inside the loop
# TODO make it follow directories

# look up `--` syntax used with basename
#ln: failed to create symbolic link ‘/ihome/eprochownik/jam526/.config/.config’: File exists
#ln: failed to create symbolic link ‘/ihome/eprochownik/jam526/dotfiles’: File exists

echo_indent() # an echo function whose argument is a certain number of tabs to indent by
{
	i=0
	while [ $i -lt $1 ]
	do
		echo -n "  "
		i=$((i+1))
	done
	echo "$2"
}

recursive_link() # takes three arguments; source file, target file, and number of indents for logging output
{
	n_indents=$3 # the third argument is how muhch to indent for each level of reccursion

	# these two conditions test if one is a file and the other is a directory or vice-versa
	echo_indent $3 ====================================================
	echo_indent $3 "trying to link $1 and $2"

	if [ -f "$2" ]
	then
		echo_indent $3 "$2 already exists (file)"
		return 1
	fi

	if [ -L "$2" ]
	then
		echo_indent $3 "$2 already exists (symlink)"
		return 1
	fi

	if [ -f "$1" ] && [ -d "$2" ]
	then
		echo_indent $3 "mismatch between $1 (file) and $2 (directory)"
		return 1
	fi

	if [ -d "$1" ] && [ -f "$2" ]
	then
		echo_indent $3 "mismatch between $1 (directory) and $2 (file)"
		return 1
	fi




# Case where they are both directories
if [ -d "$1" ] && [ -d "$2" ]
then
	# if the existing system directory is empty
	if [ $(ls -A "$2" | wc -l) -eq 0 ] 
	then
		echo_indent $3 "linking directory to empty system directory"
		rm -r $2 # deleting empty directory so that `ln` works right; could use `n` option but the man page cautions against `n` in scripts
		ln -sv $1 $2 
		return 0
	fi

	echo_indent $3 "both directories, system nonempty: recursively symlinking contents"

	for fle in "$1"/.* "$1"/* #looping over dotfiles and other files
	do
		echo_indent $3 '------------------------------------------'
		echo_indent $3 "file is $fle"
		fle_used="$(basename -- $fle)" # just want the ending filename, not enclosing directories
		echo_indent $3 "basename is $fle_used"
		if [ "$fle_used" != '..' ] && [ "$fle_used" != '.' ] && [ "$fle_used" != 'symlink_recursive.sh' ] && [ "$fle_used" != "dotfiles" ] && [ "$fle_used" != "README.md" ] && [ "$fle_used" != "dotfiles/" ] && [ "$fle_used" != ".git" ] #list of files that we don't want ot copy
		then
			echo_indent $3 "applying recursion"
			#adding and subtracting indent because of bash scope rules
			n_indents=$((n_indents+1))
			recursive_link "$1/$fle_used" "$2/$fle_used" $((n_indents))
			n_indents=$((n_indents-1))
		else
			echo_indent $3 "file rejected for recursion"
		fi
	done

	return 0 # done recursing over subdirectories
	fi

	echo "linking $1 and $2"
	ln -sv $1 $2 #the file does not exist on the systme, symlinking to my dotfiles
}

#actually calling the function on my cloned dotfiles and the homedirectory
recursive_link ~/dotfiles ~ 0 #third arguments is 
