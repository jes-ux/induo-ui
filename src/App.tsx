import { Button, Input, Badge, ItemButton, ItemCard, Toast, CategoryCard } from "./components";
import { PinIcon } from "./components/icons/PinIcon";
import { PackageIcon } from "./components/icons/PackageIcon";
import { OutdoorIcon } from "./components/icons/OutdoorIcon";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-[var(--spacing-16)]">
      <h2 className="text-[24px] leading-[28px] font-semibold text-[var(--color-neutral-gray-9)]">{title}</h2>
      <div className="flex flex-wrap items-center gap-[var(--spacing-16)]">{children}</div>
    </section>
  );
}

export default function App() {
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
          <ItemButton icon={<PinIcon />} label="Información personal" />
          <ItemButton icon={<PinIcon />} label="Direcciones" subtitle="2 guardadas" />
        </div>
      </Section>

      <Section title="ItemCard">
        <div className="flex w-full max-w-[400px] flex-col gap-[var(--spacing-8)]">
          <ItemCard icon={<PackageIcon />} label="Retiro en sucursal" selected />
          <ItemCard icon={<PackageIcon />} label="Envío a domicilio" />
        </div>
      </Section>

      <Section title="CategoryCard">
        <CategoryCard icon={<OutdoorIcon />} label="Outdoor" />
        <CategoryCard icon={<PackageIcon />} label="Envíos y paquetería" />
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
