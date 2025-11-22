import os
from utils.get_env import get_app_data_directory_env


def get_images_directory():
    # TODO: CLOUD_STORAGE_INTEGRATION
    # This function returns local directory for storing images
    # Images are saved here in multiple places:
    # - PDF slide screenshots (pdf_slides.py)
    # - PPTX slide screenshots (pptx_slides.py)
    # - Generated images from AI (images.py)
    # - Uploaded images from users (images.py)
    # - Downloaded images from Pexels/Pixabay (download_helpers.py)
    # All these should be uploaded to cloud storage bucket instead
    images_directory = os.path.join(get_app_data_directory_env(), "images")
    os.makedirs(images_directory, exist_ok=True)
    return images_directory


def get_exports_directory():
    export_directory = os.path.join(get_app_data_directory_env(), "exports")
    os.makedirs(export_directory, exist_ok=True)
    return export_directory

def get_uploads_directory():
    uploads_directory = os.path.join(get_app_data_directory_env(), "uploads")
    os.makedirs(uploads_directory, exist_ok=True)
    return uploads_directory
