//Dependencies
const express = require('express')
const path = require('path')
const fs = require('fs')

//express config
const app = express()

//set up port
const PORT = process.env.PORT || 3000

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + "/public"))

function generateID(){
    let char = "1234567890qwertyuiopasdfghjklzxcvbnm"
    let id = ""
    for (let i = 0; i < 8; i++) {
      let index = Math.floor(Math.random() * char.length)
      id += char[index]
    }
    return id
}

//Router
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

//Listener
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));