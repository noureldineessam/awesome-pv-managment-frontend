import Head from 'next/head';

const CustomHead = ({ title = "Awesome PV", description = "Awesome PV", favicon = "/favicon.ico" }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
    </Head>
);

export default CustomHead;
