import os
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/images/listings'

def save_image(file, listing_id):
    """Saves an image file locally and returns the storage location file path"""
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    filename = secure_filename(f"{listing_id}_{file.filename}")
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    return filepath
