export type ComponentMetadata = {
  id: string;
  title: string;
  description?: string;
};

const componentsList: ComponentMetadata[] = [];

export function getComponentMetadata(
  id: string
): ComponentMetadata | undefined {
  return componentsList.find((c) => c.id === id);
}
