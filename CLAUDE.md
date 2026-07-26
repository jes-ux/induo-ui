# Induo UI — contexto del proyecto

Librería de componentes en código para Induo (Aper), construida a partir del design system real en Figma. Este archivo existe para que cualquier sesión de Claude (Code, chat, o quien retome el proyecto) tenga el contexto completo sin tener que volver a explicarlo.

## Origen y fuente de verdad

- El design system vive en Figma: archivo **"UI Kit App Points"**, librería de tokens publicada como **"Design Tokens - Induo"** (67 variables: color, spacing, radius, tamaños, stroke — más 10 text styles en Montserrat).
- `tokens.json` en la raíz del repo es una copia fiel de esa librería, en formato W3C Design Tokens. Si un token cambia, cambia primero en Figma → se regenera `tokens.json` → se regenera `src/tokens.css`. Nunca al revés.
- `src/tokens.css` es el `@theme` de Tailwind v4, generado a partir de `tokens.json`. **Ojo:** las escalas `--spacing-*`, `--width-*` y `--height-*` usan el valor en píxeles como nombre (`Spacing/8` = `8px`), pisando la escala numérica por defecto de Tailwind (que multiplica x4px). Esto es intencional — `p-8` da `8px`, no los `32px` que daría Tailwind estándar.
- La tipografía original de Figma era Proxima Nova; se migró todo el sistema a **Montserrat** (Regular 400 y SemiBold 600 son los únicos dos pesos que existen en el sistema). Se carga vía Google Fonts en `index.html`. Pendiente evaluar self-hostear la fuente para no depender de un tercero.

## Stack

React + TypeScript + Vite + Tailwind CSS v4. Sin librería de componentes de terceros (no shadcn, no MUI). Cada componente es un `.tsx` propio en `src/components/<Nombre>/<Nombre>.tsx`, exportado desde `src/components/index.ts`.

## Convenciones establecidas

- **Los estados de Figma (Hover/Pressed/Active/Disabled) se traducen a pseudo-clases CSS nativas** (`hover:`, `active:`, `focus:`, `disabled:`), nunca a props explícitas tipo `state="hover"`. El navegador maneja el estado, no un prop.
- **Los inputs con valor/placeholder usan `::placeholder` para diferenciar estado vacío vs. con contenido**, no JS ni estado de React, cuando es posible resolverlo en CSS puro.
- Componentes con variantes visuales (Button, Badge) usan un objeto `Record<Variant, string>` de clases, no librerías como `class-variance-authority` — se mantiene deliberadamente simple.
- Cada componente exporta su tipo de Props (`export interface XProps`) y se re-exporta desde `src/components/index.ts`.
- Los íconos son SVG propios en `src/components/icons/`, `currentColor` en el stroke para heredar color por contexto.
- Antes de construir un componente nuevo, traer el diseño real de Figma (no inventar medidas/colores) — si tenés el MCP de Figma conectado en esta sesión de Claude Code, usalo contra el archivo "UI Kit App Points" (fileKey: `4IY8pjPHgMMxxT23IfMzzg`). Si no lo tenés conectado, pedir referencia visual antes de adivinar.
- **Button, Input, Badge, ItemButton, ItemCard y Toast no cambian** — son correctos como están, construidos a mano.
- **Para componentes del backlog con comportamiento no trivial (foco, teclado, ARIA, posicionamiento)** — Tooltip, Select/Dropdown, Modal, Radio Button en grupo, y cualquier otro con ese perfil — construir sobre **Radix UI primitives** (`@radix-ui/react-*`) en vez de implementar el comportamiento desde cero. Radix no trae estilos propios, solo comportamiento y accesibilidad ya resueltos; el styling sigue siendo 100% con las clases de Tailwind y los tokens de este proyecto, igual que en el resto de los componentes. No traer shadcn/ui completo ni su CLI — solo los primitives de Radix que hagan falta, instalados uno por uno.

## Estado actual — componentes construidos

