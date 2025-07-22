import os
from werkzeug.utils import secure_filename
import boto3
from botocore.exceptions import ClientError
from flask import current_app

SUPABASE_S3_ENDPOINT = 'https://rddlldguussuxiuunyhg.supabase.co/storage/v1/s3'
SUPABASE_ACCESS_KEY = os.getenv('SUPABASE_ACCESS_KEY')
SUPABASE_SECRET_KEY = os.getenv('SUPABASE_SECRET_KEY')
SUPABASE_BUCKET_NAME = 'listings'

#sS3 SUPABASE CLIENT
s3 = boto3.client(
    's3',
    endpoint_url=SUPABASE_S3_ENDPOINT,
    aws_access_key_id=SUPABASE_ACCESS_KEY,
    aws_secret_access_key=SUPABASE_SECRET_KEY,
    region_name='us-east-1'
)

#FOLDER STRUCTURE
UPLOAD_FOLDER = 'static/images/listings'
LISTING_IMAGES_FOLDER = 'static/images/listings/listing_images'
COVER_UPLOAD_FOLDER = 'static/images/listings/cover_photos'
USER_PROFILE_IMAGE_UPLOAD_FOLDER = 'static/images/users/profile_images'
AGENT_PROFILE_IMAGE_UPLOAD_FOLDER = 'static/images/agents/profile_images'

def upload_file_to_s3(file, s3_key):
    """Uploads a file to Supabase S3-compatible bucket and returns its public URL"""
    try:
        s3.upload_fileobj(
            file,
            SUPABASE_BUCKET_NAME,
            s3_key,
            ExtraArgs={'ContentType': file.content_type}
        )

        project_ref = 'rddlldguussuxiuunyhg'
        public_url = f"https://{project_ref}.supabase.co/storage/v1/object/public/{SUPABASE_BUCKET_NAME}/{s3_key}"
        return public_url

    except ClientError as e:
        current_app.logger.error(f"S3 upload failed: {e}")
        raise


def save_image(file, listing_id):
    """Uploads listing image to Supabase and returns public URL"""
    filename = secure_filename(f"{listing_id}_{file.filename}")
    s3_key = f"{LISTING_IMAGES_FOLDER}/{filename}"
    return upload_file_to_s3(file, s3_key)

def save_cover_image(file, listing_id):
    """Uploads listing cover photo to Supabase and returns public URL"""
    filename = secure_filename(f"{listing_id}_{file.filename}")
    s3_key = f"{COVER_UPLOAD_FOLDER}/{filename}"
    return upload_file_to_s3(file, s3_key)

def save_user_profile_image(file, user_id):
    """Uploads user profile image to Supabase and returns public URL"""
    filename = secure_filename(f"{user_id}_{file.filename}")
    s3_key = f"{USER_PROFILE_IMAGE_UPLOAD_FOLDER}/{filename}"
    return upload_file_to_s3(file, s3_key)

def save_agent_profile_image(file, agent_id):
    """Uploads agent profile image to Supabase and returns public URL"""
    filename = secure_filename(f"{agent_id}_{file.filename}")
    s3_key = f"{AGENT_PROFILE_IMAGE_UPLOAD_FOLDER}/{filename}"
    return upload_file_to_s3(file, s3_key)


