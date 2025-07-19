const express = require('express');
const app = express();
const CORS = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  



const center = require('./route/center');
const district = require('./route/district');
const caste = require('./route/caste');
const gender = require('./route/gender');
const category = require('./route/category');
const course = require('./route/course');
const trainingtype = require('./route/trainingtype');
const employee = require('./route/employee');
const participants = require('./route/Participants');
const Training = require('./route/training');
const financialyear = require('./route/financialyear');
const designation = require('./route/designation');
const coordinator = require('./route/coordinator');







app.use(express.json());
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(CORS(
    {
        origin: '*', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
));




app.use('/c', center);
app.use('/d', district);
app.use('/caste', caste);
app.use('/g',gender);
app.use('/ca',category);
app.use('/co',course);
app.use('/tra',trainingtype);
app.use('/e', employee);
app.use('/pa', participants);
app.use('/te', Training);
app.use('/f', financialyear);
app.use('/de', designation);
app.use('/coo', coordinator);










const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})