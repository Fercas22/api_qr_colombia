require('./database/mysql');
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./routes')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use(router);

let port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Server listening on port', port);
});