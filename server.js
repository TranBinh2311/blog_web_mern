const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path))
app.use(fileUpload());

app.get('/', (req, res)=>{
    res.sendFile(path.join(initial_path, "home.html"))
})


app.get('/editor', (req, res)=>{
    res.sendFile(path.join(initial_path, "editor.html"))
})
//upload link

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/upload/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`upload/${imagename}`)
        }
    })
})


app.get("/:blog", (req,res)=>{
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res)=>{
    res.json("404 Not Found")
})
app.listen("5000", ()=>{
    console.log("listening in port 5000 ...");
})