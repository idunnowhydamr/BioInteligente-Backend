const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/db');

router.post('/registro/',(req,res)=>{
const {nombre,correo,contraseña} = req.body;
let cliente = [nombre,correo,contraseña];

let nuevoCliente = `INSERT INTO usuario(nombre,correo,contraseña)
                  VALUES(?,?,?)`;
mysqlConnection.query(nuevoCliente, cliente, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Cliente Registrado`, })
  });
});  

router.post('/login/',(req,res)=>{
  const {correo,contraseña} = req.body;
  let iniciarsesion = [correo,contraseña];
  let login = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";

  mysqlConnection.query(login, iniciarsesion, (err, results, fields) => {
    if (err) {
      res.send({err:err});
    } 
      if (results.length>0){
        res.send(results)
        // res.send({ message:`El Cliente ha iniciado Sesion Correctamente`,})
      }else{
        res.send({message: `Correo y/o Contraseña incorrecto`})
      }
    });
});

router.post('/bodega/',(req,res)=>{
  const {cod_compra,nombre_producto, costo, id_usuario, cod_producto } = req.body;
  let almacenamiento = [cod_compra,nombre_producto, costo, id_usuario, cod_producto];
  let almabodega = `INSERT INTO producto(cod_compra,nombre_producto, costo, id_usuario, cod_producto)VALUES(?,?,?)`;
  mysqlConnection.query(almabodega, almacenamiento, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message:`Producto Registrado y almacenado con Exito!`, })
    });
});

router.get('/bodega', (req, res) => {
  mysqlConnection.query('SELECT * FROM producto ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
  
  router.get('/bodega/:cod_producto', (req, res) => {
    const { cod_producto } = req.params;
    mysqlConnection.query('SELECT * FROM producto WHERE cod_producto = ? ',[cod_producto], (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      });
    });


router.get('/clientes', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });

  router.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM usuario WHERE id_usuario = ? ',[id], (err, rows, fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      });
    });

router.put('/actualizar-contrasena/:id', (req, res) => {
  const {contrasena} = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE usuario SET contraseña = ? WHERE usuario.id_usuario = ?`, 
  [contrasena,id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Contraseña actualizado'});
    } else {
      console.log(err);
    }
  // res.send(contrasena);
});
});

router.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id_usuario = ?',
   [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Cliente eliminado!'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;