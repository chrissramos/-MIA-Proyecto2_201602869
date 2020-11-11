
create table Clienteprueba(
    idClienteprueba int,
    nombre varchar2(200),
    apellido varchar2(200),
    fecha varchar2(200),
    correo varchar2(200),
    pass varchar2(200),
    imagen varchar2(200),
    pais varchar2(200),
    PRIMARY KEY (idClienteprueba)
);

create SEQUENCE idClienteprueba start with 1 increment by 1 order;

create or replace trigger autoidventa
before insert on Clienteprueba
for each row
begin
  select idClienteprueba.nextval into :new.idClienteprueba from dual;
end;



insert into Clienteprueba (nombre, apellido, fecha, correo, pass, imagen, pais) values ('Randall', 'Ramos', '10/10/10', 'randall@gmail.com', '123456', 'assets/img/img2.png', 'Guatemala');

insert into Clienteprueba (nombre, apellido, fecha, correo, pass, imagen, pais) values ('Juan', 'Pelaez', '12/12/12', 'juan@gmail.com', '123456', 'assets/img/img2.png', 'Guatemala');
insert into Clienteprueba (nombre, apellido, fecha, correo, pass, imagen, pais) values ('Edward', 'Gomez', '07/08/99', 'edgom@gmail.com', '123456', 'assets/img/img2.png', 'Guatemala');
Insert into Clienteprueba(nombre, apellido, fecha, correo, pass, imagen, pais) 
values('Bugs' , 'Bunny' , '15/12/1989' , 'bugs@gmail.com' , 'f6882e63875336f33b3866442386a199' , 
'https://firebasestorage.googleapis.com/v0/b/fir-fotos-f7c8b.appspot.com/o/img%2Fmicrosoftsurfacepro-768x512.jpg?alt=media&token=3f107c7e-71b5-4290-b986-95f87c548864' , 'Alaska');
insert into Clienteprueba (nombre, apellido, fecha, correo, pass, imagen, pais) values ('admin', 'admin', '12/12/12', 'admin@gmail.com', '', 'assets/img/img2.png', 'Guatemala');
set define off

select * from Clienteprueba where apellido = 'Ramos' ;

Select * from Clienteprueba where correo = 'randall@gmail.com';

ALTER table Clienteprueba add credito int ;

SELECT UTL_INADDR.get_host_address from dual;

create table Producto(
    idProducto int,
    nombre varchar2(200),
    descripcion varchar2(200),
    precio varchar2(200),
    palabrasClaves varchar2(200),
    imagen varchar2(200),
    megusta int,
    nomegusta int,
    estado int,
    categoria varchar2(200),
    idClienteprueba int,
    PRIMARY KEY (idProducto),
    foreign key(idClienteprueba) references Clienteprueba(idCLientePrueba)
);


create SEQUENCE idProducto start with 1 increment by 1 order;
create or replace trigger autoidproducto
before insert on Producto
for each row
begin
  select idProducto.nextval into :new.idProducto from dual;
end;

insert into Producto (nombre, descripcion, precio, palabrasClaves, imagen, megusta, nomegusta, estado, idClienteprueba) 
values ('Huawei Y6', 'Telefono con 6GB de Ram, 64GB de memoria interna, Android 10.1, Triple Camara, doble sim y esta liberado para todo mundo'
  ,'1750', 'Telefono Huawei Android', 'aqui va la imagen', '12', '4',1, 1);

select * from Producto where idclienteprueba = 11;
DELETE  from Producto where idproducto = 1 ;

select * from clienteprueba
DELETE  from Clienteprueba where idclienteprueba  = 10 ;

create table comentario(
    idComentario int,
    comentario varchar2(200),
    fecha varchar2(200),
    idClienteprueba int,
    idProducto int,
    PRIMARY KEY (idComentario),
    foreign key(idClienteprueba) references Clienteprueba(idCLientePrueba),
    foreign key(idProducto) references Producto(idProducto)
);

create SEQUENCE idComentario start with 1 increment by 1 order;
create or replace trigger autoidcomentario
before insert on comentario
for each row
begin
  select idComentario.nextval into :new.idComentario from dual;
end;

insert into comentario(comentario, fecha, idClienteprueba, idProducto) values ('comentario de prueba', '12/12/12', 1, 1);

