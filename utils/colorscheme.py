# a function that will generate a colorscheme from a filename

from colorthief import ColorThief

def get_scheme(path): # expects absolute path
    ct = ColorThief(path)
    return ct.get_palette(color_count=10)
