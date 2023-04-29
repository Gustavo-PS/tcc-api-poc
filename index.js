const express = require('express')
const app = express()
app.get('/', (req, res) => res.json('Hello World! - Após workflow'))
app.listen(process.env.PORT || 3030)