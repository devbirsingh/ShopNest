require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/routes.js')

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api',routes)

app.get('/', (req, res) => {
    res.send("working fine");
});

app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
});
