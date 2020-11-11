const express = require('express');
const { database } = require('firebase');
const { consoleTestResultHandler } = require('tslint/lib/test');
const router = express.Router();
const dbConexion = require('../database');
// pa encriptar
var md5 = require('md5');

// pa correos
const nodemailer = require("nodemailer");

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        server: 'ON',
        msg: 'Hello World'
    });
});
router.get('/getUsers', async(req, res) => {
    sql = "Select * from Clienteprueba";
    let result = await dbConexion.Connection(sql, [], false);
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
            "Usuario_pais": us[7],
            "Usuario_credito": us[8],
        }
        User.push(UserSchema);
    })
    res.json(User);
});
router.get('/obtenerNombres', async(req, res) => {

});

router.post('/insertarUsuario', async(req, res) => {

    nombreU = req.body.Nombre;
    apellidoU = req.body.Apellido;
    fechaU = req.body.Fecha;
    correoU = req.body.Correo;
    passw = req.body.Pass;
    passEncriptada = md5(passw);
    imagenU = req.body.Imagen;
    paisU = req.body.Pais;
    credito = 10000;

    sql = "Insert into Clienteprueba(nombre, apellido, fecha, correo, pass, imagen, pais, credito, estado) values(:nombreU, :apellidoU, :fechaU, :correoU, :passEncriptada, :imagenU, :paisU, :credito, 0)";
    console.log(sql);
    result = await dbConexion.Connection(sql, [nombreU, apellidoU, fechaU, correoU, passEncriptada, imagenU, paisU, credito], true);
    // enviando correo

    contentHTML = `
        <h1>Bienvenido a GTSALES</h1>
        <img src= "${imagenU}">
        <ul>
            <li>Correo: ${correoU}</li>
            <li>Nombre: ${nombreU}</li>
            <li>Apellido: ${apellidoU}</li>
        </ul>
    `

    // res.json({ "msg": 'Insertando usuarios' });
});


router.post('/recuperarPass', async(req, res) => {
    correoU = req.body.Correo;
    passw = req.body.Pass;
    passEncriptada = md5(passw);


    sql = "Update Clienteprueba set pass = :passEncriptada where correo = :correoU";
    console.log(sql);
    result = await dbConexion.Connection(sql, [passEncriptada, correoU], true);
    // enviando correo

    res.json({ "msg": 'Cambiando contrasenia' });
});


router.post('/actualizarDatosUsuario', async(req, res) => {
    nombre = req.body.Nombre;
    apellido = req.body.Apellido;
    pais = req.body.Pais;
    fecha = req.body.Fecha;
    imagen = req.body.Imagen;
    correo = req.body.Correo;

    sql = "Update Clienteprueba set nombre = :nombre, apellido = :apellido, pais = :pais, fecha = :fecha, imagen = :imagen where correo = :correo";
    console.log(sql);
    result = await dbConexion.Connection(sql, [nombre, apellido, pais, fecha, imagen, correo], true);
    // enviando correo

    res.json({ "msg": 'Actualizando datos' });
});

// agregar and where estado = 1 
router.post('/login', async(req, res) => {
    // console.log(req.body);
    correo = req.body.Correo;
    pass = req.body.Pass;
    passE = md5(pass);
    console.log('Pass encr = ', passE);
    sql = "Select * from Clienteprueba where correo = '" + correo + "' and pass = '" + passE + "' and estado = 1";
    console.log(sql);
    let result = await dbConexion.Connection(sql, [], false);
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
                "Usuario_pais": us[7],
                "Usuario_credito": us[8],
            }
            User.push(UserSchema);
        })
        // console.log(User);
    res.json(User);
});

router.post('/getProductoID', async(req, res) => {
    console.log(req.body);
    idUsr = req.body.idUsuario;
    sql = "Select * from Producto where idClienteprueba = " + idUsr;

    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Producto_id": us[0],
                "Producto_nombre": us[1],
                "Producto_descripcion": us[2],
                "Producto_precio": us[3],
                "Producto_palabrasClaves": us[4],
                "Producto_imagen": us[5],
                "Producto_megusta": us[6],
                "Producto_nomegusta": us[7],
                "Producto_estado": us[8],
                "Producto_idClienteprueba": us[9]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});
