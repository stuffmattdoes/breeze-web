// Server-rendered HTML template. This file is only necessary if you want to override the default genedeated HTML

import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link rel='stylesheet' href='/_next/static/style.css' />
                    <meta charset='utf-8' />
                    <title>Breeze Budgeting</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <footer><div className='footer__container'>Made by <a href='#'>Breeze</a></div></footer>
                </body>
            </html>
        )
    }
}
