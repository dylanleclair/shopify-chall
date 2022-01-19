import os
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .models import Experience
from rest_framework.views import APIView

import math
import json 
from colorthief import ColorThief


def get_scheme(path): # expects absolute path
    ct = ColorThief(path)
    return ct.get_palette(color_count=30)

def palette_similarity(a,b):
    # calculates the euclidean distance between two colour palettes
    # a and b are equal size 2d arrays: [[color1], [color2]]

    if (len(a) != len(b)):
        print("Vectors not of equal size.")
    total = 0
    for x in range(len(a)):
        total+= math.dist(a[x],b[x])
    return total

def calculate_similar(scheme):
    # takes a list of colour schemes, finds the closest matching color schemes from schemes file

    # reads the schemes file
    with open("schemes.json", "r") as f:
        data = json.load(f)

        # for each scheme provided, find 3 most similar APOD images
        # collect in output

        data.sort(key=lambda x : palette_similarity(x['scheme'],scheme))
        print(data)
        for x in data:
            print(palette_similarity(x['scheme'], scheme))
        return data[:3] # append top 3 matches
    

# Create your views here.
class APODSimilarImages(APIView):
    def post(self,request, *args, **kwargs):
        print(os.getcwd())
        # get scheme from body
        # calculate most similar apod entries
        # fetch and return apod entry data
        s = request.data

        like_palettes = calculate_similar(s)

        output = []
        dates = []

        # for each similar image, collect JSON of corresponding APOD entry
        for x in like_palettes:
            date = x['date'] + ".json"
            path = os.path.join("APOD", "json", date)
            f = open(path, "r")
            output.append(json.load(f))
            dates.append(x['date'])
        exp = Experience.create(dates=dates)

        # return JSON in response
        return Response([exp.uuid,output], status=status.HTTP_200_OK)

class APODRestore(APIView):
    def get(self, request,uuid, *args, **kwargs):
        output = []
        exp = Experience.objects.get(uuid=uuid)
        dates = [exp.date1, exp.date2, exp.date3]
        for x in dates:
            date = x + ".json"
            path = os.path.join("APOD", "json", date)
            f = open(path, "r")
            output.append(json.load(f))
        return Response([exp.uuid,output], status=status.HTTP_200_OK)