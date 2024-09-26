from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from bson.json_util import dumps
from datetime import datetime
import os
import traceback
import face_recognition
import cv2
import numpy as np
import random
import string

views = Blueprint('views', __name__)

client = MongoClient("mongodb://localhost:27017/")['cgproject']

@views.route('/all_cases', methods=["POST", "GET"])
def all_cases():
    try:
        data = request.get_json()  # Parse JSON data from request
        user = data.get("user_id")
        cases = client.cases.find({"station_id": user})
        json_format = dumps(cases)
        return jsonify({"cases": json_format}), 200
    except Exception as e:
        traceback.print_exc()  # Print traceback for debugging
        return jsonify({"error": str(e)}), 500

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def generate_unique_filename():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10)) + '.jpg'

@views.route('/compare', methods=["POST"])
def compare_faces():
    try:
        
        name = request.form['name']
        address = request.form['address']
        phone = request.form['phone']
        photo = request.files['photo']
        station_id = request.form['station_id']

        
        photo_data = photo.read()
        nparr = np.frombuffer(photo_data, np.uint8)
        uploaded_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        
        uploaded_image_rgb = cv2.cvtColor(uploaded_image, cv2.COLOR_BGR2RGB)
        uploaded_encoding = face_recognition.face_encodings(uploaded_image_rgb)[0]

        
        matched = False
        matched_case = None
        for case in client.cases.find():
            db_filename = case['image']
            db_filepath = os.path.join(UPLOAD_FOLDER, db_filename)
            db_image = cv2.imread(db_filepath)
            
            
            db_image_rgb = cv2.cvtColor(db_image, cv2.COLOR_BGR2RGB)
            db_encoding = face_recognition.face_encodings(db_image_rgb)[0]

            result = face_recognition.compare_faces([uploaded_encoding], db_encoding)

            if result[0]:
                matched = True
                matched_case = case
                break

        if matched:
            response = {
                'status': 'matched',
                'case': {
                    'case_id': str(matched_case['_id']),
                    'name': matched_case['name'],
                    'address': matched_case['address'],
                    'phone': matched_case['contact_no'],
                    'image': matched_case['image'],
                    'station_id': matched_case['station_id'],
                    'status': matched_case['status'],
                    'reg_date': matched_case['reg_date']
                }
            }
        else:
            
            filename = generate_unique_filename()
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            with open(filepath, 'wb') as f:
                f.write(photo_data)

           
            new_case = {
                'name': name,
                'address': address,
                'contact_no': phone,
                'image': filename,
                'status': 'unsolved',
                'station_id': station_id,
                'reg_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            case_id = client.cases.insert_one(new_case).inserted_id
            response = {
                'status': 'new_case',
                'case': {
                    'case_id': str(case_id),
                    'name': name,
                    'address': address,
                    'phone': phone,
                    'image': filename,
                    'station_id': station_id,
                    'status': 'unsolved',
                    'reg_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                }
            }

        return jsonify(response), 200

    except Exception as e:
        traceback.print_exc()  
        return jsonify({"message": "Photo is not clear or face not detected"}), 500
