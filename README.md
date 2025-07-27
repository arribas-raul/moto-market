# MotoMarket

Una aplicación web para ver y gestionar un catálogo de motocicletas con funcionalidades de visualización, mapas y citas.

## Características

- Lista y detalle de motocicletas
- Cálculo automático del precio de reventa
- Mapas interactivos con ubicaciones
- Sistema de citas
- Soporte multiidioma (español/inglés)
- Diseño responsivo

## Requisitos

- Node.js (versión 16 o superior)
- Angular CLI (versión 17)

## Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd moto-market
```

2. Instala las dependencias:
```bash
npm install
```

## Desarrollo

Para ejecutar en modo desarrollo:
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Construcción

Para crear una versión de producción:
```bash
ng build
```

Los archivos generados se guardarán en la carpeta `dist/`

## Despliegue

### Servidor web estático
1. Ejecuta `ng build` para generar los archivos
2. Copia el contenido de `dist/moto-market/` a tu servidor web
3. Configura el servidor para redirigir todas las rutas al archivo `index.html`

## Tecnologías utilizadas

- Angular 17
- Bootstrap 5
- Leaflet (mapas)
- ngx-translate (internacionalización)
