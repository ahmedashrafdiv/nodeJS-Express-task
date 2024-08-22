
// ! Create a simple Express.js App with users endpoints for GET, POST, and DELETE

let fss = require("fs");
const express = require("express");
const app = express();
app.use(express.json())

app.listen(3000,()=>{
    console.log("hello the app listen in 3000");
});

let users = [
    {"id":"1","title":"ahmed"},
    {"id":"2","title" :"mohamed"},
    {"id":"3","title":"ahmed"},
    {"id":"4","title" :"mohamed"},
    {"id":"5","title":"ahmed"},
    {"id":"6","title" :"mohamed"},
    {"id":"7","title":"ahmed"},
    {"id":"8","title" :"mohamed"}
];

// get => get home page
app.get("/",(req,res)=>{
    res.send(`<h1>Welcom to Home Page</h1>`)
})

// get => get all users
app.get("/users",(req,res)=>{ 
    if(users.length == 0){
        res.status(404).send("No Users Found!");
        return
    }
    res.status(200).send(users)
})

// get => get specific users with ID params
app.get("/users/:id",(req,res)=>{
    const { id } = req.params;
    const findUser = users.find((u)=> u.id === id)

    if(users.length == 0 || findUser==undefined){
        res.status(404).send("No Users Found!");
        return
    }

    res.send(findUser)
})

// post => add One user 
app.post("/users",(req,res)=>{
    const user = req.body; 
    const findUser = users.find((u)=> u.id == user.id)
    
    if(findUser){
        res.status(400).send(`User already exists`)
        return
    }
    
    users.push(user)
    res.status(201).send("created!!")
})

// put => update user
app.put("/users/:id",(req, res)=>{
    const { id } = req.params;
    const newUserData  = req.body;
    const findUser  = users.find((u)=>u.id == id)

    if(users.length == 0 || findUser==undefined){
        res.status(400).send(" User Not Found!");
        return
    }

    users[(users.indexOf(findUser))] = {id,...newUserData}
    res.send("updated!!")
})

// patch => partially update user
app.patch("/users/:id", (req, res) => {
    const { id } = req.params;
    const {name} = req.body;
    const findUser = users.find((u) => u.id === id);

    if (findUser === undefined) {
        res.status(404).send("User Not Found!");
        return;
    }

    users[(users.indexOf(findUser))].name = name;
    res.status(200).send("User partially updated!");
});

// delete => delete All user 
app.delete("/users/",(req, res)=>{
    users = []
    res.send("Deleted!!")
})

// delete => delete specific user 
app.delete("/users/:id",(req, res)=>{
    const { id } = req.params.id;
    const findUser = users.find((u)=> u.id == id)

    if(users.length == 0 || findUser==undefined){
        res.status(400).send(" User Not Found!");
        return
    }

    users.splice(users.indexOf(findUser),1)
    res.status(200).send(" User is Deleted!!")
})



