import os
import re
import csv


input_folder = 'database_backups'
output_folder = 'csv_exports'

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Regex pattern to match INSERT INTO statements
insert_pattern = re.compile(r"INSERT INTO `?(\w+)`?\s+VALUES\s*(\(.*?\));", re.DOTALL)

# Process each .sql file
for filename in os.listdir(input_folder):
    if filename.endswith('.sql'):
        file_path = os.path.join(input_folder, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        matches = insert_pattern.findall(content)
        if not matches:
            print(f"❌ No INSERTs found in {filename}")
            continue

        table_name = matches[0][0]  # Extracted table name from first match
        rows = []

        for _, values_blob in matches:
            # Split multiple row inserts if present: (...) , (...) , (...)
            row_matches = re.findall(r"\((.*?)\)", values_blob)
            for match in row_matches:
                values = [v.strip().strip("'\"") for v in re.split(r",(?=(?:[^']*'[^']*')*[^']*$)", match)]
                rows.append(values)

        # Write to CSV
        output_csv = os.path.join(output_folder, f"{table_name}.csv")
        with open(output_csv, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerows(rows)

        print(f"✅ Exported {len(rows)} rows to {output_csv}")

