from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo 


# from  model import model
from views import views
from auth import auth



app = Flask(__name__)
app.config['SECRET_KEY'] = 'shashank'
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)




CORS(app, origins="*")

app.register_blueprint(views, url_prefix='/')
app.register_blueprint(auth, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)
