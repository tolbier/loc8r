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
npm install -g nodemon
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

###Cambiar arcbol directorios
```bash
~/loc8r$ mkdir -p app_server/models 
~/loc8r$ mkdir p app_server/controllers
~/loc8r$ mv routes app_server
~/loc8r$ mv views app_server
```

En app.js
```javascript
var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
```

```javascript
app.set('views', path.join(__dirname, 'app_server','views'));
```



