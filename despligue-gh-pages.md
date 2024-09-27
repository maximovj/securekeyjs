# Como desplegar en GitHub Pages usando `gh-pages`

- Paso 1)

Instalar todas las dependencias de npm.

```shell
$ pnpm install 
```

- Paso 2)

Construir el proyecto y generar la carpeta `dist`.

```shell
$ pnpm install 
```

- Paso 3)

Copiar la página 404.html en la carpeta `dist`.

```shell
$ pnpm install
```

- Paso 4)

Desplegar el proyecto de Vite + React a GitHub Pages.

```shell
$ pnpm dlx gh-pages -d ./dist
```