select * from comentario


create table Denuncia(
    idDenuncia int,
    comentario varchar2(200),
    fecha varchar2(200),
    idClienteprueba int,
    idProducto int,
    PRIMARY KEY (idDenuncia),
    foreign key(idClienteprueba) references Clienteprueba(idClienteprueba),
    foreign key(idProducto) references Producto(idProducto)
);

drop table Denuncia
create SEQUENCE idDenuncia start with 1 increment by 1 order;
create or replace trigger autoiddenuncia
before insert on Denuncia
for each row
begin
  select idDenuncia.nextval into :new.idDenuncia from dual;
end;

select * from Producto

insert into comentario(comentario, fecha, idClienteprueba, idProducto) values ('comentario de prueba', '12/12/12', 11, 5);

select * from Comentario;



create table Megusta(
    idMegusta int,
    idClienteprueba int,
    idProducto int,
    PRIMARY KEY (idMegusta),
    foreign key(idClienteprueba) references Clienteprueba(idClienteprueba),
    foreign key(idProducto) references Producto(idProducto)
);

create SEQUENCE idMegusta start with 1 increment by 1 order;

create or replace trigger autoidmegusta
before insert on Megusta
for each row
begin
  select idMegusta.nextval into :new.idMegusta from dual;
end;

create table Nomegusta(
    idNomegusta int,
    idClienteprueba int,
    idProducto int,
    PRIMARY KEY (idNomegusta),
    foreign key(idClienteprueba) references Clienteprueba(idClienteprueba),
    foreign key(idProducto) references Producto(idProducto)
);

create SEQUENCE idNomegusta start with 1 increment by 1 order;

create or replace trigger autoidnomegusta
before insert on Nomegusta
for each row
begin
  select idNomegusta.nextval into :new.idNomegusta from dual;
end;


select * from producto

select * from megusta

insert into megusta(idclienteprueba, idproducto) values(11,5);

select count(idclienteprueba) as Existe from megusta where idclienteprueba = 11 and idproducto = 5; 

update Producto set nomegusta = 0

truncate table nomegusta;


create table Carrito(
    idCarrito int,
    idClienteprueba int,
    idProducto int,
    PRIMARY KEY (idCarrito),
    foreign key(idClienteprueba) references Clienteprueba(idClienteprueba),
    foreign key(idProducto) references Producto(idProducto)
);

create SEQUENCE idCarrito start with 1 increment by 1 order;

create or replace trigger autoidcarrito
before insert on Carrito
for each row
begin
  select idCarrito.nextval into :new.idCarrito from dual;
end;


select * from comentario;

delete from comentario where idcomentario = 6

 -- consulta para nombre de quien hizo el comentario  
Select comentario.comentario, comentario.fecha, clienteprueba.nombre from Comentario 
inner join clienteprueba on clienteprueba.idclienteprueba = comentario.idclienteprueba where idProducto = 5;



-- consulta para carrito de compras

select Producto.nombre, Producto.descripcion, Producto.precio, Producto.imagen, Carrito.idclienteprueba , carrito.subtotal 
from Carrito 
inner join Producto on Producto.idProducto = carrito.idProducto 
where Carrito.idclienteprueba  = 11



select * from clienteprueba

update Carrito set subtotal = 0 where idclienteprueba = 11  and idproducto = 5

alter table carrito add subtotal int;

update Carrito set subtotal = 0 where idcarrito = 8

select * from denuncia 

select * from producto



create table Categoria(
    idCategoria int,
    categoria varchar2(200),
    PRIMARY KEY (idCategoria)
);

create SEQUENCE idCategoria start with 1 increment by 1 order;

create or replace trigger autoidcategoria
before insert on Categoria
for each row
begin
  select idCategoria.nextval into :new.idCategoria from dual;
end;

insert into categoria(categoria) values('Laptop');


select * from clienteprueba;

select * from categoria


update producto set megusta = 0 where idproducto = 3

select producto.idproducto, producto.nombre, producto.descripcion, producto.precio, producto.palabrasclaves, producto.megusta, producto.nomegusta, producto.idclienteprueba, producto.imagen, categoria.categoria 
from producto inner join categoria on categoria.idcategoria = producto.categoria

select * from clienteprueba

select * from Denuncia

