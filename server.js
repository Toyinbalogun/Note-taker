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
//Note page route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + "public/notes.html"))
})

//API routes
app.get('/api/notes', (req, res)=> {
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) =>{
        res.json(JSON.parse(data))
    })
})

app.get('/api/notes/:id', function(req, res){
    const id = req.params.id
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) =>{
       let notes = JSON.parse(data)

       for (const note of notes){
           if (note.id == id){
               console.log(note)
               return res.json(note)
           }
       }
       return res.json(false)
    })
})

app.post('/api/notes', (req, res)=> {
    let nNote = req.body
    nNote.id = generateID()

    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) =>{
        let notes = JSON.parse(data)
        note.push(nNote)
        fs.writeFile(
            path.join(__dirname, "db/db.json"),
            JSON.stringify(notes), "utf8", (err)=> {
                if (err) throw err
                console.log("New Note Saved")
                res.send(nNote)
            }
        )
    })  
})

app.delete('/api/notes/:id', (req, res)=>{
    const id = req.params.id
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) =>{
       let notes = JSON.parse(data)

       for (const note of notes){
           if (note.id == id){
              notes.splice(notes.indexOf(note), 1)
              fs.writeFile(
                path.join(__dirname, "db/db.json"),
                JSON.stringify(notes), "utf8", (err)=> {
                    if (err) throw err
                    console.log("Note Deleted")
                }
              )
              return res.send(true)
           }
       }
       return res.json(false)
    })
})

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})
//Listener
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`))