let express = require('express');
let todoController = require('./controllers/todoController');

let app = express();

// Set tenplate engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Fire controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log('Listening to port 3000');

