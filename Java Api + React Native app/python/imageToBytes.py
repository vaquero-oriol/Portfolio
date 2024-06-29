import sys
import os
from PIL import Image

def image_to_byte_array(image_path):
    try:
        # Open the image file
        with Image.open(image_path) as img:
            # Convert the image to a byte array
            img_byte_array = img.tobytes()
            return img_byte_array
    except Exception as e:
        print(f"Error: {e}")
        return None

def get_image_size_mb(image_path):
    try:
        # Get the size of the image in bytes
        size_bytes = os.path.getsize(image_path)
        # Convert bytes to megabytes
        size_mb = size_bytes / (1024 * 1024)
        return size_mb
    except Exception as e:
        print(f"Error getting image size: {e}")
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 imageToBytes.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    byte_array = image_to_byte_array(image_path)
    image_size_mb = get_image_size_mb(image_path)

    if byte_array:
        print(f"Byte array length: {len(byte_array)}")
        if image_size_mb is not None:
            print(f"Image size: {image_size_mb:.2f} MB")
    else:
        print("Failed to convert image to byte array.")

if __name__ == "__main__":
    main()
