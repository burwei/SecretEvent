import base64
import sys

def encode_file_to_base64(file_path):
    """Encode file to base64 string."""
    try:
        with open(file_path, "rb") as file:
            encoded_string = base64.b64encode(file.read()).decode('utf-8')
            print(encoded_string)
    except FileNotFoundError:
        print("File not found. Please check the path and try again.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python base64.py <file_path>")
    else:
        encode_file_to_base64(sys.argv[1])
