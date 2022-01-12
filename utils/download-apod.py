# this script will download a huge set of images from the NASA APOD that we can use to make it work

from os import system, write
import requests
import traceback 
import json


f = open(".env","r")
key = f.readline()
key = key.strip()

NUMBER_TO_DOWNLOAD=100
API_KEY = key

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
    write_json_name = x['date'] + ".json"
    try:
        f = open("APOD/" + write_filename, "wb")
        f.write(img.content) # we want to save it as the date so that the backend can tell the frontend which data to fetch and display directly from NASA
        print("Wrote: " + write_filename)
        f.close()

        f = open("APOD/json/" + write_json_name, "w")
        json.dump(x, f)
        f.close()
    except Exception as e:
        traceback.print_exc()