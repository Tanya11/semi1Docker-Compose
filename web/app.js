var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


/* set up sql connection */
var mysql = require("mysql");
var connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});

/* throw an error if sql connect fails. it should fail a couple times in docker 
 before successfully connecting. the container takes longer to boot up, essentially.
 */
connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});


/* 
var ppp=1123;
app.get('/va', function (req, res) {
  res.send(`las variable de entorno son port: ${ppp}`)
})
*/
app.get('/', function(req, res){
	
	var q = 'SELECT * from producto';
	var producto = 'select id, nombre from producto';			
	
	connection.query(producto, function(error, results, fields){
		if(error) throw error;
		producto = results;
		//console.log(producto);
		return;
	});

	connection.query(q, function(error, results, fields){
		if(error) throw error;
		console.log("rendering home page . . .");
		res.render('home', {
			title: "E-Commerce DB",
			results: results,
			character: character
		});
	});
});

app.get('/productos', function(req, res){
	var productQuery = 'select id, nombre, precio from producto';
	// var context = {};
	connection.query(productQuery, function(error, results, fields){
		if(error) throw error;
		console.log("rendering productos page . . .");

		res.render('productos', {
			title: "E-Commerce Archive Productos Page",
			results: results
		});
	});
});

app.post('/productos', urlencodedParser,function(req, res){
	console.log("adding a product with the following details below: ");
	console.log(req.body);		//midware urlencodedParser is doing this

	var addProduct = 'insert into producto (nombre, precio) VALUES (?, ?)';
	var inserts = [req.body.nombre, req.body.precio];

	connection.query(addProduct, inserts, function(error, results, fields){
		if (error) throw error;

		res.redirect('productos');
	});
});
/* */


/* Port and listening info below */
/* might want to set up argv for easily changing the port */
var port = 3257;

app.listen(port, function(){
	console.log("app listening on port: " + port);
});