router.post('/insertarProducto', async(req, res) => {

    nombreP = req.body.NombreProducto;
    descripcion = req.body.DescripcionProducto;
    precio = req.body.PrecioProducto;
    palabras = req.body.PalabrasProducto;
    imagenP = req.body.Imagen;
    categoria = req.body.Categoria;
    idCliente = parseInt(req.body.IdUsuario);
    pais = req.body.Pais;
    console.log('estamos en la api para insertar producto: ');
    console.log(req.body);
    sql = "Insert into Producto(nombre, descripcion, precio, palabrasClaves, imagen, megusta, nomegusta, estado, categoria, idClienteprueba, clientepais) values(:nombreP, :descripcion, :precio, :palabras, :imagenP, 0,0,1, :categoria ,:idCliente, :pais)";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [nombreP, descripcion, precio, palabras, imagenP, categoria, idCliente, pais], true);

    res.json({ "msg": 'Insertando producto' });
});
router.get('/getProductoTienda', async(req, res) => {

    sql = "select * from producto where estado = 1";

    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Id": us[0],
                "Nombre": us[1],
                "Descripcion": us[2],
                "Precio": us[3],
                "PalabrasClaves": us[4],
                "Imagen": us[5],
                "Megusta": us[6],
                "Nomegusta": us[7],
                "Estado": us[8],
                "Categoria": us[9],
                "IdClientePrueba": us[10]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});

router.get('/getProductoTiendaCat', async(req, res) => {

    sql = "select * from producto where estado = 1 order by categoria asc";

    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Id": us[0],
                "Nombre": us[1],
                "Descripcion": us[2],
                "Precio": us[3],
                "PalabrasClaves": us[4],
                "Imagen": us[5],
                "Megusta": us[6],
                "Nomegusta": us[7],
                "Estado": us[8],
                "Categoria": us[9],
                "IdClientePrueba": us[10]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});

router.get('/getProductoTiendaPrecioAsc', async(req, res) => {

    sql = `select idproducto, nombre, descripcion,  cast(precio as int) as precio, palabrasclaves, imagen, megusta, nomegusta, categoria, idclienteprueba 
    from producto where estado = 1
    order by precio asc `;
    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Id": us[0],
                "Nombre": us[1],
                "Descripcion": us[2],
                "Precio": us[3],
                "PalabrasClaves": us[4],
                "Imagen": us[5],
                "Megusta": us[6],
                "Nomegusta": us[7],
                "Estado": us[8],
                "Categoria": us[9],
                "IdClientePrueba": us[10]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});
router.get('/getProductoTiendaPrecioDesc', async(req, res) => {

    sql = `select idproducto, nombre, descripcion,  cast(precio as int) as precio, palabrasclaves, imagen, megusta, nomegusta, categoria, idclienteprueba 
    from producto where estado = 1
    order by precio desc `;
    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Id": us[0],
                "Nombre": us[1],
                "Descripcion": us[2],
                "Precio": us[3],
                "PalabrasClaves": us[4],
                "Imagen": us[5],
                "Megusta": us[6],
                "Nomegusta": us[7],
                "Estado": us[8],
                "Categoria": us[9],
                "IdClientePrueba": us[10]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});
router.post('/getProductoTiendaPalabras', async(req, res) => {
    palabras = req.body.Palabras;
    sql = `select idproducto, nombre, descripcion,  cast(precio as int) as precio, palabrasclaves, imagen, megusta, nomegusta, categoria, idclienteprueba 
    from producto where estado = 1
    and palabrasclaves like '%` + palabras + `%'`;
    // console.log(sql);
    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Id": us[0],
                "Nombre": us[1],
                "Descripcion": us[2],
                "Precio": us[3],
                "PalabrasClaves": us[4],
                "Imagen": us[5],
                "Megusta": us[6],
                "Nomegusta": us[7],
                "Estado": us[8],
                "Categoria": us[9],
                "IdClientePrueba": us[10]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});
