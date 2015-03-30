var Todo = require('./models/todo');

function getTodos(res) {

	Todo.find(function(err , todos){

		if (err) {res.send(err);}
		else {res.json(todos);}

	});

};

module.exports = function(app) {

	// Get All Todos
	app.get('/api/todos' , function(req ,res){
		getTodos(res);
	});

	// Create Todo and Send back all Todos after creation
	app.post('/api/todos' , function(req, res){

		Todo.create({
			text: req.body.text,
			done: false
		}, function(err ,todo){
			if (err) {res.send(err);}
			else {getTodos(res);}
		});	

	});	

	// Delete a Todo
	app.delete('/api/todos/:todo_id' , function(req, res){

		Todo.remove({
			_id: req.params.todo_id
		}, function(err ,todo){
			if (err) {res.send(err);}
			else {getTodos(res);}
		});

	});

	// Everything Else
	app.get('*' ,function(req,res){
		res.sendFile(__dirname + '/public/index.html');
	});

}