type ComponentSectionProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
};

export function ComponentSection({
  id,
  title,
  children,
}: ComponentSectionProps) {
  return (
    <div className="flex flex-col gap-4" data-component-section={id} id={id}>
      <div className="flex w-full flex-col gap-4 rounded">
        {title && (
          <div className="flex w-full gap-4">
            <h2 className="w-full rounded bg-secondary px-4 py-3 font-medium text-lg text-secondary-foreground tracking-tight">
              {title}
            </h2>
          </div>
        )}
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
