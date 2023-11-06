const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
res.json({ message: "Welcome to pro construction's application." });
});

//User route 
const users = require('./src/router/user.routes');
app.use('/api/users', users);

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});