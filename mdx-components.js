import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Callout, Steps, Tabs } from 'nextra/components'
import {
  Hero,
  SectionTitle,
  CardGrid,
  HomeCard,
  NavigationCard,
  NavigationCardItem,
  NavGrid,
  CTAButton,
  DifficultyBadge,
  Expandable,
} from './components/HomeCard'

export function useMDXComponents(components) {
  return {
    ...getDocsMDXComponents(),
    Callout,
    Steps,
    Tabs,
    Hero,
    SectionTitle,
    CardGrid,
    HomeCard,
    NavigationCard,
    NavigationCardItem,
    NavGrid,
    CTAButton,
    DifficultyBadge,
    Expandable,
    ...components,
  }
}
