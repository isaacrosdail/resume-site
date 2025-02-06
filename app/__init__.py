from flask import Flask

# Create instance of a Flask web app
app = Flask(__name__)

# Homepage
@app.route("/")
def home():
    return "<p>Hello! this is the main page!</p>"
    
if __name__ == "__main__":
    app.run()