import flask
import sqlite3
import sqlalchemy
import pandas as pd

app = flask.Flask(__name__, static_folder='')

sqlite_file = 'sqlite_database.db'
db = sqlalchemy.create_engine('sqlite:///%s' % sqlite_file)
table_signup = 'signup'
key_name = 'name'
key_email = 'email'
key_skills = 'skills'
key_wants = 'wants'

def setup():
    """
    Create tables
    """
    # TODO: use sqlalchemy to make this nice
    db.execute('create table if not exists {ts} ({email} text primary key, {name} text, {skills} text, {wants} text)'\
            .format(ts=table_signup, email=key_email, name=key_name, skills=key_skills, wants=key_wants))

@app.route("/")
def hello():
    print "hello"
    return flask.send_from_directory(app.static_folder, 'index.html')

@app.route("/static/bundle.js")
def js():
    return flask.send_from_directory(app.static_folder, 'dist/bundle.js')

@app.route("/signup", methods=['POST'])
def signup():
    # input name, email, skills, and what you're looking for, persist into database
    req = flask.request.values
    print req
    name = req.get(key_name)
    email = req.get(key_email)
    skills = req.get(key_skills)
    wants = req.get(key_wants)
    db.execute('insert into {ts} ({ce}, {cn}, {cs}, {cw}) values ("{email}", "{name}", "{skills}", "{wants}")'\
            .format(ts=table_signup, ce=key_email, cn=key_name, cs=key_skills, cw=key_wants, \
            email=email, name=name, skills=skills, wants=wants))
    return flask.jsonify(success=True)

@app.route("/list_signup", methods=['GET'])
def list_signup():
    query = 'select * from {ts}'.format(ts=table_signup)
    with db.begin() as db_eng:
        df = pd.read_sql(query, db_eng.connection)
    result = df.to_dict('records')  # or df.T.to_dict().values()
    #res = db.query('select * from {ts}'.format(ts=table_signup))
    print result
    return flask.jsonify(result=result)

if __name__ == "__main__":
    setup()
    # Set debug=True for autoreload
    app.run(debug=True)
