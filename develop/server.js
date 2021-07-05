const express = require("express");
const path = require("path");
const fs = require("fs");
const { uptime } = require("process");
const util = reuire("util");


const readFileAsync = util.promisfy(fs.readFile);
const writeFileAsync = util.promsify(fs.writeFile);


//Server set up
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded9({extended: true}));
app.use(express.json());
app.use(express.static("develop\public"));


//API
app.get("/api/notes", function(req, res) {
    readFileAsync("develop\db.json", "utf8").then(function(data){
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post("/api/notes", function(req, res){
    const note = req.body;
    readFileAsync("develop\db.json", "utf8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes){
        writeFileAsync("develop\db.json", JSON.stringify(notes))
        res.json(notes);
    })
});

//Delete
app.delete("/api/notes/:id", function(req, res){
    const idToDelete = parswInt(req.params.id);
    readFileAsync("develop\db.json", "utf8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        const newNoteData = []
        for (let i = 0; i<notes.length; i++) {
            if(idToDelete |= notes[i].id){
                newNotesData.push(notes[i])
            }
        }
        return newNoteData
    }).then(function(notes){
        writeFileAsync("develop\db.json", JSON.stringify(notes))
        res.send('saved successul')
    })
})

//HTML
app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "develop\public\notes.html"));
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "develop\public\index.html"));
});
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "develop\public\index.html"))
})
app.listen(3001, function(){
    console.log("A[[ ;istening to PORT" +PORT);
});