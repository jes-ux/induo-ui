import { useState } from "react";
import {
  Button,
  Input,
  Badge,
  ItemButton,
  ItemCard,
  Toast,
  CategoryCard,
  Tooltip,
  ContextualCard,
  ProductCard,
  ProductCarousel,
  PasswordInput,
  Separator,
  Checkbox,
  RadioButton,
} from "./components";
import { PinLocationIcon } from "./components/icons/PinLocationIcon";
import { PackagePinLocationIcon } from "./components/icons/PackagePinLocationIcon";
import { getCategoryIcon } from "./icons/category-icons";

const AireLibreIcon = getCategoryIcon("aire-libre");
const GastronomiaIcon = getCategoryIcon("gastronomia");

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-[var(--spacing-16)]">
      <h2 className="text-[24px] leading-[28px] font-semibold text-[var(--color-neutral-gray-9)]">{title}</h2>
      <div className="flex flex-wrap items-center gap-[var(--spacing-16)]">{children}</div>
    </section>
  );
}

export default function App() {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("Abcdef12");
  const [pw3, setPw3] = useState("abc");
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("efectivo");

  return (
    <main className="mx-auto flex max-w-[900px] flex-col gap-[var(--spacing-32)] p-[var(--spacing-32)] font-sans">
      <h1 className="text-[32px] leading-[40px] font-semibold text-[var(--color-neutral-gray-9)]">
        Induo UI — vista previa
      </h1>

      <Section title="Button — primary / secondary">
        <Button variant="primary">Continuar</Button>
        <Button variant="secondary">Continuar</Button>
        <Button variant="primary" disabled>
          Continuar
        </Button>
      </Section>

      <Section title="Button — outlined / text">
        <Button variant="outlined">Filtrar</Button>
        <Button variant="text">Ver más</Button>
        <Button variant="text" size="small">
          Ver más
        </Button>
      </Section>

      <Section title="Input">
        <Input placeholder="Medio de pago" className="max-w-[343px]" />
        <Input placeholder="Con error" errorMessage="Este campo es obligatorio" className="max-w-[343px]" />
        <Input placeholder="Con ayuda" helperText="Lo vas a ver en tu resumen" className="max-w-[343px]" />
      </Section>

      <Section title="Badge">
        <Badge variant="information">Novedad</Badge>
        <Badge variant="success">Aprobado</Badge>
        <Badge variant="warning">Pendiente</Badge>
        <Badge variant="error">Rechazado</Badge>
        <Badge variant="action" size="small">
          Nuevo
        </Badge>
      </Section>

      <Section title="ItemButton">
        <div className="flex w-full max-w-[400px] flex-col">
          <ItemButton icon={<PinLocationIcon />} label="Información personal" />
          <ItemButton icon={<PinLocationIcon />} label="Direcciones" subtitle="2 guardadas" />
        </div>
      </Section>

      <Section title="ItemCard">
        <div className="w-full max-w-[400px]">
          <ItemCard icon={<PackagePinLocationIcon />} label="Retiro en sucursal" />
        </div>
      </Section>

      <Section title="CategoryCard">
        {AireLibreIcon && <CategoryCard icon={<AireLibreIcon />} label="Aire libre" />}
        {GastronomiaIcon && <CategoryCard icon={<GastronomiaIcon />} label="Gastronomía" />}
      </Section>

      <Section title="Tooltip">
        <Tooltip message="Ingresa con tu dirección de correo electrónico" onClose={() => {}}>
          <Button variant="secondary">Hover / focus acá</Button>
        </Tooltip>
        <Tooltip
          message="Ingresa con tu dirección de correo electrónico"
          actionLabel="Necesito ayuda para continuar"
        >
          <Button variant="outlined">Con acción</Button>
        </Tooltip>
      </Section>

      <Section title="ContextualCard">
        <div className="w-full max-w-[400px]">
          <ContextualCard message="Vas a  pagar impuestos y servicios con factura" actionLabel="Volver" />
        </div>
      </Section>

      <Section title="ProductCard">
        <ProductCard
          image="https://picsum.photos/seed/jbl/320/320"
          badge={
            <Badge variant="information" size="small">
              Novedad
            </Badge>
          }
          brand="JBL"
          title="Parlante Bluetooth JBL Clip 4 Black/Orange"
          price="499.500 pts"
          shipping="Envío Gratis"
        />
      </Section>

      <Section title="ProductCarousel">
        <ProductCarousel title="Novedades" seeAllLabel="Mostrar todo">
          <ProductCard
            image="https://picsum.photos/seed/jbl/320/320"
            badge={
              <Badge variant="information" size="small">
                Novedad
              </Badge>
            }
            brand="JBL"
            title="Parlante Bluetooth JBL Clip 4 Black/Orange"
            price="219.500 pts"
            shipping="Envío Gratis"
          />
          <ProductCard
            image="https://picsum.photos/seed/mate/320/320"
            brand="Stanley"
            title="Mate Stanley Acero Inoxidable Termico 236ml Verde"
            price="140.700 pts"
            shipping="Envío Gratis"
          />
          <ProductCard
            image="https://picsum.photos/seed/mouse/320/320"
            brand="Logitech"
            title="Mouse Inalámbrico Con Emojis Personalizables Logitech"
            price="190.300 pts"
          />
          <ProductCard
            image="https://picsum.photos/seed/msmouse1/320/320"
            brand="Microsoft"
            title="Mouse Microsoft Modern Mobile peach"
            price="120.500 pts"
            shipping="Envío Gratis"
          />
          <ProductCard
            image="https://picsum.photos/seed/msmouse2/320/320"
            brand="Microsoft"
            title="Mouse Inalambrico Microsoft 1850 Ambidiestro Windows Mac"
            price="60.700 pts"
          />
          <ProductCard
            image="https://picsum.photos/seed/teclado/320/320"
            badge={
              <Badge variant="action" size="small">
                Oferta
              </Badge>
            }
            brand="Logitech"
            title="Teclado Inalámbrico K380 Multi-Dispositivo Bluetooth"
            price="310.900 pts"
            shipping="Envío Gratis"
          />
          <ProductCard
            image="https://picsum.photos/seed/auriculares/320/320"
            brand="Sony"
            title="Auriculares Inalámbricos WH-CH520 Bluetooth"
            price="175.200 pts"
          />
        </ProductCarousel>
      </Section>

      <Section title="PasswordInput">
        <div className="flex w-full max-w-[312px] flex-col gap-[var(--spacing-24)]">
          <PasswordInput value={pw1} onChange={(e) => setPw1(e.target.value)} placeholder="Contraseña" />
          <PasswordInput
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            strength="strong"
            requirements={[
              { label: "8 caracteres o más", met: true },
              { label: "1 letra mayúscula o más", met: true },
              { label: "1 símbolo o más (ej: ? + !)", met: true },
              { label: "1 número o más", met: true },
            ]}
          />
          <PasswordInput
            value={pw3}
            onChange={(e) => setPw3(e.target.value)}
            strength="weak"
            errorMessage="La contraseña no coincide"
            requirements={[
              { label: "8 caracteres o más", met: false },
              { label: "1 letra mayúscula o más", met: true },
              { label: "1 símbolo o más (ej: ? + !)", met: true },
              { label: "1 número o más", met: false },
            ]}
          />
        </div>
      </Section>

      <Section title="Separator">
        <div className="w-full max-w-[400px]">
          <Separator />
        </div>
      </Section>

      <Section title="Checkbox">
        <Checkbox label="Acepto los términos y condiciones" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <Checkbox label="Deshabilitado" disabled />
        <Checkbox label="Deshabilitado marcado" disabled defaultChecked />
      </Section>

      <Section title="RadioButton">
        <div className="flex flex-col gap-[var(--spacing-8)]">
          <RadioButton
            name="metodo-pago"
            label="Efectivo"
            checked={radioValue === "efectivo"}
            onChange={() => setRadioValue("efectivo")}
          />
          <RadioButton
            name="metodo-pago"
            label="Tarjeta"
            checked={radioValue === "tarjeta"}
            onChange={() => setRadioValue("tarjeta")}
          />
          <RadioButton name="metodo-pago" label="Deshabilitado" disabled />
        </div>
      </Section>

      <Section title="Toast">
        <div className="flex w-full max-w-[400px] flex-col gap-[var(--spacing-16)]">
          <Toast variant="default" message="Tu sesión expiró" actionLabel="Ingresar" />
          <Toast variant="success" message="Dirección eliminada" actionLabel="Deshacer" />
          <Toast variant="warning" message="Esta orden tiene una consulta abierta" actionLabel="Ir a cerrar" />
          <Toast variant="error" message="Ocurrió un problema con tus datos" actionLabel="Aceptar" />
        </div>
      </Section>
    </main>
  );
}
