import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

//-------------GET-------------//

// app.get('/users', (req, res) => {
//     res.send(users);
// });

app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

//---------POST--------//

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = randomID();
    addUser(userToAdd);
    // let result = findUserById(userToAdd.id);
    // result = {users_list: result};
    res.status(201).send(userToAdd); // is this all for the 201 status code?
    //res.send('Resource Created');
});

function addUser(user){
    users['users_list'].push(user);
}

function randomID() {
    var chars = 'abcdefghiklmnopqrstuvwxyz'.split('');
    var nums = '0123456789'.split('');
    var newID = '';
    for (var i = 0; i < 3; i++) {
        newID += chars[Math.floor(Math.random() * chars.length)];
    }
    for (var i = 0; i < 3; i++) {
        newID += nums[Math.floor(Math.random() * nums.length)];
    }
    return newID;
}


//----------DELETE----------//

 app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0) {
        res.status(404).send('Resource not found.');
    }
    else {
        users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
        res.status(204).send('Successful Delete Request.');
    }     

});

//--------GET(name and job)-------//

app.get('/users/:name/:job', (req, res) => {
    const name = req.params.name;
    const job = req.params.job;

    if (findUserByName(name) != undefined){
        let listOfNames = findUserByName(name);
        if (findUserByJob(job) != undefined) {
            let result = listOfNames.filter( (user) => user['job'] === job);
            result = {listOfNames: result};
            res.send(result);
        }
        else {
            res.status(404).send('Resource not found.');
        }
    }
    else {
        res.status(404).send('Resource not found.');
    }
});

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}