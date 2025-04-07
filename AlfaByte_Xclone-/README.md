# AlfaByte_Xclone
**Nombre de la Materia:** Electiva 2  
**Nombre del Proyecto:** AlfaByte_Xclone  
**Equipo:** Equipo Alfa  

**Integrantes:**  
* Anthony Arango Restrepo  
* María José Velasquez  
* Emanuel Rico Mariaca  

**Descripción:**  
*El objetivo principal es crear una plataforma donde los usuarios puedan registrarse, iniciar sesión, publicar tweets, seguir a otros usuarios y ver los tweets de sus seguidores.*

**Requerimientos:**
* Node.js para el desarrollo del backend.
* Mongoose cómo ODM para manejar la base de datos MongoDB.
* Jest para pruebas unitarias y cobertura de código.
* Git para control de versiones, siguiendo buenas prácticas como el uso de ramas, commits descriptivos y pull requests.
* bcrypt Cifrado de contraseñas para asegurar los datos sensibles de los usuarios.
* dotenv Manejo de variables de entorno para configuraciones sensibles como claves y credenciales.
* express-validator Middleware para validar y sanitizar los datos de entrada de los usuarios.
* express Framework web para Node.js que facilita la creación de APIs REST y manejo de rutas HTTP.
* jsonwebtoken  Librería para autenticación de usuarios mediante tokens JWT.
* node-mocks-http  Herramienta para simular solicitudes y respuestas HTTP en pruebas unitarias.
* socket.io Comunicación en tiempo real entre el cliente y servidor para actualizaciones instantáneas.

**Instrucciones de compilación y ejecución:**
1. Clonar el repositorio: https://github.com/ricomariaca/AlfaByte_Xclone-
2. Ejecutar `npm install` para instalar las dependencias necesarias. 
4. Ejecutar `npm run coverage` para ver el resultado de las pruebas.
5. Descargar MongoCompass y ejecutarlo
6. Ingresar MongoAtlas, solicitar al equipo del proyecto que te dé acceso a la DB
7. Agregar la ip al proyecto para que te deje conectarte a la DB
8. Confirar la dirección del compas mongodb+srv://[MONGO_ATLAS_DB_USER]:[MONGO_ATLAS_DB_PASSWORD]@databasesx.silq0.mongodb.net/
9. Solicitar la contraseña y usuario de acceso
10. Ejecutar `npm run dev` para iniciar la aplicación.
