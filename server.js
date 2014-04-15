//server.js

var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/simple-desk-2');

// Configuración
app.configure(function() {
    // Localización de los ficheros estáticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola		
    app.use(express.logger('dev'));	
    // Permite cambiar el HTML con el método POST					
    app.use(express.bodyParser());
    // Simula DELETE y PUT						
    app.use(express.methodOverride());					
});

// Definición de modelos
var Todo = mongoose.model('Todo', {
	text: String
});

// Rutas de nuestro API
// GET de todos los TODOs
app.get('/api/todos', function(req, res) {				
	Todo.find(function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});

// POST que crea un TODO y devuelve todos tras la creación
app.post('/api/projects', function(req, res) {				
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo){
		if(err) {
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	});
});

// DELETE un TODO específicos y devuelve todos tras borrarlo.
app.delete('/api/projects/:todo', function(req, res) {		
	Todo.remove({
		_id: req.params.todo
	}, function(err, todo) {
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});

	})
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {						
	res.sendfile('./public/index.html');				
});

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App listening on port 8080');
});