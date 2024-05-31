const app = require('./server/app')
require('dotenv').config();
const PORT = process.env.PORT
app.get('/', (req, res) => {
  res.send('hello world')
  
})


app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
}) 
