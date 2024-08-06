# ATC Dream Match

Aplicación responsive para generar partidos de fútbol entre 2 equipos de 5 jugadores. 

### Tecnologías
- NextJS
- Tailwind CSS
- Typescript
- Context con reducers

### Para levantar el proyecto:
1. Crear el .env.example con las siguientes variables
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_base_url=https://apiv3.apifootball.com
NEXT_PUBLIC_API_key=9a6db0fa750f0dd34c271d9fd791df63b31ae91c3e2fb217eaf3ff9dfbbb4602
NEXT_PUBLIC_country_name=Argentina
```

2. Generar y correr la imagen con Docker:
```sh
docker build -t nextapp .
docker run --name nextapp -p 3000:3000 -d nextapp
```

3. Abrir `localhost:3000` desde el navegador