import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const RAW_DIR = join(__dirname, "..", "src", "icons-raw");
const OUT_DIR = join(__dirname, "..", "src", "components", "icons");

// Atributos SVG en kebab-case que hay que pasar a camelCase para que sean JSX válido.
const ATTR_RENAMES = [
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-opacity",
  "stroke-miterlimit",
  "fill-rule",
  "fill-opacity",
  "clip-rule",
  "clip-path",
  "stop-color",
  "stop-opacity",
  "font-family",
  "font-size",
  "font-weight",
  "text-anchor",
  "dominant-baseline",
  "vector-effect",
];

const SVG_ROOT_ATTRS_TO_STRIP = ["width", "height", "style", "preserveAspectRatio", "overflow"];

function toPascalCase(fileName) {
  return fileName
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function camelCaseAttrs(svg) {
  let result = svg;
  for (const attr of ATTR_RENAMES) {
    const camel = attr.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    result = result.replaceAll(`${attr}=`, `${camel}=`);
  }
  return result;
}

function hexColorsToCurrentColor(svg) {
  return svg.replace(/(stroke|fill)="(#[0-9A-Fa-f]{3,8}|white|black)"/gi, '$1="currentColor"');
}

function parseAttrs(attrString) {
  const attrs = [];
  const attrRegex = /([\w:-]+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(attrString)) !== null) {
    attrs.push([match[1], match[2]]);
  }
  return attrs;
}

function indentInner(innerXml, baseSpaces = 6) {
  const collapsed = innerXml.replace(/>\s+</g, "><").trim();
  const tags = collapsed.match(/<[^>]+>/g) ?? [];
  const lines = [];
  let depth = 0;

  for (const tag of tags) {
    const isClosing = tag.startsWith("</");
    const isSelfClosing = tag.endsWith("/>");

    if (isClosing) depth = Math.max(0, depth - 1);

    lines.push(" ".repeat(baseSpaces + depth * 2) + tag);

    if (!isClosing && !isSelfClosing) depth += 1;
  }

  return lines.join("\n");
}

function convertSvgFile(fileName) {
  const raw = readFileSync(join(RAW_DIR, fileName), "utf8");

  // Solo el primer bloque <svg>...</svg> (el export de Figma trae varios concatenados).
  const blockMatch = raw.match(/<svg[\s\S]*?<\/svg>/i);
  if (!blockMatch) {
    throw new Error(`No se encontró un bloque <svg> en ${fileName}`);
  }

  let block = blockMatch[0];
  block = camelCaseAttrs(block);
  block = hexColorsToCurrentColor(block);

  const openTagMatch = block.match(/^<svg([^>]*)>/i);
  const attrsString = openTagMatch[1];
  const attrs = parseAttrs(attrsString).filter(([name]) => !SVG_ROOT_ATTRS_TO_STRIP.includes(name));

  const rootAttrs = attrs.map(([name, value]) => `${name}="${value}"`).join(" ");
  const openTag = `<svg ${rootAttrs} {...props}>`;

  const innerXml = block.slice(openTagMatch[0].length, block.length - "</svg>".length);
  const innerLines = indentInner(innerXml);

  const componentName = `${toPascalCase(basename(fileName, extname(fileName)))}Icon`;

  const component = `import type { SVGProps } from "react";

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    ${openTag}
${innerLines}
    </svg>
  );
}
`;

  writeFileSync(join(OUT_DIR, `${componentName}.tsx`), component);
  console.log(`✓ ${fileName} -> ${componentName}.tsx`);
}

const files = readdirSync(RAW_DIR).filter((f) => f.endsWith(".svg"));
for (const file of files) {
  convertSvgFile(file);
}
