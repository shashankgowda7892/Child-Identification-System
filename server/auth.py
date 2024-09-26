from flask import Blueprint, request, jsonify
from pymongo import MongoClient


# Create a Blueprint for the authentication routes
auth = Blueprint('auth', __name__)

# Initialize MongoDB client and connect to the database
client = MongoClient("mongodb://localhost:27017/")['cgproject']

@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()  # Parse JSON data from request
        email = data.get("email")
        password = data.get("password")
        print(data)
        # Query the database for the user based on email
        user = client.users.find_one({"email": email})

        if user:
            # Convert ObjectId to string for JSON serialization
            user['_id'] = str(user['_id'])
            print(user)

            # Assuming 'user' contains a document from the 'users' collection
            if password == user.get("password"):
                # Password verification successful, return user data
                return ({ "user": user}), 200
            else:
                # Password verification failed
                return jsonify({'error': 'Invalid credentials'}), 400
        else:
            # User not found in the database
            return jsonify({'error': 'User not found'}), 404

    # Handle non-POST requests (GET, etc.)
    return jsonify({'message': 'Only POST requests are supported for login'}), 405
