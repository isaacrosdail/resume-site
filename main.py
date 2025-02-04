from flask import Flask

# Create instance of a Flask web app
app = Flask(__name__)

@app.route("/")
# Homepage
def home():
    return "Hello! this is the main page"
    
if __name__ == "__main__":
    app.run()