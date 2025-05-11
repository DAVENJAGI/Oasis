#!/usr/bin/python3
""" A function that finds the distance of a listing from the user """
from math import radians, cos, sin, asin, sqrt
from flask import jsonify, request

def haversine(lat1, lon1, lat2, lon2):
    
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2]) # converts degrees from decimal to radians

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371
    return c * r

