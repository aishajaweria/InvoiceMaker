import { db } from "../connect.js";

// Register controller
export const register = (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  // Check if user already exists
  const checkUserSql = "SELECT * FROM signup WHERE email = ?";
  db.query(checkUserSql, [email], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Insert user into database without hashing password
    const sql = "INSERT INTO signup (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: "Error registering user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};
// Login controller
export const login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }
  
    const sql = "SELECT * FROM signup WHERE email = ? AND password = ?";
  
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const user = results[0];
      console.log('User found:', user);
  
      // Password is valid, user authenticated
      res.status(200).json({ message: "Login successful" });
    });
  };
  