router.post('/insertarComentario', async(req, res) => {

    // console.log(req.body);
    comentario = req.body.Comentario;
    fecha = req.body.Fecha;
    prodId = req.body.ProductoId;
    usuarioId = parseInt(req.body.UsuarioId);
    // idCliente = parseInt(req.body.IdUsuario);

    sql = "Insert into comentario(comentario, fecha, idclienteprueba, idproducto) values(:comentario, :fecha, :usuarioId, :prodId)";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [comentario, fecha, usuarioId, prodId], true);

    res.json({ "msg": 'Comentario agregado' });
});

router.post('/insertarDenuncia', async(req, res) => {

    // console.log(req.body);
    comentario = req.body.Comentario;
    fecha = req.body.Fecha;
    prodId = req.body.ProductoId;
    usuarioId = parseInt(req.body.UsuarioId);
    // idCliente = parseInt(req.body.IdUsuario);

    sql = "Insert into Denuncia(comentario, fecha, idclienteprueba, idproducto) values(:comentario, :fecha, :usuarioId, :prodId)";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [comentario, fecha, usuarioId, prodId], true);

    res.json({ "msg": 'Inserto denuncia' });
});

// traer comentarios de 1 producto
router.post('/getComentarioID', async(req, res) => {
    console.log(req.body);
    idProducto = req.body.idProducto;
    sql = "Select comentario.comentario, comentario.fecha, clienteprueba.nombre from Comentario inner join clienteprueba on clienteprueba.idclienteprueba = comentario.idclienteprueba where idProducto = " + idProducto;

    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Comentario": us[0],
            "Fecha": us[1],
            "NombreCliente": us[2]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.post('/megusta', async(req, res) => {
    console.log('estamos en megusta');
    console.log(req.body);
    prodId = req.body.ProductoId;
    usuarioId = parseInt(req.body.UsuarioId);

    // ver si ya le dio like este usuario a este producto

    sql = "select count(idclienteprueba) as Existe from megusta where idclienteprueba = :usuarioId and idproducto = :prodId";
    let result = await dbConexion.Connection(sql, [usuarioId, prodId], false);
    Ex = [];
    result.rows.map(ex => {
        let exSchema = {
            "Existe": ex[0]
        }
        Ex.push(exSchema);
    })

    if (Ex.length > 0) {
        // si devolvio datos 
        if (Ex[0].Existe == 0) {
            // no le ha dado like a este prod
            console.log('NO LIKE');
            // insertar el like aqui
            sql = "insert into megusta(idclienteprueba, idproducto) values(:usuarioId, :prodId)"
            result = await dbConexion.Connection(sql, [usuarioId, prodId], true);

            sql2 = "update Producto set megusta = megusta + 1 where idproducto = :prodId"
            result2 = await dbConexion.Connection(sql2, [prodId], true);

            res.json({ "msg": 'NoExiste' });

        } else {
            console.log('SI LIKE');
            res.json({ "msg": 'Existe' });
        }
    } else {

    }
});

router.post('/nomegusta', async(req, res) => {
    console.log('estamos en nomegusta');
    console.log(req.body);
    prodId = req.body.ProductoId;
    usuarioId = parseInt(req.body.UsuarioId);

    // ver si ya le dio like este usuario a este producto

    sql = "select count(idclienteprueba) as Existe from nomegusta where idclienteprueba = :usuarioId and idproducto = :prodId";
    let result = await dbConexion.Connection(sql, [usuarioId, prodId], false);
    Ex = [];
    result.rows.map(ex => {
        let exSchema = {
            "Existe": ex[0]
        }
        Ex.push(exSchema);
    })

    if (Ex.length > 0) {
        // si devolvio datos 
        if (Ex[0].Existe == 0) {
            // no le ha dado like a este prod
            console.log('NO LIKE');
            // insertar el like aqui
            sql = "insert into nomegusta(idclienteprueba, idproducto) values(:usuarioId, :prodId)"
            result = await dbConexion.Connection(sql, [usuarioId, prodId], true);

            sql2 = "update Producto set nomegusta = nomegusta + 1 where idproducto = :prodId"
            result2 = await dbConexion.Connection(sql2, [prodId], true);

            res.json({ "msg": 'NoExiste' });

        } else {
            console.log('SI LIKE');
            res.json({ "msg": 'Existe' });
        }
    } else {

    }
});


router.post('/insertarCarrito', async(req, res) => {

    // console.log(req.body);
    prodId = req.body.ProductoId;
    usuarioId = parseInt(req.body.UsuarioId);
    // idCliente = parseInt(req.body.IdUsuario);

    sql = "Insert into carrito(idclienteprueba, idproducto, subtotal) values(:usuarioId, :prodId, 0)";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [usuarioId, prodId], true);

    res.json({ "msg": 'Insertando usuarios' });
});

router.post('/getCarritoUsuario', async(req, res) => {
    // console.log(req.body);
    idCliente = req.body.idCliente;
    sql = "select Producto.idProducto, Producto.nombre, Producto.descripcion, Producto.precio, Producto.imagen, Producto.idclienteprueba, Carrito.idclienteprueba , carrito.subtotal, carrito.idcarrito, (select clienteprueba.correo from Producto inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idClienteprueba where producto.idproducto = carrito.idProducto ) as correopropietario from Carrito inner join Producto on Producto.idProducto = carrito.idProducto where Carrito.idclienteprueba  = " + idCliente;
    // console.log(sql);
    let result = await dbConexion.Connection(sql, [], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "IdProducto": us[0],
                "Nombre": us[1],
                "Descripcion": us[2],
                "Precio": us[3],
                "Imagen": us[4],
                "IdPropietario": us[5],
                "IdCliente": us[6],
                "Subtotal": us[7],
                "IdCarrito": us[8],
                "CorreoPropietario": us[9]

            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});

router.post('/enviarCorreo', async(req, res) => {
    // necesito el correo 
    // console.log(req.body);
    correoCliente = req.body.Correo;
    mensaje = req.body.Mensaje;
    htmlCuerpo = req.body.Html;
    sub = req.body.Sub;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'clusterdevgt@gmail.com',
            pass: 'Cluster@96'
        }
    });

    const mailOptions = {
        from: "clusterdevgt@gmail.com",
        to: correoCliente,
        subject: sub,
        text: mensaje,
        html: htmlCuerpo
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Mail enviado");
            res.status(200).json(req.body);
        }
    });

});

