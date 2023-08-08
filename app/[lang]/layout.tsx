// Initialise react-i18next
import '@/locales/i18n'
import { dir } from 'i18next'
import Script from 'next/script'

import { languages } from '@/constants/translation'
import './globals.css'

import Logo from '@/components/Logo'
import { LangProvider } from '@/contexts/LangContext'
import localFont from 'next/font/local'

const marianne = localFont({
	src: [
		{
			path: 'fonts/Marianne-Thin.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: 'fonts/Marianne-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: 'fonts/Marianne-Regular.woff2',
			weight: 'normal',
			style: 'normal',
		},
		{
			path: 'fonts/Marianne-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: 'fonts/Marianne-Bold.woff2',
			weight: 'bold',
			style: 'normal',
		},
		{
			path: 'fonts/Marianne-ExtraBold.woff2',
			weight: '800',
			style: 'normal',
		},
	],
	variable: '--font-marianne',
})

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode
	params: {
		lng: string
	}
}) {
	return (
		<html lang={lng} dir={dir(lng)}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1" />

				<link rel="icon" href="./favicon.png" />

				<link
					rel="alternate"
					hrefLang="en"
					href="https://nosgestesclimat.fr/?lang=en"
					data-react-helmet="true"
				/>
				<link
					rel="alternate"
					hrefLang="fr"
					href="https://nosgestesclimat.fr/?lang=fr"
					data-react-helmet="true"
				/>
				<link
					rel="alternate"
					hrefLang="x-default"
					href="https://nosgestesclimat.fr"
					data-react-helmet="true"
				/>

				<meta property="og:type" content="website" data-react-helmet="true" />

				<meta
					property="og:title"
					data-react-helmet="true"
					content="<%= htmlWebpackPlugin.options.title %>"
				/>

				<meta
					property="og:description"
					data-react-helmet="true"
					content="<%= htmlWebpackPlugin.options.description %>"
				/>

				<meta
					property="og:image"
					content="<%= htmlWebpackPlugin.options.logo %>"
					data-react-helmet="true"
				/>
				<meta
					name="google-site-verification"
					content="oQ9gPKS4kocrCJP6CoguSkdIKKZ6ilZz0aQw_ZIgtVc"
				/>

				<meta
					property="twitter:card"
					content="summary_large_image"
					data-react-helmet="true"
				/>

				<link rel="manifest" href="../manifest.webmanifest" />

				<meta name="theme-color" content="#5758BB" />

				{/*
          Manually setting Netlify code spliting cookie in iframe with sameSite=None and secure. 
          See : https://answers.netlify.com/t/running-split-tests-in-an-iframe-adjust-nf-ab-cookie-settings/28754
        */}
				<Script id="script-netlify">
					{`
						if (window.location.href.includes('iframe')) {
							const cookieIsSet = document.cookie.includes('nf_ab');
							if (!cookieIsSet) {
								document.cookie = "nf_ab=${Math.random()}; sameSite=None; secure=true";
								window.location.reload(); // We need to reload the page for the client to match the server
							}
						}
          `}
				</Script>
			</head>

			<body className={marianne.className}>
				<Script id="script-user-agent">{`
          const b = document.documentElement;
          b.setAttribute('data-useragent', navigator.userAgent);
        `}</Script>

				{/*
          Polyfill and source for old browser
          Add polyfill.io for a very narrow web feature
          IntersectionObserver : SAFARI 11 & 12.0  https://caniuse.com/#search=intersectionobserver
        */}
				<Script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver" />

				<Logo showText />
				<LangProvider lang={lng}>{children}</LangProvider>
			</body>
		</html>
	)
}
