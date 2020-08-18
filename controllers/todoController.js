// let data = [{item: 'get milk'},{item: 'do coding'},{item: 'watch football'}];
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let urlencodedParser = bodyParser.urlencoded({extended: false});

// Connect to database
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Failed DB connect!');
    }
});

// Create a schema
let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);
// let itemOne = Todo({item: 'Get flowers'}).save((err) => {
//     if (err) throw err;
//     console.log('Item saved');
// });


module.exports = function(app) {

    app.get('/todo', (req, res) => {
        // Get data from DB
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {items: data});
        });
        
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // Add data to DB
        let newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', (req, res) => {
        // Delete requested item from DB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    });

}