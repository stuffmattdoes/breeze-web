// Server-rendered HTML template. This file is only necessary if you want to override the default genedeated HTML

import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
        <html>
            <body>
                <Main />
                <NextScript />
            </body>
        </html>
        )
    }
}
