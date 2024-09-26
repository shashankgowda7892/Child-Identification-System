import face_recognition
import json
kimage = face_recognition.load_image_file("./images/2.jpg")

kencoding = face_recognition.face_encodings(kimage)[0]

ukimage = face_recognition.load_image_file("./images/4.jpg")

ukencoding = face_recognition.face_encodings(ukimage)[0]
result = face_recognition.compare_faces([kencoding],ukencoding)
print(result)


# images = open("images.json")
# result1 = json.load(images)


# # for value in result['images']:
# #     print(value["id"],value["path"])

# for image in result1['images']:
#     print(result[0])
#     if result[0] == True:
#         print(image["id"])


# # # print(result)


