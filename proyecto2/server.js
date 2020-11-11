//este es el servidor
const express = require('express');
const app = express();
//settings
var cors = require('cors');
app.use(cors());
app.set('port', process.env.PORT || 4201);

//middlewares
app.use(express.json());


//routes 
app.use(require('./routes/routes'));

//server config
app.listen(4201, "0.0.0.0", () => {
    console.log('server on port 4201');
});




/*var express = require("express");
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
//var oracledb = require('oracledb');

//modo 2 de conexion
const database = require('./database');

//Authoriser tous les requettes cors)
var cors = require('cors');
app.use(cors());

app.use(bodyparser.json());

///Pour changer le format de la requete 
app.use(bodyparser.urlencoded({
    extended: true
}));
app.listen(4201, function() {
    console.log("Live at Port 4201");

});

app.get('/getUsers', async(req, res) => {
    sql = "Select * from Clienteprueba";
    let result = await Database.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
        let UserSchema = {
            "Usuario_id": us[0],
            "Usuario_nombre": us[1],
            "Usuario_apellido": us[2],
            "Usuario_fecha": us[3],
            "Usuario_correo": us[4],
            "Usuario_pass": us[5],
            "Usuario_imagen": us[6],
            "Usuario_pais": us[7]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

/*
var connAttrs = {
    "user": "usradmin",
    "password": "1234",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};




/////Consulter users////// done
app.get('/ejemplo', function(req, res) {
    "use strict";

    oracledb.getConnection(connAttrs, function(err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT * FROM Clienteprueba", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function(err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function(err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});     */