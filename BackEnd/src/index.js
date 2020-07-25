const express = require('express')
const cors = require('./config/cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3333

const app = express()

app.use(cors)
app.use(express.json())
app.use(routes)


app.listen(PORT,()=>console.log(`Rodando no localhost:${PORT}`))