// CATEGORIAS
router.get('/getCategorias', async(req, res) => {
    sql = "Select * from categoria ";

    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "idCategoria": us[0],
            "Categoria": us[1]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.post('/agregarCategoria', async(req, res) => {
    console.log(req.body);
    categoria = req.body.Categoria;

    sql = "insert into categoria(categoria) values(:categoria)";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [categoria], true);

});

// DENUNCIAS 
router.get('/getDenuncias', async(req, res) => {
    sql = "select Denuncia.idproducto, Denuncia.comentario, denuncia.fecha, clienteprueba.correo as denunciante, producto.nombre, producto.imagen, producto.descripcion, producto.precio, (select clienteprueba.idclienteprueba from Producto inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idclienteprueba  where producto.idproducto = denuncia.idproducto) as idpropietario , (select clienteprueba.correo from Producto  inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idclienteprueba where producto.idproducto = denuncia.idproducto ) as correopropietario from denuncia inner join clienteprueba on clienteprueba.idclienteprueba = denuncia.idclienteprueba inner join producto on producto.idproducto = denuncia.idproducto";

    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "IdProducto": us[0],
            "Comentario": us[1],
            "Fecha": us[2],
            "Denunciante": us[3],
            "NombreProducto": us[4],
            "ImagenProducto": us[5],
            "DescripcionProducto": us[6],
            "PrecioProducto": us[7],
            "IdPropietario": us[8],
            "CorreoPropietario": us[9]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

// actualizar estado de productos bloqueados
router.post('/bloquearProducto', async(req, res) => {
    console.log('Bloqueando producto:');
    console.log(req.body);
    idProducto = req.body.idProducto;

    sql = "update Producto set estado = 0 where idproducto = :idProducto";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [idProducto], true);

});

router.post('/confirmarCuenta', async(req, res) => {
    console.log('confirmar cuenta:');
    console.log(req.body);
    correo = req.body.Correo;

    sql = "update Clienteprueba set estado = 1 where correo = :correo";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [correo], true);

});

router.post('/eliminarDeCarrito', async(req, res) => {

    console.log(req.body);
    idProducto = req.body.idProducto;
    idCliente = req.body.idCliente;
    sql = "delete from Carrito where idproducto = :idProducto and idclienteprueba = :idCliente";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [idProducto, idCliente], true);

});


