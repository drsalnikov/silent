import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
//import ym from 'react-yandex-metrika';
//import { YMInitializer } from 'react-yandex-metrika';

//Router.events.on('routeChangeComplete', (url: string) => {
//	if (typeof window !== 'undefined') {
//		ym('hit', url);
//	}
//});

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return <>
		<Head>
			<title>IT champ - Silent team</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
			<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
			<meta property="og:locale" content="ru_RU" />
		</Head>
		<Component {...pageProps} />
	</>;
}

export default MyApp;
