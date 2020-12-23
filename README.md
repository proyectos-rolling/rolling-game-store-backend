# RollinGame (Backend)

Aplicación de venta de juegos digitales

## Comenzando

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._ Este es el repositorio del backend. El frontend se encuentra en el siguiente repositorio: [rolling-game-store](https://github.com/proyectos-rolling/rolling-game-store)

Mira [**Deployment BACK**](https://github.com/proyectos-rolling/rolling-game-store-backend#deploymet-back) para conocer como desplegar el proyecto de la parte del back.

### Pre-requisitos

_Descargar tanto este repositorio como el del [frontend](https://github.com/proyectos-rolling/rolling-game-store) y completar los pasos de instalacion FrontEnd y Backend_

nodejs
consola para comandos

## Instalación BackEnd

_Clonar el repositorio o descargarlo_

```bash
$ git clone git@github.com:proyectos-rolling/rolling-game-store-backend.git
```

_Abrir la carpeta `rolling-game-store-backend` en la consola_

```bash
$ cd rolling-game-store-backend
```

_Ejecutar NPM Install para instalar las dependencias necesesarias_

```bash
$ npm i
```

_Crear un archivo `.env`_

```bash
$ touch .env
```

_Editar el archivo `.env` con las variables necesarias. A continuación se deja un ejemplo de un archivo `.env` con todas las variables necesarias del proyecto listas para completar_

```
NODE_ENV=development

# Puerto en el que se ejecutará el server del back por ejemplo PORT=4000
PORT=

# URI de conexión a una DB de mongo
DB_MONGO=

# Usuario y contraseña de una cuenta de gmail para el formulario de contacto
GMAIL_USER=
GMAIL_PASS=

# Access token de MercadoPago Para el checkout de los juegos
MP_ACCESS_TOKEN=
```


_Ejecutar el servidor del back_

```bash
$ node index.js
```

## Demo

Se puede ver una demo funcional del proyecto en https://rolling-game-store.herokuapp.com/

## Deployment Back

La demo se encuentra deployada usando la funcionalidad de Heroku de integración con un repositorio de github, con deploys automáticos cuando se hace un push a la rama main.

## Construido con

_Back_

* [NodeJs](https://nodejs.org/es/)
* [ExpressJS](https://expressjs.com/es/)

- [ExpressValidator](https://express-validator.com/)
- [mercadopago](https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-pro/integration)
- [mongoose](https://mongoosejs.com/)
- [nodemailer](