router.post('/actualizarCreditoMas', async(req, res) => {
    console.log('Sumando credito:');
    console.log(req.body);
    idCliente = req.body.IdCliente;
    ganancia = req.body.Ganancia;

    sql = "update Clienteprueba set Credito = Credito + :ganancia where idclienteprueba = :idCliente";

    result = await dbConexion.Connection(sql, [ganancia, idCliente], true);
    res.json({ "msg": 'Se Desconto credito' });
});
router.post('/actualizarCreditoMenosTres', async(req, res) => {
    console.log('Quitando credito:');
    console.log(req.body);
    idCliente = req.body.IdCliente;
    ganancia = req.body.Ganancia;

    sql = "update Clienteprueba set Credito = Credito - :ganancia where idclienteprueba = :idCliente";

    result = await dbConexion.Connection(sql, [ganancia, idCliente], true);
    res.json({ "msg": 'Se Desconto credito' });
});
router.post('/actualizarCreditoMenos', async(req, res) => {
    console.log('Quitando credito:');
    console.log(req.body);
    idCliente = req.body.idCliente;
    ganancia = req.body.ganancia;

    sql = "update Clienteprueba set credito = :ganancia where idclienteprueba = :idCliente";

    result = await dbConexion.Connection(sql, [ganancia, idCliente], true);
    // res.json({ "msg": 'Se Desconto credito' });
});

router.post('/actualizarCreditoMenosDos', async(req, res) => {
    console.log('Quitando credito:');
    console.log(req.body);
    idCliente = req.body.IdCliente;
    ganancia = req.body.Ganancia;

    sql = "update Clienteprueba set Pais = :ganancia where idclienteprueba = :idCliente";

    result = await dbConexion.Connection(sql, [ganancia, idCliente], true);
    res.json({ "msg": 'Se Desconto credito' });
});



router.post('/agregarSubtotal', async(req, res) => {
    console.log(req.body);
    subtotal = req.body.Subtotal;
    idCarrito = req.body.CarritoId;

    sql = "update Carrito set subtotal = :subtotal where idcarrito = :idCarrito";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [subtotal, idCarrito], true);
    res.json({ "msg": 'Se agrego subtotal' });

});

// vaciando todo el carrito 
router.post('/vaciarCarrito', async(req, res) => {
    console.log('vaciando carrito');
    console.log(req.body);
    idCliente = req.body.IdCliente;


    sql = "delete from Carrito where idclienteprueba = :idCliente";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [idCliente], true);
    res.json({ "msg": 'Se vacio el carrito' });

});

// vaciando solo 1 item de carrito

