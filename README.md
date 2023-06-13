# Aplicacion de Encuestas 

Una web con encuestas sobre el uso de redes sociales.

## Estructura del archivo

- database, es la carpeta con todas las consultas sql, puede usar para recrear la base de datos para esta aplicación
- src, es la carpeta con todo el código para la aplicación Backend y Frontend.

### Manual de Instalacion

```
mysql -u MYUSR "-pMYPASSWORD" < ./database/db.sql # create database
npm i
npm run build
npm start
```

Ahora visita http://localhost:4001

## Herramientas

- Nodejs
- Mysql
