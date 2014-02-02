# Gloups

## Installation

Run `npm install`

## Create an application

### Fada mode:on

`./src/bin/gloups make`

### PowerUser mode:on

1. run `echo "alias gloups='##gloups##'" >> ~/.bashrc && sed -e "s,##gloups##,"$(echo $(pwd)/src/bin/gloups)",g" <<< "$(cat ~/.bashrc)" > ~/.bashrc && source ~/.bashrc`
2. `gloups make`

### Exemple

I've cloned the repository in `/home/dhoko/dev/Gloups/`, so the binary is in `/home/dhoko/dev/Gloups/src/bin/`.

To setup an app (*in any folder*), run `./home/dhoko/dev/Gloups/src/bin/gloups make`
