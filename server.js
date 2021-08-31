const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./routes/Router');
app.use(express.json());
app.use(cors());
app.use('/api', Router.ApiRouter);
app.listen(3000, () => console.log('Server is running at port:3000'));