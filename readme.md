#Documento NOTAS MEAN
## Instalación Software
###Instalar NodeJS v6 en Ubuntu
####Instalar NodeJS y NPM
```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
####Instalar BuildEssential
```bash
sudo apt-get install -y build-essential
```
####Instalar Express
```bash
sudo npm install -g express-generator
```
####Instalar Nodemon
```bash
sudo npm install -g nodemon
```



####Verificar Versiones
```bash
$ node --version
$ npm --version
$ express --version
```

##Creación Proyecto
###Inicializar Proyecto Express
```bash
~/loc8r$ express
```
###Ejecutar NodeJS sobre Proyecto 
```bash
~/loc8r$ npm start
```
###Ejecutar NodeMon (reinicia automáticamente si hay cambios)
```bash
~/loc8r$ nodemon
```

###Cambiar árbol directorios
```bash
~/loc8r$ mkdir -p app_server/models 
~/loc8r$ mkdir p app_server/controllers
~/loc8r$ mv routes app_server
~/loc8r$ mv views app_server
```

En **app.js**
```javascript
var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
```

```javascript
app.set('views', path.join(__dirname, 'app_server','views'));
```


###Separar Controladores y rutas
Crear **app_server/controllers/main.js**
```javascript
/* GET home page */
module.exports.index = function(req, res){
res.render('index', { title: 'Express' });
};
```

Modificar en  **app_server/routes/index.js**
```javascript
var ctrlMain = require('../controllers/main');
/* GET home page. */
router.get('/', ctrlMain.index);
```

###Instalar Bootstrap y Jquery
[Descargar Bootstrap](http://getbootstrap.com)
Descomprimir en **public/bootstrap**

[Descargar Amelia Bootstrap](https://github.com/simonholmes/amelia/blob/master/amelia.bootstrap.min.css)
Guardar en **public/bootstrap/css**

[Descargar Jquery 1.12.4](https://code.jquery.com/jquery-1.12.4.min.js)
Guardar en **public/javascript**

###Enlazar Bootstrap y Jquery

Modificar en  **app_server/views/layout.jade**
```jade
doctype html
html
  head
    meta(name='viewport', content='width=device-width, initial-scale=1.0')
    title= title
    link(rel='stylesheet', href='/bootstrap/css/amelia.bootstrap.min.css')
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
    script(src='/javascripts/jquery-1.12.4.min.js')
    script(src='/bootstrap/js/bootstrap.min.js')
```
