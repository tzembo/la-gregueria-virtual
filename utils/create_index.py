"""

Utility for creating Whoosh indices from MongoDB data.

"""

import os
from pymongo import MongoClient
from bson.objectid import ObjectId
from whoosh.index import create_in, open_dir
from whoosh.fields import Schema, ID, NUMERIC, KEYWORD, TEXT
from whoosh.analysis import LanguageAnalyzer

# connect to MongoDB database
client = MongoClient('localhost:27017')
db = client.GregueriasData

es_ana = LanguageAnalyzer("es") # Whoosh analyzer for Spanish

schema = Schema(id=NUMERIC(stored=True), text=TEXT(analyzer=es_ana, stored=True), wc=NUMERIC(stored=True), tags=KEYWORD(stored=True), x=NUMERIC(stored=True), y=NUMERIC(stored=True))

# Create index dir if it does not exist
if not os.path.exists("../whoosh_index"):
    os.mkdir("../whoosh_index")

index = create_in("../whoosh_index", schema)

# Fill index with posts from DB
posts = db.Greguerias.find()
writer = index.writer()
for i, post in enumerate(posts):
    writer.update_document(id=i, text=post["text"], wc=post["wordcount"], tags=post["tags"], x=post["x"], y=post["y"])

writer.commit()