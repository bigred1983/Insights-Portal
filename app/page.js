import { createClient } from 'contentful';
import Link from 'next/link';

export default async function Home() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "page" });

  return (
    <div className="text-center p-12">
      <h1 className="text-3xl font-bold mb-4">Available Pages</h1>
      <ul>
        {res.items.map((page) => (
          <li key={page.sys.id} className="text-lg">
            <Link href={`/${page.fields.slug}`} className="text-blue-500 hover:underline">
              {page.fields.title || "No title available"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
