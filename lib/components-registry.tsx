import { componentSnippets } from "@/lib/registry/snippets";

const radixBaseDocs = "https://www.radix-ui.com/primitives/docs/components/";
const radixBaseApi = "https://www.radix-ui.com/docs/primitives/components/";

const addUtmParams = (url: string): string => {
  if (!url) return url;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("shadcn.com")) {
      urlObj.searchParams.set("utm_source", "hextaui");
      urlObj.searchParams.set("utm_medium", "referral");
      urlObj.searchParams.set("utm_campaign", "component-docs");
      urlObj.searchParams.set("ref", "hextaui.com");
    }
    return urlObj.toString();
  } catch {
    return url;
  }
};

const radixDocs = (component: string) => `${radixBaseDocs}${component}`;
const radixApi = (component: string) =>
  `${radixBaseApi}${component}#api-reference`;

const shadcnDocs = (path: string) =>
  addUtmParams(`https://ui.shadcn.com/docs/components/${path}`);

export type ComponentMeta = {
  id: string;
  title: string;
  description?: string;
  Demo: React.ComponentType;
  api_ref?: string;
  docs_ref?: string;
  demoCode?: string;
  installCode?: string;
  usageImports?: string;
  usageCode?: string;
};

type ComponentDefinition = {
  id: string;
  title: string;
  description: string;
  Demo: React.ComponentType;
  docs_ref?: string;
  api_ref?: string;
};

const componentDefinitions: ComponentDefinition[] = [];

const snippets = componentSnippets as Record<
  string,
  Partial<Omit<ComponentMeta, "id" | "title" | "Demo">>
>;

export const componentsRegistry: ComponentMeta[] = componentDefinitions
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((component) => ({
    ...component,
    ...(snippets[component.id] ?? {}),
  }));

export function getComponentMetaById(id: string) {
  return componentsRegistry.find((c) => c.id === id);
}
