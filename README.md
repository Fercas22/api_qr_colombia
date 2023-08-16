# Eventos QR - Back End

![Node.js](https://img.shields.io/badge/Node.js-v14.17.3-green)
![Express](https://img.shields.io/badge/Express-v4.18.2-blue)
![License](https://img.shields.io/badge/License-ISC-orange)

Back end de un sitio web que gestiona y vende boletos para eventos.

## Descripción

Este proyecto contiene el código del back end de un sitio web que se encarga de gestionar y vender boletos para eventos. Proporciona una API para realizar operaciones como la autenticación de usuarios, gestión de eventos, venta de boletos, entre otras funcionalidades relacionadas.

---

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Fercas22/api_qr_colombia.git

2. Ve al directorio del proyecto
    ```bash
    cd eventos_qr

3. Instala las dependencias
    ```bash
    npm install

---

## Configuración
El proyecto utiliza variables de entorno para la configuración. Asegúrate de crear un archivo `.env` en el directorio raíz del proyecto con la siguiente información:

```env
HOST_DB = host
NAME_DB = database
USER_DB = username
PASS_DB = password
SECRET_JWT = secreto
```

Asegúrate de reemplazar los valores **host**, **database**, **username**, **password** y **secreto** con tus propias configuraciones.

---

## Uso
Para ejecutar el servidor en modo de desarrollo, utiliza el siguiente comando:
  ```bash
  npm run dev
  ```
El servidor estará disponible en http://localhost:3000.

---

## Dependencias
- [**aws-sdk:**](https://www.npmjs.com/package/aws-sdk) SDK de AWS para Node.js.
- [**bcrypt:**](https://www.npmjs.com/package/bcrypt) Librería para el cifrado y comparación de contraseñas.
- [**cors:**](https://www.npmjs.com/package/cors) Middleware para habilitar CORS en Express.
- [**dotenv:**](https://www.npmjs.com/package/dotenv) Cargador de variables de entorno desde archivos .env.
- [**express:**](https://www.npmjs.com/package/express) Infraestructura web rápida, minimalista y - - flexible para Node.js.
- [**express-fileupload:**](https://www.npmjs.com/package/express-fileupload) Middleware para facilitar la carga de archivos en Express.
- [**jsonwebtoken:**](https://www.npmjs.com/package/jsonwebtoken) Implementación de JSON Web Tokens (JWT) para Node.js.
- [**mysql2:**](https://www.npmjs.com/package/mysql2) Conector MySQL para Node.js.
