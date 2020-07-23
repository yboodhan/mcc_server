let express = require('express');
let app = express();

let cors = require('cors');
let bodyParser = require('body-parser');
let morgan = require('morgan');

require('dotenv').config();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        status: "success",
        code: 200
    })
})

app.get('*',(req, res) => {
    res.send({
        status: "error",
        message: "Request is invalid.",
        code: 400
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('🏃🏽‍♂️ The Pryon MCC server is up and running!')
})

