# generate the color schemes of all of the images and save to a file.

import os
import sys
import colorscheme
import json

# this will help us with the next step of the project where we need to take the
# users colour scheme and try to match it with every other color scheme, maximizing similarity.

target_folder = sys.argv[1]
target_path = os.path.abspath(target_folder)

# open a directory, list the files in it. 
files = [os.path.join(target_path, f) for f in os.listdir(target_path) if os.path.isfile(target_path + "/" + f)]

# open each file, compute the color scheme and save it to a data file (or the data base) with the date of the image it corresponds to.

data = []

for x in files:
    # calculate the color scheme
    palette = colorscheme.get_scheme(x)
    # save the color scheme, paired with the date (ie: filename)
    filename_without_ext =  os.path.basename(x).split(".")[0]
    img_data = {"date": filename_without_ext, "scheme": palette }
    print(img_data)
    data.append(img_data)
print(data)
f = open("schemes.json", "w")
json.dump(data, f)
f.close()

# the color thief library on the frontend will return colors in RGB, so save to that!
