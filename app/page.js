import { createClient } from 'contentful';

export default async function Home() {
  // Set up Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  // Fetch content from Contentful
  const response = await client.getEntries();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to My Contentful Website!</h1>
      <p>Below is the content from Contentful:</p>
      <ul>
        {response.items.map((item) => (
          <li key={item.sys.id}>{item.fields.title || "No title available"}</li>
        ))}
      </ul>
    </div>
  );
}
