require('dotenv/config');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const routes = require('./src/config/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger'); // Importe o arquivo de configuração do Swagger
const opn = require('opn');



const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`Listening at: ${port}`)
    opn('http://localhost:'+port+'/api-docs');
})