/* DENUNCIAS */
-- para denuncias 

select Denuncia.idproducto, Denuncia.comentario, denuncia.fecha, clienteprueba.correo as denunciante, producto.nombre, producto.imagen, producto.descripcion, producto.precio, 
( select clienteprueba.idclienteprueba from Producto 
inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idclienteprueba 
where producto.idproducto = denuncia.idproducto
) as idpropietario , 

(select clienteprueba.correo from Producto  
inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idclienteprueba  where producto.idproducto = denuncia.idproducto ) as correopropietario 

from denuncia 
inner join clienteprueba on clienteprueba.idclienteprueba = denuncia.idclienteprueba 
inner join producto on producto.idproducto = denuncia.idproducto;

// denunciante   13   Amelio  randall.saucedo@gmail.com
// propietario   12   Randall randall@gmail.com


select * from producto

update Producto set estado =1 where idProducto = 10

alter table Clienteprueba add estado int;

update Clienteprueba set estado = 1 where idclienteprueba = 17;

select * from carrito


update carrito set subtotal = 0 where idclienteprueba = 16;


-- mejorar el carrito
select Producto.idProducto, Producto.nombre, Producto.descripcion, Producto.precio, Producto.imagen, Producto.idclienteprueba, Carrito.idclienteprueba , carrito.subtotal, carrito.idcarrito 
from Carrito 
inner join Producto on Producto.idProducto = carrito.idProducto 
where Carrito.idclienteprueba = 16

/* VENTAA */
create table Venta(
    idVenta int,
    idProducto int,
    idPropietario int,
    cantidad int,
    PRIMARY KEY (idVenta),
    foreign key (idProducto) references Producto(idProducto),
    foreign key (idPropietario) references Clienteprueba(idClienteprueba)
);

create SEQUENCE idVenta start with 1 increment by 1 order;

create or replace trigger autoidventaapp
before insert on Venta
for each row
begin
  select idVenta.nextval into :new.idVenta from dual;
end;

select * from clienteprueba

select * from venta

truncate table venta


update Clienteprueba set Pais = 'Japon' where idclienteprueba = 16   


/* DENUNCIAS */
-- para denuncias 

select Denuncia.idproducto, Denuncia.comentario, denuncia.fecha, clienteprueba.correo as denunciante, producto.nombre, producto.imagen, producto.descripcion, producto.precio, 
( select clienteprueba.idclienteprueba from Producto 
inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idclienteprueba 
where producto.idproducto = denuncia.idproducto
) as idpropietario , 

(select clienteprueba.correo from Producto  
inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idclienteprueba  where producto.idproducto = denuncia.idproducto ) as correopropietario 

from denuncia 
inner join clienteprueba on clienteprueba.idclienteprueba = denuncia.idclienteprueba 
inner join producto on producto.idproducto = denuncia.idproducto;

/* CARITO */

select Producto.idProducto, Producto.nombre, Producto.descripcion, Producto.precio, Producto.imagen, Producto.idclienteprueba, Carrito.idclienteprueba , carrito.subtotal, carrito.idcarrito, (select clienteprueba.correo from Producto inner join clienteprueba on clienteprueba.idclienteprueba = Producto.idClienteprueba where producto.idproducto = carrito.idProducto ) as correopropietario from Carrito inner join Producto on Producto.idProducto = carrito.idProducto where Carrito.idclienteprueba  = 16;
    
select * from venta

truncate table venta


select idclienteprueba, correo, nombre, credito, pais from clienteprueba

update Clienteprueba set credito = 10000 where idclienteprueba = 16


/* vaciando carrito */

select * from carrito where idclienteprueba = 16
select * from producto

delete from producto where idproducto = 17;


select * from carrito

truncate table carrito
delete from carrito where idclienteprueba = 16 and idproducto = 22 

/* VENTAA */
create table Salachat(
    idSalachat int,
    idComprador int,
    idVendedor int,
    idSala int,
    PRIMARY KEY (idSalachat)    
);

create SEQUENCE idSalachat start with 1 increment by 1 order;

create or replace trigger autoidsalachat
before insert on Salachat
for each row
begin
  select idSalachat.nextval into :new.idSalachat from dual;
end;

