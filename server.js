const express = require('express');
const cors = require('cors');
const app = express();
const Router = require('./routes/Router');
app.use(express.json());
app.use(cors());
app.use('/api/student', Router.StudentRouter);
app.use('/api/public', Router.PublicRouter);
app.listen(8000, () => console.log('Server is running at port:8000'));