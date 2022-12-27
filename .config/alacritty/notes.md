usage: alacritty-colorscheme [-c configuration file] [-C colorscheme directory] [-V] [-d] [-h] [-v] {list,status,toggle,apply} ...

Change colorscheme of alacritty with ease.

positional arguments:
  {list,status,toggle,apply}
                        sub-command help
    list                List available colorschemes
    status              Show current colorscheme
    toggle              Toggle colorscheme
    apply               Apply colorscheme

optional arguments:
  -c configuration file, --config_file configuration file
                        (str, default=~/.config/alacritty/alacritty.yml) Path to alacritty configuration file
  -C colorscheme directory, --colorscheme_dir colorscheme directory
                        (str, default=~/.config/alacritty/colors/) Path to colorscheme directory
  -V, --base16_vim      (bool, default=False) Support base16-vim. Generates .vimrc_background file at home directory
  -d, --debug           (bool, default=False) Show more information
  -h, --help            show this help message and exit
  -v, --version         (default=None)
