#!/usr/bin/env python3

import os
from os import getenv
import pymysql
from sqlalchemy import create_engine

password = os.getenv("MYSQL_USER_PASSWORD")
database = os.getenv("DATABASE_NAME")
user = os.getenv("DB_USER")

conn = pymysql.connect(
    host='localhost',
    user=user,
    password=password,
    database=database,
    autocommit=True
)

data_folder = "database_backups/"

for filename in os.listdir(data_folder):
    if filename.endswith('.sql'):
        file_path = os.path.join(data_folder, filename)
        with open(file_path, 'r') as f:
            sql_commands = f.read()

        with conn.cursor() as cursor:
            for command in sql_commands.split(';'):
                if command.strip():
                    cursor.execute(command)
            print(f"Executed SQL dump from {filename}")

conn.close()

