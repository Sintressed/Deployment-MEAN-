const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const { Schema } = mongoose;
const app = express();//create app

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/anonymousNotes');
mongoose.connection.on('connected', function(){
    console.log("connected to mongoose DB")
})

const NoteSchema = new Schema({
    note:{
        type: String,
        required: true,
        minlength: 3,
    },
},{timestamps: true})
mongoose.model('Note', NoteSchema);
const Note = mongoose.model('Note')

// data routing
app.get('/notes', function(req,res){
    Note.find({}).sort({_id:-1}) 
    .then(notes =>{
        console.log("success finding note",notes)
        res.json(notes)
    })
    .catch(err =>{
        console.log("error finding notes: ", err)
    })
})
app.post('/addnote', function(req,res){
    const note = new Note({
        note: req.body.note
    })
    note.save(function(err){
        if(err){
            console.log("error saving note: ", err)
        }
        else{
            console.log("success", note)
        }
    })
})

app.listen(8000, function() {//set server to 8000
    console.log("listening on port 8000");
})