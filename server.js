const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');


// cors policy
app.use(cors());

// connect mongodb
require('./database/db')();

app.use(express.json());

app.use('/api', require('./routes/router'))
app.use('/api/payment',require('./routes/paymentRoutes'));

app.listen(PORT, () => {
    console.log(`Server started http://localhost:${PORT}`)
})