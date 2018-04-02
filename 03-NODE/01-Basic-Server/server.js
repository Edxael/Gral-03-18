const app = require('express')()

app.get('/', (req, res) => {
    res.send("Welcome to Node.." )
})

app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" Server Up and Running....")
})