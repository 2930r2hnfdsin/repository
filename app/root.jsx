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
import { useState } from 'react';

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

  // Initialize the component state with an empty response body
  const [responseBody, setResponseBody] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = event.target.elements.url.value;

    try {
      // Make an HTTP GET request using the fetch function
      const response = await fetch(url);
      const body = await response.text();
      // Update the component state with the response body
      setResponseBody(body);
    } catch (error) {
      console.error(`Error fetching URL: ${error.message}`);
      // Update the component state with an error message
      setResponseBody(`Error fetching URL: ${error.message}`);
    }
  };

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello, {name}</h1>
        <p>This is a custom storefront powered by Hydrogenafrraaa</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="url-input">Enter URL:</label>
          <input type="text" id="url-input" name="url" placeholder="https://example.com" />
          <button type="submit">Fetch URL</button>
        </form>
        {/* Display the response body */}
        <pre>{responseBody}</pre>
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
