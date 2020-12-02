const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/db');

router.post('/compra1/',(req,res)=>{
  const {nombre,cedula,correo,direccion} = req.body;
  let compraProducto = [nombre,cedula,correo,direccion];
  let nuevoCompra = `INSERT INTO compra(nombre_producto,costo,cod_producto,fecha,nombre,cedula,correo,direccion) 
  VALUES('Tapabocas','1000','84467','2020-12-02',?,?,?,?)`;
  mysqlConnection.query(nuevoCompra, compraProducto, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message:`Has realizado una nueva compra`, })
    });
  });  

  router.get('/compra1/:cod_compra', (req, res) => {
    const { cod_compra } = req.params;
 mysqlConnection.query('SELECT * FROM compra WHERE cod_compra = ?',[cod_compra], (err, rows, fields) => {
     if (!err) {
       res.json(rows[0]);
     } else {
       console.log(err);
     }
   });
 });
    
    router.get('/compra1', (req, res) => {
      mysqlConnection.query('SELECT * FROM compra ', (err, rows, fields) => {
          if (!err) {
            res.json(rows);
          } else {
            console.log(err);
          }
        });
      });   

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

router.post('/',(req,res)=>{
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
          res.json(rows[0]);
        } else {
          console.log(err);
        }
      });
    });

router.put('/actualizar-contrasena/:id', (req, res) => {
  const {contrasena} = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE usuario SET contraseña = ? WHERE usuario.id_usuario = 11`, 
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

function newFunction() {
  return require('../db/db');
}
