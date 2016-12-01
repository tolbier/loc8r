

# ${projectname}



## Usage



## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
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

####Instalar Foreman
```bash
sudo gem install foreman
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

Borrar Contenidos de hoja de estilo por defecto
```bash
~/loc8r$ cat /dev/null > public/stylesheets/style.css
```

###Comprobar resultado en Web
####Ejecutar NodeJS 
```bash
~/loc8r$ npm start
```
Visitar [Web Proyecto](http://localhost:3000)


##Creación Proyecto Heroku

Obtener Versión NPM y node
```bash
~/loc8r$ node --version
~/loc8r$ npm --version
```

Cambiar versiones de engines en package.json
```javascript
"engines": {
"node": "~4.2.1",
"npm": "~2.2.0"
}
```

Create File : ~/loc8r/Procfile
```bash
web: npm start
```

Chequear Heroku instalación Localmente (Foreman)
```bash
~/loc8r$ foreman start
```
Esto ejecutará el servidor en puerto localhost:5000

###Loguear en Heroku
```bash
~/loc8r$ heroku login
```
Introducir email y contraseña

###Crear Proyecto en Heroku
Sólo la primera vez
```bash
~/loc8r$ heroku create
```

###Push Proyecto en Heroku
con git en branch master
```bash
~/loc8r$ git push heroku master
```

###Asignar un Dyno Heroku al proyecto
```bash
~/loc8r$ heroku ps:scale web=1
```

###Ver web
```bash
~/loc8r$ heroku open
```

