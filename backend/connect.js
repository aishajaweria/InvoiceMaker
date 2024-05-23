import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    port: 4036, // Update port number to 4036
    user: "root",
    password: "", // Add your MySQL password here
    database: "test"
  });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});
