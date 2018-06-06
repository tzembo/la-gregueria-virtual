# server.py

import os
import urllib
import signal

from werkzeug.contrib.fixers import ProxyFix

from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask, render_template, jsonify, json, request, Response
from flask_cors import CORS
from collections import Counter

from whoosh.index import open_dir
from whoosh.query import Term, Every, NumericRange
from whoosh.qparser import QueryParser, OrGroup
from whoosh.analysis import LanguageAnalyzer
from whoosh.highlight import Formatter, get_text, WholeFragmenter

app = Flask(__name__, static_folder="build", template_folder="build")
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)

# connect to MongoDB database
# client = MongoClient('localhost:27017')
# db = client.GregueriasData

# customize highlight formatter 
class HighlightFormatter(Formatter):

    def format_token(self, text, token, replace=False):
        # Use the get_text function to get the text corresponding to the
        # token
        tokentext = get_text(text, token, replace)

        # Return the text as you want it to appear in the highlighted
        # string
        return "<mark>%s<mark>" % tokentext

hf = HighlightFormatter() # formatter for highlighting
wf = WholeFragmenter() # fragmenter for splitting words
es_ana = LanguageAnalyzer("es") # Whoosh analyzer for Spanish

# Load Whoosh index
index = open_dir("whoosh_index")

# Initialize Whoosh parser
parser = QueryParser("text", schema=index.schema)

@app.route("/")
def load_index():
    return render_template("index.html")


@app.route("/api/greguerias/all/", methods=['GET'])
def get_all_greguerias():

    try:
        results_list = []
        q = Every()  # Whoosh query for returning all items
        with index.searcher() as searcher:
            results = searcher.search(q, limit=None)
            for hit in results:
                result_item = {
                    "id": hit["id"],                        
                    "text": hit["text"],
                    "tags": hit["tags"],
                    "wc": hit["wc"],
                    "x": hit["x"],
                    "y": hit["y"]
                }
                results_list.append(result_item)

    except Exception as e:
        return str(e)
    else:
        return jsonify({"results": results_list})

@app.route("/api/greguerias", methods=['GET'])
def search():

    query = []

    fulltext = request.args.get('fulltext')

    if fulltext:
        query.append(urllib.parse.unquote(fulltext))

    wcmin = request.args.get('wcmin', '')
    wcmax = request.args.get('wcmax', '')

    if wcmin or wcmax:
        if (wcmin):
            wcmin = wcmin + ' '
        if (wcmax):
            wcmax = ' ' + wcmax
        query.append("wc:[{}TO{}]".format(wcmin, wcmax))

    tags = request.args.get('tags')

    if tags:
        parsed_tags = tags.split(',')
        query.append("tags:(" + ' '.join(parsed_tags) + ")")

    print(' '.join(query))
    q = parser.parse(' '.join(query))

    with index.searcher() as searcher:

        results = searcher.search(q, limit=None)
        results.fragmenter = wf
        results.formatter = hf

        results_list = []

        print(q)

        for hit in results:
            print(hit.highlights("text"))
            result_item = {
                "id": hit["id"],                        
                "text": hit.highlights("text"),
                "tags": hit["tags"],
                "wc": hit["wc"],
                "x": hit["x"],
                "y": hit["y"]
            }
            results_list.append(result_item)

        print(results_list)

        return jsonify({"results": results_list})


@app.route('/api/gregueria/<gregueria_id>', methods=['GET'])
def get_gregueria_by_id(gregueria_id):

    try:

        sim_list = []

        with index.searcher() as searcher:
            docnum = searcher.document_number(id=gregueria_id)
            result = searcher.stored_fields(docnum)
            similar_results = searcher.more_like(docnum, "text")

            for hit in similar_results:

                sim_item = {
                        "id": hit["id"],                        
                        "text": hit["text"],
                        "tags": hit["tags"],
                        "wc": hit["wc"]
                    }

                sim_list.append(sim_item)

            ret = {"gregueria": result, "similar_greguerias": sim_list}

    except Exception as e:
        return str(e)
    return jsonify(ret)

@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0')
