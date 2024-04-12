from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
import face_recognition
import base64
import numpy as np
from io import BytesIO
from PIL import Image
from recog import RecogFace

app = FastAPI()

class FaceRecogRequest(BaseModel):
    known_encodings: List[List[float]]
    unknown_image_base64: str

@app.post("/face-recog/v1/match")
async def face_match(request: FaceRecogRequest):
    # Decode the base64 string to bytes
    try:
        base64_decoded = base64.b64decode(request.unknown_image_base64)
        image_stream = BytesIO(base64_decoded)
        unknown_image_array = face_recognition.load_image_file(image_stream)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid base64 image data: {str(e)}")

    # Call the recognition function
    match = RecogFace(request.known_encodings, unknown_image_array)

    # Return the result
    return JSONResponse(content={"match": match})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
