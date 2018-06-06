# la-gregueria-virtual

"La Greguería Virtual," or the Virtual Aphorisms of Ramón Gómez de la Serna, is an online tool that allows scholars and the general public to search a database of 10,000 *greguerías* (Gómez de la Serna's aphorisms) using various filters or criteria, including specific words, length, and theme. This project is made possible by Corpus Creation and Software Development Seed Grants from the Digital Humanities Lab at Yale University.

# quickstart
```
git clone https://github.com/tzembo/la-gregueria-virtual
python utils/seed_db.py
python utils/create_index.py
python app.py

# open a web browser to localhost:5000
```

# seeding the database
`python utils/seed_db.py`
# creating the Whoosh index
`python utils/create_index`