- ✅ **Button** — variantes `primary` / `secondary` / `outlined` / `text`, tamaños medium/small.
- ✅ **Input** — estados Default/Hover/Active/Complete/Error, con `helperText` y `errorMessage`.
- ✅ **Badge** — variantes semánticas `information` / `success` / `warning` / `error` / `action`, tamaños regular/small.
- ✅ **ItemButton** — fila ícono (32px, color `action-primary`) + label (+ subtitle opcional) + trailing (chevron por defecto, `ChevronRightIcon` nuevo, también `action-primary`). Fondo `neutral-gray-1` fijo (no solo en hover). Patrón de navegación. Ajustado en Figma después de construido: el ícono pasó de un pin genérico gris a `PinLocationIcon` (pin+persona) en púrpura, y la flecha larga a un chevron fino.
- ✅ **ItemCard** — mismo patrón que ItemButton pero sin ícono de navegación fijo: fondo siempre teñido de púrpura (`action-secondary` por defecto, `hover:`/`active:` más oscuro), **sin borde**. Prop `selected` fija el tono más oscuro (`action-secondary-pressed`) sin depender de hover. Pensado para grupos de opciones (método de envío, medio de pago, etc.). Ajustado en Figma después de construido: se sacó el modelo de borde + fondo condicional que tenía antes; ahora todo es por intensidad de color.
- ✅ **Toast** — variantes `default` / `success` / `warning` / `error` (bg y border del mismo color, texto blanco), ícono (32px) + mensaje + botón de acción transparente opcional. Fetcheado de Figma (node `6055:7029`); ahí también hay una variante `success` no mencionada originalmente en este archivo, se incluyó igual porque comparte estructura y colores semánticos con el resto del kit (Badge ya usa success/warning/error/action). Íconos nuevos `AlertCircleIcon` y `CheckCircleIcon` en `src/components/icons/`, recreados en el mismo estilo stroke-24px que los demás (no son el export SVG fill-based crudo de Figma).
- ✅ **CategoryCard** — botón fijo 100x124px, ícono (40px) + label (14px semibold, 2 líneas). Fondo `action-secondary`, estados hover/pressed vía pseudo-clases. Ícono nuevo `OutdoorIcon` en `src/components/icons/`. Dimensiones y tipografía ajustadas más de una vez en Figma después de construido — revisar contra el nodo (`6128:203`) si hay dudas de si el código sigue vigente.
- ✅ **Tooltip** — primer componente sobre Radix (`@radix-ui/react-tooltip`). Bubble oscura (`gray-9`), ícono (24px, `InfoCircleIcon` nuevo) + mensaje (16px/20px), botón de cerrar opcional (`onClose`, `CloseIcon` nuevo) y link de acción opcional subrayado (`actionLabel`/`onAction`). Cada instancia envuelve su propio `Tooltip.Provider` (no hace falta uno global a nivel app). Fetcheado de Figma (`4067:6827` variante simple, `4067:6610` variante con acción). Requirió convertir `Button` a `forwardRef` (ver abajo) para que funcione como trigger vía `asChild`.

## Convención agregada: `Button` usa `forwardRef`
Radix (`Tooltip.Trigger`, y a futuro `Select`/`Popover`/etc.) usa `asChild` + clonado para inyectar su propio ref en el elemento trigger. Si el componente pasado como hijo no reenvía el ref con `React.forwardRef`, Radix no puede calcular la posición del contenido y React tira warning en consola. `Button` ya se convirtió; **cualquier componente que pueda usarse como trigger de un primitive de Radix debe reenviar ref de la misma forma**.

## Pendiente / backlog
- Resto de componentes moleculares del kit: Contextual Card, Product Card, Product Carousel, Password Input, Verification Input, Separator, Radio Button, Check Box, Special Button, Filters Badges.
- Evaluar self-hostear Montserrat (`@fontsource/montserrat` o similar) en vez de depender de Google Fonts.
- El archivo Figma "UI Kit Payment Web" (fileKey `2fH1HSTQNFS2AKBnu42sTY`) todavía no está conectado a la librería "Design Tokens - Induo" — quedó pendiente, no es prioridad actual.

## Deploy

- Repo: `github.com/jes-ux/induo-ui`, rama `main`.
- Cada push a `main` dispara un redeploy automático en Vercel: `induo-ui.vercel.app`.
- `npm run dev` para desarrollo local, `npm run build` para verificar que compila antes de pushear.
