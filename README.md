# Manual de usuario - Gorchitech
https://drive.google.com/file/d/1DvCQImRLz7CCbogMxJnNfT_Ie1LyFLQh/view?usp=sharing
# Documentación técnica - Gorchitech

Este archivo readme proporciona información sobre los requisitos, tecnologías utilizadas, estructura de carpetas y detalles sobre cómo ejecutar, construir y realizar pruebas en la aplicación. También se incluyen instrucciones sobre cómo contribuir al proyecto utilizando ramas, problemas (issues) y fusiones (merges).

## Requisitos

Asegúrate de tener instalados los siguientes requisitos antes de continuar:

- GO
- Docker
- Docker-compose
- Node.js
- npm
- Angular CLI
- Sqlite

## Tecnologías utilizadas

La aplicación utiliza las siguientes tecnologías:

- Angular: Un framework de desarrollo de aplicaciones web en TypeScript.
- GO: Un lenguaje de programación de código abierto para construir aplicaciones escalables y de alto rendimiento.
- Docker: Una plataforma que permite crear, implementar y ejecutar aplicaciones en contenedores.
- PocketBase: Una base de datos SQLite de bolsillo para desarrollo y pruebas.

## Estructura de carpetas

La estructura de carpetas de la aplicación es la siguiente:

gorchitech (directorio backend)
- helpers (directorio)
- hooks (directorio)
- migrations (directorio)
- types (directorio)
- README.md
- gorchitech
- gorchitech.go

frontend (directorio principal)
- src (directorio)
- app (directorio)
- components (directorio)
- core (directorio)
- dashboard (directorio)
- layouts (directorio)
- app-routing.module.ts
- app.component.html
- app.component.scss
- app.component.ts
- app.module.ts
- demo-flexy-module.ts
- assets (directorio)
- environments (directorio)
- favicon.ico
- index.html
- main.ts
- polyfills.ts
- styles.scss
- test.ts
- .gitignore
- .npmrc
- angular.json
- karma.conf.js
- package-lock.json
- package.json
- tsconfig.app.json
- tsconfig.json
- tsconfig.spec.json


## Ejecución y construcción de GO

Sigue los pasos a continuación para ejecutar y construir la aplicación en GO:

1. Clona el repositorio desde GitHub.
2. Abre una terminal y navega hasta el directorio `gorchitech`.
3. Ejecuta el siguiente comando para construir la aplicación en GO:

```
go build
```

4. A continuación, ejecuta el siguiente comando para ejecutar la aplicación en GO:

```
go run gorchitech.go
```


## Ejecución y construcción de Angular

Sigue los pasos a continuación para ejecutar y construir la aplicación en Angular:

1. Clona el repositorio desde GitHub.
2. Abre una terminal y navega hasta el directorio `frontend`.
3. Ejecuta el siguiente comando para instalar las dependencias de Node.js:

```
npm install
```

4. A continuación, ejecuta el siguiente comando para iniciar la aplicación Angular:

```
ng serve
```


Una vez completados estos pasos, la aplicación estará en funcionamiento y podrás acceder a ella a través de tu navegador web en la dirección `http://localhost:4200`.

## Pruebas en GO

Para ejecutar las pruebas en GO, sigue estos pasos:

1. Asegúrate de haber seguido los pasos anteriores para construir y ejecutar la aplicación en GO.
2. Abre una terminal y navega hasta el directorio `gorchitech`.
3. Ejecuta el siguiente comando para ejecutar las pruebas en GO:

```
go test ./...
```

Esto ejecutará las pruebas unitarias para la aplicación en GO.

## Contribución al proyecto

Si deseas contribuir al proyecto, sigue las siguientes pautas:

- Utiliza ramas (`branches`) para trabajar en nuevas características o solucionar problemas.
- Crea problemas (`issues`) para describir las tareas, mejoras o errores que se abordarán.
- Utiliza fusiones (`merges`) para combinar tus cambios en la rama principal (`master`) una vez que hayas completado tu trabajo en una rama de características.
- Asegúrate de comentar y documentar adecuadamente tu código para facilitar la revisión y comprensión de los cambios propuestos.

¡Gracias por contribuir a nuestro proyecto! Esperamos recibir tus aportes en forma de ramas y problemas (issues).


