
import json 
from colorthief import ColorThief
import sys
def get_scheme(path): # expects absolute path
    ct = ColorThief(path)
    return ct.get_palette(color_count=30)

print(json.dumps(get_scheme(sys.argv[1])))