select * from Salachat where idSala = 1613 ;

 select * from Salachat where idvendedor = 16;
 
 truncate table Salachat
 
 select * from clienteprueba     
 
 alter table Salachat add nombrecomprador VARCHAR2(200);
 
 update Clienteprueba set pass = 10000 where correo = 16


/* CONSULTAS ADMIN */

/* REPORTE 1 top 10 productos mas vendidos*/

select * from venta /* 8 resultados*/

select producto.nombre as producto, clienteprueba.nombre as propietario, sum(venta.cantidad)as total 
from venta inner join producto on producto.idproducto = venta.idproducto 
inner join clienteprueba on clienteprueba.idclienteprueba = venta.idpropietario WHERE rownum <= 10 group by producto.nombre, clienteprueba.nombre order by total desc 


/*Reporte 2  Top 10 de productos con mas me gusta */

select producto.nombre, clienteprueba.nombre as propietario, sum(megusta) as cantidad_megusta 
from producto
inner join clienteprueba on clienteprueba.idclienteprueba = producto.idclienteprueba
WHERE rownum <= 10
group by producto.nombre, clienteprueba.nombre
order by cantidad_megusta desc

/*Reporte 3 top 10 menos me gusta*/

select producto.nombre, clienteprueba.nombre as propietario, sum(nomegusta) as cantidad_nomegusta 
from producto
inner join clienteprueba on clienteprueba.idclienteprueba = producto.idclienteprueba

group by producto.nombre, clienteprueba.nombre
order by cantidad_nomegusta desc

select nombre, nomegusta from producto

/* reporte 4 AGREGAR EL MENOS CREDITO DESC  Reporte 4 top 10 clientes con mas y menos credito*/

select nombre, correo, fecha, credito from clienteprueba 
WHERE rownum <= 10
order by credito desc   

/*Reporte 5 top 10 clientes que mas denuncias han hecho*/

select clienteprueba.nombre, clienteprueba.correo, clienteprueba.fecha, count(denuncia.idclienteprueba) as conteo 
from denuncia
inner join clienteprueba on clienteprueba.idclienteprueba =denuncia.idclienteprueba
WHERE rownum <= 10
group by clienteprueba.nombre, clienteprueba.correo, clienteprueba.fecha
order by conteo desc


/* reporte 6 top 10 clientes que mas productos han publicado*/

select clienteprueba.nombre, clienteprueba.correo, clienteprueba.credito, count(producto.idclienteprueba) as publicaciones from producto
inner join clienteprueba on clienteprueba.idclienteprueba = producto.idclienteprueba
WHERE rownum <= 10
group by clienteprueba.nombre, clienteprueba.correo, clienteprueba.credito
order by publicaciones desc



/* REPORTE 7 Top 10 de países con más crédito y productos a la venta
    // PAIS 
    // Cuantos clientes en ese pais
    // cuanto credito en ese pais
    // cuantos productos en ese pais
*/

select clienteprueba.pais, count(clienteprueba.idclienteprueba) as clientes_aqui,
(
    select count(producto.idproducto) as productosaqui from producto where producto.clientepais = clienteprueba.pais 
) as prods,
sum(clienteprueba.credito) as total_creditos 
from clienteprueba 
group by clienteprueba.pais
order by total_creditos desc;





/*ORDENAMIENTO DE PRODUCTOS*/
select * from producto where estado = 1

select idproducto, nombre, descripcion,  cast(precio as int) as precio, palabrasclaves, imagen, megusta, nomegusta, categoria, idclienteprueba 
from producto where estado = 1
order by precio desc 

select nombre, palabrasclaves from producto where estado = 1;
select nombre, palabrasclaves from producto where estado = 1 and palabrasclaves like '%telefono%'


/*Bitacora 
    - correo del cliente
    - descripcion de que hizo
    - fecha que se realizo 
    
    y se podra ordenar de forma asc o desc por fechas xD
*/


create table Bitacora(
    idBitacora int,
    correo varchar2(200),
    descripcion varchar2(200),
    fecha varchar2(200),
    PRIMARY KEY (idBitacora)    
);

create SEQUENCE idBitacora start with 1 increment by 1 order;

create or replace trigger autoidbitacora
before insert on Bitacora
for each row
begin
  select idBitacora.nextval into :new.idBitacora from dual;
end;


select * from bitacora
truncate table bitacora








 