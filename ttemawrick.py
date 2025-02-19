from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/save_data', methods=['POST'])
def save_data():
    # Get the JSON data from the request
    data = request.get_json()

    # Specify the file where you want to save the data
    file_path = 'user_data.txt'

    # Prepare the data to be saved
    content = "User  Input:\n"
    for key, value in data.items():
        content += f"{key}: {value}\n"
    content += "-------------------\n"

    # Save the data to the file
    with open(file_path, 'a') as file:
        file.write(content)

    # Return a response
    return jsonify({'status': 'success', 'message': 'Data saved successfully.'})

if __name__ == '__main__':
    app.run(debug=True)

    