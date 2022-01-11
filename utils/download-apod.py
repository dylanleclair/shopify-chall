# this script will download a huge set of images from the NASA APOD that we can use to make it work

import requests
import environ
import traceback 

env = environ.Env()
environ.Env.read_env()

NUMBER_TO_DOWNLOAD=5
API_KEY = env("NASA_API")

list = requests.get("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + "&count=" + str(NUMBER_TO_DOWNLOAD) + "&thumbs=True")

if not list.ok:
    print("Failed to fetch APOD data.")
    quit()

list = list.json() # turn the data into JSON so we can work with it 

# iterate through the returned JSON, find and download the images. 
for x in list:
    # check if the image exists in the output folder
    # if it does not already, save it to the output folder
    img = requests.get(x["url"])
    filename = x["url"].split("/")[-1] # parse the filename so we can save the image according to it
    ext = filename.split(".")[-1]
    write_filename = x["date"] + "." + str(ext)
    try:
        f = open("APOD/" + write_filename, "wb")
        f.write(img.content) # we want to save it as the date so that the backend can tell the frontend which data to fetch and display directly from NASA
        print("Wrote: " + write_filename)
        f.close()
    except Exception as e:
        traceback.print_exc()