import { Component, COMPONENTS } from "../config/components.js";

/**
 * Resolves all required components for a given set of components
 * Returns a flattened list with no duplicates, in the correct order
 */
export function resolveRequiredComponents(
  componentNames: string[],
): Component[] {
  const resolvedComponents = new Map<string, Component>();
  const visited = new Set<string>();

  function resolveComponent(componentName: string): void {
    if (visited.has(componentName)) {
      return; // Avoid circular dependencies
    }

    visited.add(componentName);

    const component = COMPONENTS.find((c) => c.name === componentName);
    if (!component) {
      throw new Error(`Component "${componentName}" not found`);
    }

    // First, resolve all required components recursively
    if (component.requiredComponents) {
      for (const requiredName of component.requiredComponents) {
        resolveComponent(requiredName);
      }
    }

    // Then add this component
    resolvedComponents.set(componentName, component);
  }

  // Resolve all requested components
  for (const componentName of componentNames) {
    resolveComponent(componentName);
  }

  return Array.from(resolvedComponents.values());
}

/**
 * Gets a list of component names that will be installed (including required ones)
 */
export function getInstallationList(componentNames: string[]): {
  requested: string[];
  required: string[];
  total: Component[];
} {
  const allComponents = resolveRequiredComponents(componentNames);
  const requestedSet = new Set(componentNames);

  const requested = allComponents
    .filter((c) => requestedSet.has(c.name))
    .map((c) => c.name);

  const required = allComponents
    .filter((c) => !requestedSet.has(c.name))
    .map((c) => c.name);

  return {
    requested,
    required,
    total: allComponents,
  };
}