router.post('/vaciarItemCarrito', async(req, res) => {
    console.log(req.body);
    idCliente = req.body.IdCliente;
    idProducto = req.body.IdProducto;

    sql = "delete from Carrito where idclienteprueba = :idCliente and idProducto = :idProducto";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [idCliente, idProducto], true);
    res.json({ "msg": 'Se vacio el carrito' });

});

router.post('/insertarVenta', async(req, res) => {
    // console.log('Bloqueando producto:');
    console.log(req.body);
    idProducto = req.body.idProducto;
    idPropietario = req.body.idPropietario;
    cantidad = req.body.cantidad;

    sql = "insert into venta(idproducto, idpropietario, cantidad) values (:idProducto, :idPropietario, :cantidad) ";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [idProducto, idPropietario, cantidad], true);
    res.json({ "msg": 'Se agrego a venta' });
});

router.post('/insertarSalachat', async(req, res) => {
    // console.log('Bloqueando producto:');
    console.log(req.body);
    idVendedor = req.body.IdVendedor;
    idComprador = req.body.IdComprador;
    idSala = req.body.IdSala;
    foto = req.body.Foto;
    nombre = req.body.Nombre;

    sql = "insert into Salachat(idVendedor, idComprador, idSala, foto, nombrecomprador) values (:idVendedor, :idComprador, :idSala, :foto, :nombre) ";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [idVendedor, idComprador, idSala, foto, nombre], true);
    res.json({ "msg": 'Se agrego a salachat' });
});

