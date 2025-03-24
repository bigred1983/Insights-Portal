{contentBlocks.map((block, index) => {
  const typeId = block?.sys?.contentType?.sys?.id;

  console.log("🔍 Block index:", index);
  console.log("🧪 Block type:", typeId);
  console.log("📦 Block fields:", block?.fields);

  switch (typeId) {
    case "heroSection":
      return <SectionBlock key={block.sys.id} block={block} />;
    case "featureItem":
      return <FeatureItem key={block.sys.id} feature={block} />;
    case "teamMember":
      return <TeamMember key={block.sys.id} member={block} />;
    case "button":
      return <Button key={block.sys.id} button={block} />;
    default:
      return (
        <div key={index} className="p-4 my-4 bg-yellow-100 text-yellow-800 rounded">
          ⚠ Unsupported content type: {typeId}
        </div>
      );
  }
})}
