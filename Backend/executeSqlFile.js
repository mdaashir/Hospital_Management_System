const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Database connection details
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

const sqlFilePath = path.join(__dirname, 'codes.sql');

fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
	if (err) {
		console.error('Error reading the SQL file:', err);
		return;
	}

	sql = sql.replace(/\r\n/g, '\n');

	connection.connect((err) => {
		if (err) {
			console.error('Error connecting to the database:', err.stack);
			return;
		}
		console.log('Connected to MySQL server');

		const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;

		connection.query(createDatabaseQuery, (err) => {
			if (err) {
				console.error('Error creating database:', err);
				connection.end();
				return;
			}
			console.log('Database created or already exists.');

			connection.changeUser({ database: process.env.DB_NAME }, (err) => {
				if (err) {
					console.error('Error changing to the database:', err);
					connection.end();
					return;
				}
				console.log('Now using the database:', process.env.DB_NAME);

				const queries = sql
					.split(';')
					.map((query) => query.trim())
					.filter((query) => query !== '');

				queries.forEach((query, index) => {
					connection.query(query, (err, results) => {
						if (err) {
							console.error(`Error executing query ${index + 1}:`, err);
							connection.end();
							return;
						}

						console.log(`Query ${index + 1} executed successfully.`);
					});
				});

				connection.end((err) => {
					if (err) {
						console.error('Error closing the connection:', err);
					} else {
						console.log('Connection closed successfully.');
					}
				});
			});
		});
	});
});
