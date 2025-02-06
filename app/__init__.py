from flask import Flask, render_template

# Create instance of a Flask web app
app = Flask(__name__)

# Homepage
@app.route("/")
def home():
    return render_template("index.html")

# Contact page
@app.route("/contact")
def contact():
    return "<p>Hello! Welcome to the Contact page!</p>"
    
if __name__ == "__main__":
    app.run()