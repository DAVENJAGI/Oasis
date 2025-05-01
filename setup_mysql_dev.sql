-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS oasis;
CREATE USER IF NOT EXISTS 'oasis_admin'@'localhost' IDENTIFIED BY '  ';
GRANT ALL PRIVILEGES ON `oasis`.* TO 'oasis_admin'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'oasis_admin'@'localhost';
FLUSH PRIVILEGES;
