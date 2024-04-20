from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

from g4f.client import Client
@app.route('/submit', methods=['POST'])
def submit():
    data = request.json  # Get JSON data sent from JavaScript
    message = data['chat_message']
    client = Client()
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": message}]
    )
    return (response.choices[0].message.content)

    

if __name__ == '__main__':
    app.run(debug=True)