export default function Button({ button }) {
  return (
    <div className="mt-6">
      <a
        href={button.fields.url}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        {button.fields.label}
      </a>
    </div>
  );
}