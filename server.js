const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./routes/Router');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render("payment", { key: process.env.KEY_ID })
})
app.use('/api/student', Router.StudentRouter);
app.use('/api/public', Router.PublicRouter);
app.use('/api/payment', Router.RazorpayRouter);
app.listen(8000, () => console.log('Server is running at port:8000'));