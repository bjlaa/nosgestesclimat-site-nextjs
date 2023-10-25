import { TOptions } from 'i18next'
import { HTMLProps, JSX } from 'react'
import { TransProps } from 'react-i18next'
import { TransChild } from 'react-i18next/TransWithoutContext'

export enum Lang {
  Default = 'Fr',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  Fr = 'Fr',
  En = 'En',
  // Commented until validation by a native speaker
  // Es = 'Es',
  // It = 'It',
}

export type Release = {
  name: string
  published_at: string
  body: string
}

export type LangInfos = {
  name: string
  abrv: string
  abrvLocale: string
  faqContent: string // The FAQ content in YAML
  releases: Release[] // The releases content in JSON
  uiTrad: any // The UI translation in YAML
}

export type YamlEntry = { entries: { [key: string]: string } }

export type TranslationFunctionType = (key: string) => JSX.Element | string

export type TransPropsWithInterpolation = TransProps<
  string,
  string,
  TOptions,
  undefined,
  // NOTE(@EmileRolley): hack to be able to use string interpolation in Trans components.
  // However, TransProps<string> should be sufficient.
  HTMLProps<HTMLDivElement> | TransChild
>
