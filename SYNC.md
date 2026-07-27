# SYNC.md — Resincronizar Figma → induo-ui → induo-app

Este archivo es el procedimiento que Claude Code ejecuta cuando Jesús pide
"corré el sync" (o similar). No requiere webhooks ni API REST de Figma
(el plan Profesional no los tiene) — usa el MCP de Figma ya conectado en
modo remoto, que sí funciona en cualquier plan.

## Paso 1 — Tokens

1. Con el MCP de Figma, leé la colección de variables publicada como
   librería **"Design Tokens - Induo"** (fileKey del archivo de tokens:
   consultalo en Figma si no lo tenés a mano — es un archivo separado del
   UI Kit).
2. Regenerá `src/tokens.css` con los valores actuales, siguiendo
   exactamente el mismo formato y convención que ya tiene el archivo
   (namespaces `--color-*`, `--spacing-*`, `--width-*`, `--height-*`,
   `--radius-*`, `--stroke-*`, `--text-*`). No cambies la convención de
   nombres, solo los valores.
3. Regenerá `tokens.json` (raíz del repo) en el mismo formato W3C Design
   Tokens que ya tiene, con los valores actualizados.
4. Si hay un token nuevo en Figma que no existe en el archivo local,
   agregalo. Si un token se borró en Figma, marcalo como comentario
   "// sin uso, verificar antes de borrar" en vez de eliminarlo directo.

## Paso 2 — Componentes

1. Recorré cada carpeta de `src/components/` (excepto `icons/`).
2. Para cada componente, usá el MCP de Figma para traer el diseño real
   del nodo correspondiente en el archivo "UI Kit App Points" y comparalo
   contra el código actual: medidas, colores, estados, íconos.
3. Si encontrás una diferencia real (no una decisión de diseño ya
   documentada en CLAUDE.md), corregila.
4. Si encontrás algo ambiguo o que no podés confirmar contra Figma sin
   arriesgarte a romper una decisión de diseño ya tomada, **no lo toques**
   — dejalo anotado en el resumen final para que Jesús decida.

## Paso 3 — Cerrar

1. Compilá (`npm run build` y `npx storybook build`) para confirmar que
   nada rompió.
2. Hacé commit con un mensaje descriptivo (ej. "Sync: tokens actualizados
   + N componentes corregidos") y push a `main`.
3. Dame un resumen corto: qué tokens cambiaron de valor, qué componentes
   se corrigieron y por qué, y qué quedó dudoso sin tocar.

## Paso 4 — Propagar a induo-app

Esto es un repo distinto (`induo-app`), así que hace falta un paso
aparte — Vercel no redespliega `induo-app` solo porque `induo-ui` cambió.

**Ojo — `package-lock.json` de `induo-app` NO está trackeado en git a
propósito** (ver commit `bc68d8c` "Delete package-lock.json"). La
dependencia `"induo-ui": "jes-ux/induo-ui"` en `package.json` usa el
shorthand de GitHub (sin `git+` ni `.git`) porque así npm resuelve por
tarball HTTPS (`codeload.github.com`), sin necesitar git ni SSH. Si se
escribe una URL explícita tipo `git+https://github.com/...`, npm hace
un clone real y termina normalizando a `git+ssh://` igual (probado en
vivo el 2026-07-27) — **no "arreglar" esto cambiando el formato de la
dependencia**, el shorthand ya es la forma correcta.

1. Con lo anterior en mente, **no corras `npm update induo-ui` pensando
   en commitear el lockfile** — no hay lockfile que actualizar, y no se
   debe volver a crear uno committeado.
2. **El paso real es forzar un redeploy en Vercel sin build cache.**
   Vercel restaura el `node_modules` cacheado del deploy anterior en
   cada build; como el texto de `package.json` no cambia (sigue
   apuntando al mismo shorthand), npm no vuelve a resolver la
   dependencia git y el deploy nuevo sigue sirviendo el código viejo de
   `induo-ui` — un commit vacío en `induo-app` **no alcanza** por esto
   mismo (confirmado en vivo el 2026-07-27: el deploy quedó "Ready" con
   el commit correcto pero mostrando el color viejo, hasta forzar un
   deploy sin cache).
3. Desde la carpeta de `induo-app`:
   ```
   npx vercel link --yes   # solo la primera vez, o si no está linkeado
   npx vercel --prod --force
   ```
   `--force` es lo que le dice a Vercel que ignore el build cache y
   vuelva a instalar todo de cero (ahí sí npm re-resuelve `induo-ui` al
   commit más reciente de `main`). Requiere estar autenticado con
   `npx vercel whoami` — si no lo está, dispara un login por OAuth.
4. Verificá visualmente (o con `curl`/el ID de deployment en la
   respuesta del comando) que el sitio en producción cambió antes de
   dar el paso por terminado.

Con esto, los tres despliegues (showcase de induo-ui, Storybook, e
induo-app) quedan al día.
