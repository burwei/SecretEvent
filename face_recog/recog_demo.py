import face_recognition

known_image = face_recognition.load_image_file("../../me.jpg")
unknown_image = face_recognition.load_image_file("../../unknown.jpg")

known_encodings = face_recognition.face_encodings(known_image)
if len(known_encodings) == 0:
    print("No face found in known image")
    exit(1)

print(known_encodings)

unknown_encodings = face_recognition.face_encodings(unknown_image)
if len(unknown_encodings) == 0:
    print("No face found in unknown image")
    exit(1)

known_encoding = known_encodings[0]
unknown_encoding = unknown_encodings[0]

results = face_recognition.compare_faces([known_encoding], unknown_encoding)
print(results)
