const express = require('express');
const router = express.Router();
const fs = require('fs');

const PATH_ROUTER = __dirname;

const cleanFileName = (fileName) => {
    const clean = fileName.split(".").shift();
    return clean;
}

fs.readdirSync(PATH_ROUTER).filter((fileName) => {
    const prefixRoute = cleanFileName(fileName);
    if (prefixRoute !== "index") {
        console.log(`Ruta funcional: dominio/${prefixRoute}`);
        router.use(`/${prefixRoute}`, require(`./${prefixRoute}.js`));
    }
});

module.exports = router;