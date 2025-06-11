import os
from os import getenv
import pandas as pd
from sqlalchemy import create_engine

password = os.getenv["MYSQL_USER_PASSWORD"]
database = os.getenv["DATABASE_NAME"]

engine = create_engine("mysql+pymysql://oasis_admin:password @localhost/database")

data_folder = "/"


for filename in os.listdir(data_folder):
    file_path = os.path.join(data_folder, filename)
    
    if filename.endswith(".csv"):
        df = pd.read_csv(file_path)
        table_name = os.path.splitext(filename)[0]
        df.to_sql(table_name, con=engine, if_exists='append', index=False)
        print(f"Loaded CSV file {filename} into table {table_name}")
        
    elif filename.endswith(".json"):
        df = pd.read_json(file_path)
        table_name = os.path.splitext(filename)[0]
        df.to_sql(table_name, con=engine, if_exists='append', index=False)
        print(f"Loaded JSON file {filename} into table {table_name}")

