import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout, Steps, Tabs } from 'nextra/components'

export function useMDXComponents(components) {
  return {
    ...getDocsMDXComponents(),
    Callout,
    Steps,
    Tabs,
    ...components
  }
}