router.post('/getSalaChat', async(req, res) => {
    console.log('Objeto entrando a sala: ');
    console.log(req.body)
    idSala = req.body.IdSala;

    sql = "Select idSala from Salachat where idSala = :idSala";

    let result = await dbConexion.Connection(sql, [idSala], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "idSala": us[0],

        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.post('/getSalasVendedor', async(req, res) => {
    console.log('Objeto entrando a vendedor: ');
    console.log(req.body)
    idVendedor = req.body.IdVendedor;

    sql = "Select * from Salachat where idVendedor = :idVendedor";

    let result = await dbConexion.Connection(sql, [idVendedor], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "idSalaChat": us[0],
            "idComprador": us[1],
            "idVendedor": us[2],
            "idSala": us[3],
            "foto": us[4],
            "comprador": us[5]

        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.post('/getUsuarioTotal', async(req, res) => {
    console.log(req.body);
    idUsr = req.body.IdUsuario;
    sql = "Select * from Clienteprueba where idClienteprueba = :idUsr ";

    let result = await dbConexion.Connection(sql, [idUsr], false);
    User = [];
    result.rows.map(us => {
            let UserSchema = {
                "Id": us[0],
                "Nombre": us[1],
                "Apellido": us[2],
                "Fecha": us[3],
                "Correo": us[4],
                "Pass": us[5],
                "Imagen": us[6],
                "Pais": us[7],
                "Credito": us[8],
                "Estado": us[9]
            }
            User.push(UserSchema);
        })
        //  console.log(User);
    res.json(User);
});

/* REPORTES ADMIN */

router.get('/consultaUno', async(req, res) => {

    sql = "select producto.nombre as producto, clienteprueba.nombre as propietario, sum(venta.cantidad)as total from venta inner join producto on producto.idproducto = venta.idproducto inner join clienteprueba on clienteprueba.idclienteprueba = venta.idpropietario WHERE rownum <= 10 group by producto.nombre, clienteprueba.nombre order by total desc";

    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Producto": us[0],
            "Propietario": us[1],
            "Total": us[2]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.get('/reporteDos', async(req, res) => {

    sql = `select producto.nombre, clienteprueba.nombre as propietario, sum(megusta) as cantidad_megusta 
    from producto
    inner join clienteprueba on clienteprueba.idclienteprueba = producto.idclienteprueba
    WHERE rownum <= 10
    group by producto.nombre, clienteprueba.nombre
    order by cantidad_megusta desc`;

    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Nombre": us[0],
            "Propietario": us[1],
            "CantidadMegusta": us[2]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.get('/reporteTres', async(req, res) => {

    sql = `select producto.nombre, clienteprueba.nombre as propietario, sum(nomegusta) as cantidad_nomegusta 
    from producto
    inner join clienteprueba on clienteprueba.idclienteprueba = producto.idclienteprueba
    group by producto.nombre, clienteprueba.nombre
    order by cantidad_nomegusta desc`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Nombre": us[0],
            "Propietario": us[1],
            "CantidadNomegusta": us[2]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.get('/reporteCuatroUno', async(req, res) => {

    sql = `select nombre, correo, fecha, credito from clienteprueba 
    WHERE rownum <= 10
    order by credito desc`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Nombre": us[0],
            "Correo": us[1],
            "Fecha": us[2],
            "Credito": us[3]
        }
        User.push(UserSchema);
    })
    res.json(User);
});
router.get('/reporteCuatroDos', async(req, res) => {

    sql = `select nombre, correo, fecha, credito from clienteprueba 
    WHERE rownum <= 10
    order by credito asc`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Nombre": us[0],
            "Correo": us[1],
            "Fecha": us[2],
            "Credito": us[3]
        }
        User.push(UserSchema);
    })
    res.json(User);
});
router.get('/reporteCinco', async(req, res) => {

    sql = `select clienteprueba.nombre, clienteprueba.correo, clienteprueba.fecha, count(denuncia.idclienteprueba) as conteo 
    from denuncia
    inner join clienteprueba on clienteprueba.idclienteprueba =denuncia.idclienteprueba
    WHERE rownum <= 10
    group by clienteprueba.nombre, clienteprueba.correo, clienteprueba.fecha
    order by conteo desc`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Nombre": us[0],
            "Correo": us[1],
            "Fecha": us[2],
            "Conteo": us[3]
        }
        User.push(UserSchema);
    })
    res.json(User);
});
router.get('/reporteSeis', async(req, res) => {

    sql = `select clienteprueba.nombre, clienteprueba.correo, clienteprueba.credito, count(producto.idclienteprueba) as publicaciones from producto
    inner join clienteprueba on clienteprueba.idclienteprueba = producto.idclienteprueba
    WHERE rownum <= 10
    group by clienteprueba.nombre, clienteprueba.correo, clienteprueba.credito
    order by publicaciones desc`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Nombre": us[0],
            "Correo": us[1],
            "Credito": us[2],
            "Publicaciones": us[3]
        }
        User.push(UserSchema);
    })
    res.json(User);
});
router.get('/reporteSiete', async(req, res) => {

    sql = `select clienteprueba.pais, count(clienteprueba.idclienteprueba) as clientes_aqui,
    (
        select count(producto.idproducto) as productosaqui from producto where producto.clientepais = clienteprueba.pais 
    ) as prods,
    sum(clienteprueba.credito) as total_creditos 
    from clienteprueba 
    group by clienteprueba.pais
    order by total_creditos desc`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "Pais": us[0],
            "Clientes": us[1],
            "Productos": us[2],
            "Credito": us[3]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

router.post('/insertarBitacora', async(req, res) => {
    console.log('Bitacoraaaa:');
    console.log(req.body);
    correo = req.body.correo;
    descripcion = req.body.descripcion;
    fecha = req.body.fecha;

    sql = "insert into bitacora(correo, descripcion, fecha) values (:correo, :descripcion, :fecha) ";
    //console.log(sql);
    result = await dbConexion.Connection(sql, [correo, descripcion, fecha], true);
    res.json({ "msg": 'Se agrego a Bitacora la accion' });
});


router.get('/getBitacora', async(req, res) => {

    sql = `select * from bitacora`
    let result = await dbConexion.Connection(sql, [], false);
    User = [];

    result.rows.map(us => {
        let UserSchema = {
            "id": us[0],
            "correo": us[1],
            "descripcion": us[2],
            "fecha": us[3]
        }
        User.push(UserSchema);
    })
    res.json(User);
});

module.exports = router;