import face_recognition

def RecogFace(known_encodings, unknown_image):
    match = False

    if len(known_encodings) == 0:
        print("No face found in known image")
        return False

    # This step is the most time consuming one
    unknown_encodings = face_recognition.face_encodings(unknown_image)
    if len(unknown_encodings) == 0: 
        print("No face found in unknown image")
        return False
    
    for known_encoding in known_encodings:
        for unknown_encoding in unknown_encodings:
            result = face_recognition.compare_faces([known_encoding], unknown_encoding)
            if result:
                match = True
                break

    return match