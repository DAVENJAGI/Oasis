#!/usr/bin/env python3
"""This is a script that migrates data from database in the server and dumps it to a file folder"""
import os
from os import getenv
import subprocess
import mysql.connector

DB_HOST = os.getenv("OASIS_MYSQL_HOST")
DB_USER = os.getenv("OASIS_MYSQL_USER")
DB_PASSWORD = os.getenv("OASIS_MYSQL_USER_PASSWORD")
DB_NAME = os.getenv("OASIS_MYSQL_DATABASE")

"""connection to the database"""
conn = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)
cursor = conn.cursor()

cursor.execute("SHOW TABLES")
tables = cursor.fetchall()

backup_dir = "database_backups"
os.makedirs(backup_dir, exist_ok=True)

for (table,) in tables:
    filename = os.path.join(backup_dir, f"{table}.sql")
    dump_cmd = f"mysqldump -h {DB_HOST} -u {DB_USER} -p{DB_PASSWORD} {DB_NAME} {table} > {filename}"
    
    subprocess.run(dump_cmd, shell=True, check=True)
    print(f"Table {table} dumped successfully to {filename}")

cursor.close()
conn.close()


