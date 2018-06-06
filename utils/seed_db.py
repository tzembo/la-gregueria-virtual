"""
A simple script to load the data into mongoDB.
usage:

cd la-gregueria-virtual
python seed_db.py

"""

from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client['GregueriasData']

# clear existing greguerias
db.Greguerias.drop_indexes()
db.Greguerias.delete_many({})

# insert items
with open('../data/corpus.json') as f:
	j = json.load(f)

db.Greguerias.insert_many(j)