const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
// load the cookie-parsing middleware
app.use(cookieParser())
//Login middleware
const checkAuthentication = async (req, res, next) => {
const { username, password } = req.body;
// Check if the username and password are present in the request body
if (!username || !password) {
return res.status(400).json({ message: "Username and password are required" });
}
try {
// Query the database to find a user with the provided username and password
const user = await User.findOne({ username, password });
// If the user is not found, return an error response
if (!user) {
return res.status(401).json({ message: "Invalid username or password" });
}
// If the user is found, attach the user object to the request object and call the next middleware function
req.user = user;
next();
} catch (err) {
// If an error occurs, return a server error response
console.error(err);
res.status(500).json({ message: "Server error" });
}
};