const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var cors = require('cors') //  < --------------- IMPORTANTE (rode: npm install --save cors)

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()) //  < --------------- IMPORTANTE

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


router.get('/consulta/usuario/:email', (req, res) => {
    execSQLQuery(`SELECT * FROM bookcustomers WHERE email='`+ (req.params.email) +`'` , res);
})

router.get('/consulta/livros', (req, res) => {
    execSQLQuery(`SELECT d.ISBN, d.title, d.description, d.price, d.publisher, d.pubdate, d.edition, d.pages, s.CategoryName, t.nameF, t.nameL FROM bookdescriptions d, bookcategoriesbooks c, bookcategories s, bookauthorsbooks b, bookauthors t where d.ISBN = c.ISBN and c.CategoryID = s.CategoryID and b.AuthorID= t.AuthorID and b.ISBN = d.ISBN ` , res);
})

router.get('/consulta/category', (req, res) => {
    execSQLQuery(`SELECT CategoryName from bookcategories` , res);
})


router.post('/add/usuario', (req, res) => {
    const fname = req.body.fname.substring(0,150);
    const lname = req.body.lname.substring(0, 150);
    const email = req.body.email.substring(0, 150);
    const street = req.body.street.substring(0, 150);
    const city = req.body.city.substring(0, 150);
    const state = req.body.state.substring(0, 150);
    const zip = req.body.zip.substring(0, 150);
    execSQLQuery(`INSERT INTO bookcustomers(fname, lname, email, street, city, state, zip) VALUES ('${fname}','${lname}','${email}','${street}','${city}','${state}','${zip}')`, res);
});

router.post('/add/order', (req, res) => {
    const orderID = req.body.orderID;
    const custID= req.body.custID;
    const ordernate = req.body.ordernate;
    execSQLQuery(`INSERT INTO bookorders(orderID, custID, ordernate) VALUES (${orderID},${custID},'${ordernate}')`, res);

    });

router.post('/add/orderitem', (req, res) => {
    const orderID = req.body.orderID;
    const ISBN= req.body.ISBN;
    const qty= req.body.quantidade;
    const price = req.body.price;
    execSQLQuery(`INSERT INTO bookorderitems(orderID, ISBN, qty, price) VALUES (${orderID},'${ISBN}',${qty},${price})`, res);

    });

router.get('/consulta/order/:custID', (req, res) => {
        execSQLQuery(`SELECT * FROM bookorders WHERE custID=`+ (req.params.custID) , res);
    })

router.get('/consulta/orderitem/:orderID', (req, res) => {
        execSQLQuery(`SELECT * FROM bookorderitems WHERE orderID=`+ (req.params.orderID) , res);
    })

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({

        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'livraria'

    });

    connection.query(sqlQry, function(error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}


