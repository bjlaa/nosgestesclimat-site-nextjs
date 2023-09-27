import Footer from '@/components/layout/Footer'
import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/Trans'
import Main from '@/design-system/layout/Main'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { Metadata } from 'next'
import Image from 'next/image'
import AnimatedIllustration from './_components/AnimatedIllustration'
import GroupsLink from './_components/GroupsLink'
import LandingExplanations from './_components/LandingExplanations'
import NewsBanner from './_components/NewsBanner'
import ProfileLink from './_components/ProfileLink'
import TakeTestLink from './_components/TakeTestLink'

export const metadata: Metadata = {
  title:
    "Votre calculateur d'empreinte carbone personnelle - Nos Gestes Climat",
  description:
    'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.',
}

export default async function Landing() {
  const { t } = await getServerTranslation()

  return (
    <>
      <header>
        <Logo />
      </header>

      <Main>
        <div className="mx-auto flex flex-col justify-center gap-4 px-4 pb-8 text-center md:mx-auto md:mt-6 md:w-full md:max-w-6xl md:p-10 md:px-8 md:text-left">
          <div className="gap-10 md:flex">
            <div className="my-12 flex flex-col md:my-0 md:flex-1">
              <Title
                title={
                  <Trans i18nKey="publicodes.Landing.question">
                    Connaissez-vous votre empreinte sur le climat ?
                  </Trans>
                }
                className="text-2xl md:text-4xl"
              />

              <p>{t('sites.publicodes.Landing.description')}</p>
              <div>
                <div className="my-4 flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row md:justify-normal">
                  <TakeTestLink />

                  <GroupsLink />

                  <ProfileLink />
                </div>
                <div className="text-center md:text-left">
                  <NewsBanner />
                </div>
              </div>
            </div>
            <AnimatedIllustration className="hidden w-[512px] max-w-[40%] text-center md:block" />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-10">
            <Image
              src="/images/misc/marianne.svg"
              alt="République Française"
              className="h-auto w-24"
              width="96"
              height="86"
            />

            <a href="https://ademe.fr" className="h-full">
              <svg className="w-16" viewBox="0 0 181 213">
                <g>
                  <path d="M180.35 212.6H0V0h180.35v212.6Z" fill="#004899" />
                  <path d="M176.33 4.01H4.01v204.58h172.32V4.01Z" fill="#fff" />
                  <path
                    d="M54.75 119.46a42.759 42.759 0 0 0 73.905-4.391 42.755 42.755 0 0 0-40.678-61.86A42.76 42.76 0 0 0 47.97 90.87a41.8 41.8 0 0 0-.3 5 42.53 42.53 0 0 0 7.08 23.56"
                    fill="#80A4CC"
                  />
                  <path
                    d="m76.56 82 2.28.36-.78 1.5-2-1.08.5-.78Zm9.17-5-1.91 1.68v1.14l3 .75 6.05-4.11-.16-1.67-2.4-.83L85.73 77Zm.94-4.51h-.55l-1.01 1.91-1.64.13-1.87 2.7 1 .64 2.52-1.6 1.93-2.06-.38-1.72Zm3.4-5.3-3.87 3.08 1.38 1 3.09-3.16-.6-.92ZM60.32 84.38l1.34.17.42-3.17v-1l-.24-1-.69-.06-.83 5.06Zm.71 2.09.43.67.81.12.37-1.64-1.34-.32-.27 1.17Zm.78 1.64.13.87h.83l-.11-.94-.85.07Zm.47 1.87.23.56.7-.31s-.19-.52-.21-.52l-.72.27Zm.42 1.6.6-.22-.23-.51s-.34.29-.33.33v.4h-.04Zm28.41-2.47s-1.09 2.65-1.09 2.67c0 .02 1.71.16 1.71.17l.41-2.18-.3-.22.2-.75-.86-.47-.27.56.2.22Zm-2.51 1.84.93.26.28-.87-.66-.15-.55.76Zm20.06 33.63-1.35.78-1.72.36-3.78 3.72.23.83.55-.08 2.16-.93a12.263 12.263 0 0 0 3.25-2.22 8.558 8.558 0 0 0 1.63-2.26l-.97-.2Zm-1 5.19-.46-.51-.72.43s.54.55.53.55l.65-.47ZM93.33 97.58l-.53-.07v1l.54.1.32-1.3-.17-.07-.16.34Zm-31.92-5.6.19.81.77-.25-.25-.82-.71.26Zm-6.66 27.51 3-2.45 2.43.62 6.49-4.89.31-2.6-4.26-6.22a54.99 54.99 0 0 0-1.17-6.89c-.44-1.52-1.43-5.94-1.47-6l-.56-1.13-4.06-6.09 2.63-6.58 2.02-.15.13-1-1.56-1.3V73.3c0-.84 1.42-1.69 2.37-1.69.268.002.534.043.79.12a6.57 6.57 0 0 1 1.86 1.14c.1.07 1.86 4.19 1.86 4.19l-1.49 1.21-.74 1.8 1 .81 1.43-2.47 5.92 2 3.62 2.06 1.1-1.2 3 .25 2.22-3-2-.76 2.11-2.54-.25-.86-3.22-.62 2.46-2.63 2.39 1.56v.69l1.51.18 1.19-2.43-.89-.79 3.76-3.62 3.43-1.59 2.65-1.74.52-.41.1-1.86-.45-1.32-1.17-.46 1.5-1.18-.41-.22a14.62 14.62 0 0 1-7.55 2.61c-3 .2-8.94-1.11-8.94-1.11l-5.94-.89-2.08-.37a43 43 0 0 0-13.08 10.76l-.15 5.61-.92 2.58-2.08 7.4.69 2.09-3.37.48-3.41 3.79a44.015 44.015 0 0 0-.29 5 42.53 42.53 0 0 0 7.08 23.56l-.06.06Zm58.16-60a42.79 42.79 0 0 1 19.72 29.62l-3.34 2.86-2.13-.51-1 .88.07.59c0 .28.16.83.37 1.66a21.13 21.13 0 0 1 .64 5 12.012 12.012 0 0 1-.41 3.54h-1.82l-5.12-4.02-3.9.88-2.52-.43-3.19 1 1.44 1.24 2.51-.71 2.16 1.73-.34.76-.89 1.45-1.92 2.74-3 2.39-5.47-5.68-1.42.15 5.84 6.7 2.37-.48.59 1.21-2.38 3.9-4.64 4.43-2.02 5.23a1.202 1.202 0 0 1-.6.46 9.781 9.781 0 0 0-2.33 1.72c-1.12 1.05-1.74 1.63-1.88 1.74a32.789 32.789 0 0 1-3.32 2.53c-1.23.832-2.51 1.59-3.83 2.27a15.996 15.996 0 0 1-7 1.77 14.054 14.054 0 0 1-4.49-.75c-.2-.07-.33-.17-.33-.26l1-2.86a33.87 33.87 0 0 1 2.51-2.87c.804-.919 1.4-2 1.75-3.17a23.054 23.054 0 0 1 1.29-3.48c.93-1.5 1.37-2.78 1.06-3.09l-6.06-6.09-2.54-4.73.27-1.12a24.691 24.691 0 0 1 2-4.4 4.64 4.64 0 0 1 1.74-2.15l4.06-2 7.87 1.19 2.4 1.6 1.12-.14 4.81 1.25 1.2-3.13-6.11-1.72-2.16-2.15-.3.08 1 2.55-1.22.25-.13-.3.43-.08s-.37-1.57-1.32-2a2 2 0 0 0-.91-.31 2.83 2.83 0 0 0-1.62.66 11.352 11.352 0 0 1-2.48 2L86.48 97l.93-2.34.39.09c.232.057.47.084.71.08a1.31 1.31 0 0 0 1.37-.91.8.8 0 0 0-.27-.83l-.24-.27a2.8 2.8 0 0 0 .35-.41c.492.132.993.226 1.5.28a2.1 2.1 0 0 0 1.53-.39l.6-1 1-.29.18-1.35h.63c.232.348.402.734.5 1.14l1.77-.46.52-1.81-.28-.32.77-1.74-.67-.47-1.14 3.2-.62.08-.28-.71-1.59.12-.89-1.43 1.93-2 1.89-2.53 2.67.84.65 1.32h.81l-.3-1.92 2.18-2-1.45-6.57.93-2.07 1 .06.15-1.62-7-7.61.23-2.06 5.75-1.31.83.25 3.27-.32.76.34 5.28-.52.08-.05Zm-.1 1.27-6.7 1.46 4.62 2.66 1.51-1.77 1.87-1.26-1.3-1.09Z"
                    fill="#004899"
                  />
                  <path
                    d="m42.32 39.87-1.11-3.56h-7.35l-1.17 3.56h-6.14l8.69-23.9h4.53l8.68 23.9h-6.13Zm-4.67-14.84-2.14 6.38h4.16l-2.02-6.38ZM70.43 37.52a8.899 8.899 0 0 1-6.44 2.35h-8.88v-23.9h8.85a8.899 8.899 0 0 1 6.44 2.35c2.79 2.79 2.48 5.84 2.48 9.6s.34 6.81-2.45 9.6Zm-4-15a3.06 3.06 0 0 0-2.82-1.34h-2.6v13.45h2.58a3.06 3.06 0 0 0 2.82-1.34c.47-.67.63-1.31.63-5.37 0-4.06-.16-4.7-.63-5.37l.02-.03ZM80.89 39.87v-23.9h16.22v5.24H86.76v4h8.85v5.24h-8.85v4.19h10.35v5.24l-16.22-.01ZM121.66 39.87V28.42l-3.39 5.91h-3.76l-3.4-5.91v11.45h-5.86v-23.9h5.76l5.37 10.54 5.37-10.54h5.76v23.9h-5.85ZM136.23 39.87v-23.9h16.23v5.24h-10.35v4h8.85v5.24h-8.85v4.19h10.36v5.24l-16.24-.01ZM31.31 152.11l-3.8 10.46h2.48l.52-1.6h3.48l.5 1.6h2.48l-3.81-10.46h-1.85Zm-.14 6.92 1.14-3.39 1.07 3.39h-2.21ZM43.75 162.63a3.837 3.837 0 0 0 3-1.17c.76-.77 1-1.72 1-3.47v-1.37h-3.88v2h1.58v.27c.013.448-.144.884-.44 1.22a1.676 1.676 0 0 1-1.26.45 1.4 1.4 0 0 1-1.14-.5c-.25-.33-.42-.7-.42-2.72 0-2.02.17-2.38.42-2.71a1.423 1.423 0 0 1 1.14-.51 1.487 1.487 0 0 1 1.63 1.2h2.4a4.125 4.125 0 0 0-2.83-3.112 4.125 4.125 0 0 0-4.09.982c-1 1-1 2.47-1 4v.36c0 1.5 0 2.92 1 4a3.822 3.822 0 0 0 2.89 1.08ZM58.19 156.22h-3.97v-2.04h4.65v-2.1h-7.03v10.46h7.03v-2.1h-4.65v-2.13h3.97v-2.09ZM68.66 152.08v5.69l-3.62-5.69h-2.1v10.46h2.38v-5.69l3.62 5.69h2.11v-10.46h-2.39ZM80.48 159.39a1.409 1.409 0 0 1-1.46 1.14 1.4 1.4 0 0 1-1.14-.5c-.25-.33-.43-.72-.43-2.72s.18-2.39.43-2.72a1.4 1.4 0 0 1 1.14-.5 1.41 1.41 0 0 1 1.46 1.14h2.43a3.71 3.71 0 0 0-3.91-3.24 3.81 3.81 0 0 0-2.88 1.17c-1.05 1-1.05 2.47-1.05 4v.36c0 1.5 0 2.92 1.05 4a3.808 3.808 0 0 0 2.88 1.17 3.71 3.71 0 0 0 3.91-3.24l-2.43-.06ZM92.88 156.22h-3.97v-2.04h4.64v-2.1h-7.02v10.46h7.02v-2.1h-4.64v-2.13h3.97v-2.09ZM112.19 157.77v-.91c0-1.49 0-2.66-1.08-3.76a3.885 3.885 0 0 0-1.3-.78 3.885 3.885 0 0 0-1.5-.22h-3.84v10.45h3.84a3.832 3.832 0 0 0 2.8-1c1.1-1.12 1.09-2.3 1.08-3.78Zm-2.69 2a1.5 1.5 0 0 1-1.37.66h-1.28v-6.27h1.26a1.503 1.503 0 0 1 1.37.66c.24.34.3.71.3 2.47 0 1.76-.05 2.18-.28 2.5v-.02ZM122.56 156.22h-3.97v-2.04h4.65v-2.09h-7.03v10.45h7.03v-2.09h-4.65v-2.13h3.97v-2.1ZM134.16 162.54h6.87v-2.1h-4.49v-8.36h-2.38v10.46ZM150.32 162.54h2.48l-3.81-10.43h-1.88l-3.8 10.46h2.48l.53-1.6h3.47l.53 1.57ZM147 159l1.11-3.39 1.07 3.39H147ZM32.92 171.22h2.64v-2.1H27.9v2.1h2.64v8.36h2.38v-8.36ZM47.75 175.11a2.996 2.996 0 0 0 1.67-2.69 3.311 3.311 0 0 0-3.53-3.31h-4.12v10.46h2.39v-4h1.09l1.9 4h2.77l-2.29-4.4.12-.06Zm-3.59-1.48v-2.42h1.61a1.21 1.21 0 1 1 0 2.42h-1.61ZM58.79 169.11l-3.81 10.46h2.49l.53-1.6h3.48l.49 1.6h2.49l-3.81-10.46h-1.86Zm-.14 6.92 1.14-3.39 1.07 3.39h-2.21ZM72.66 179.58v-5.69l3.62 5.69h2.11v-10.46h-2.38v5.69l-3.63-5.69h-2.11v10.46h2.39ZM89.38 173.32l-1.27-.21a1.353 1.353 0 0 1-.81-.35.88.88 0 0 1-.25-.59c0-.54.45-1.12 1.42-1.12h.09c.697-.057 1.39.15 1.94.58l1.49-1.47a4.672 4.672 0 0 0-3.44-1.16c-2.27 0-3.79 1.31-3.79 3.26a2.87 2.87 0 0 0 .7 2.06 3.473 3.473 0 0 0 2.08.91l1.3.18c.286.025.559.136.78.32a1 1 0 0 1 .24.72c0 .5-.28 1.09-1.66 1.09a3.889 3.889 0 0 1-2.39-.7l-1.51 1.51a5.143 5.143 0 0 0 3.89 1.29c2 0 4-1 4-3.24a3.002 3.002 0 0 0-.76-2.26 3.48 3.48 0 0 0-2.05-.82ZM100.97 169.12h-2.38v10.45h2.38v-10.45ZM112.21 171.22h2.63v-2.1h-7.65v2.1h2.64v8.36h2.38v-8.36ZM123.44 169.12h-2.38v10.45h2.38v-10.45ZM137.85 174.17c0-1.5 0-2.92-1.05-4a4.192 4.192 0 0 0-5.81 0c-1 1-1 2.47-1 4v.36c0 1.5 0 2.92 1 4a4.192 4.192 0 0 0 5.81 0c1.05-1 1.05-2.47 1.05-4v-.36Zm-2.8 2.87a1.527 1.527 0 0 1-1.155.532 1.527 1.527 0 0 1-1.155-.532c-.26-.34-.42-.69-.42-2.69s.17-2.38.42-2.71a1.566 1.566 0 0 1 1.155-.511 1.561 1.561 0 0 1 1.155.511c.25.33.42.7.42 2.71s-.16 2.35-.42 2.69ZM150.08 169.12v5.69l-3.62-5.69h-2.11v10.46h2.38v-5.69l3.63 5.69h2.11v-10.46h-2.39ZM34.29 190.3H30.3v-2.05h4.67v-2.1h-7.06v10.49h7.06v-2.1H30.3v-2.14h3.99v-2.1ZM31.9 184.84l1.62-2.46h-2.21l-.67 2.46h1.26ZM46.32 189.31h2.44a3.73 3.73 0 0 0-3.92-3.2 3.854 3.854 0 0 0-2.9 1.17c-1 1-1 2.48-1 4v.35c0 1.51 0 2.94 1 4a3.857 3.857 0 0 0 2.9 1.17 3.73 3.73 0 0 0 3.92-3.25h-2.44a1.418 1.418 0 0 1-1.47 1.15 1.415 1.415 0 0 1-1.14-.5c-.25-.34-.43-.73-.43-2.73s.18-2.4.43-2.74a1.45 1.45 0 0 1 .513-.38 1.45 1.45 0 0 1 .627-.12 1.419 1.419 0 0 1 1.47 1.08ZM58.19 186.11a3.786 3.786 0 0 0-2.91 1.17c-1.06 1-1.06 2.48-1 4v.35c0 1.51 0 2.94 1 4a4.198 4.198 0 0 0 5.82 0c1.06-1 1.05-2.47 1.05-4v-.37c0-1.5 0-2.93-1.05-4a3.781 3.781 0 0 0-2.91-1.15Zm1.16 8a1.531 1.531 0 0 1-2.32 0c-.26-.34-.41-.69-.41-2.7 0-2.01.15-2.38.41-2.72a1.55 1.55 0 0 1 2.32 0c.26.34.41.69.41 2.72 0 2.03-.15 2.35-.41 2.7ZM68.38 196.64h6.9v-2.1h-4.51v-8.39h-2.39v10.49ZM84.44 186.11a3.816 3.816 0 0 0-2.91 1.17c-1 1-1 2.48-1 4v.35c0 1.51 0 2.94 1 4a4.22 4.22 0 0 0 5.83 0c1-1 1-2.48 1-4v-.35c0-1.51 0-2.94-1-4a3.83 3.83 0 0 0-2.92-1.17Zm1.16 8a1.52 1.52 0 0 1-2.31 0c-.26-.34-.42-.7-.42-2.7s.16-2.39.42-2.72a1.443 1.443 0 0 1 1.15-.52 1.466 1.466 0 0 1 1.16.52c.26.34.42.69.42 2.72 0 2.03-.16 2.35-.42 2.7ZM99.87 189.37h2.41a4.155 4.155 0 0 0-2.859-3.168 4.157 4.157 0 0 0-4.141 1.028c-1 1-1 2.48-1 4v.35c0 1.51 0 2.94 1 4a4.35 4.35 0 0 0 5.94 0c.76-.78 1-1.72 1-3.48v-1.39h-4v2h1.58v.28a1.562 1.562 0 0 1-1.71 1.69 1.411 1.411 0 0 1-.98-.57c-.25-.33-.42-.7-.42-2.73 0-2.03.17-2.39.42-2.72a1.426 1.426 0 0 1 1.14-.52 1.489 1.489 0 0 1 1.62 1.23ZM110.93 186.15h-2.39v10.49h2.39v-10.49ZM124.49 195a6.321 6.321 0 0 0 .59-3.43v-.35c0-1.51 0-2.94-1.05-4a4.197 4.197 0 0 0-5.82 0c-1 1-1 2.48-1 4v.35c0 1.51 0 2.94 1 4a3.815 3.815 0 0 0 2.91 1.17 3.996 3.996 0 0 0 2-.48h.08l.81.81 1.17-1.16-.77-.77.08-.14Zm-1.86-1.73-.61-.62-1.17 1.17.76.76h-.23c-.08.01-.16.01-.24 0a1.46 1.46 0 0 1-1.15-.53c-.26-.34-.42-.7-.42-2.7s.16-2.39.42-2.72a1.449 1.449 0 0 1 1.15-.52 1.468 1.468 0 0 1 1.16.52c.25.33.41.7.41 2.72-.02.82-.05 1.33-.08 1.64v.28ZM133.52 192.94v-6.83h-2.41v6.85a4 4 0 0 0 7.9 0v-6.85h-2.39v6.79a1.519 1.519 0 0 1-1.58 1.69 1.502 1.502 0 0 1-1.45-1.025 1.489 1.489 0 0 1-.07-.625ZM151.79 190.3h-3.98v-2.05h4.66v-2.1h-7.05v10.49h7.05v-2.1h-4.66v-2.14h3.98v-2.1Z"
                    fill="#E3211B"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h180.35v212.6H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a href="https://abc-transitionbascarbone.fr">
              <Image
                className="h-auto w-24"
                src="/images/misc/logo-ABC-web.png"
                alt={t("Logo de l'Association pour la transition Bas Carbone")}
                width="600"
                height="2"
              />
            </a>
          </div>
        </div>

        <LandingExplanations />
      </Main>

      <Footer />
    </>
  )
}
