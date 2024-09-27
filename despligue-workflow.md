# Como desplegar en GitHub Pages usando `workflows`

- Paso 1)

Habilitar para ejecutar acciones para el repositorio.

```text
Settings > Actions > General > Allow all actions and reusable workflows
```

- Paso 2)

Copiar las carpeta, subcarpeta y `vite-react.yml` a la rama por defecto (en este caso `master`).

```shell
$ git add .
$ git commit -m "Se agrega workflow para GitHub Pages"
```
