import Image from 'next/image';

export default function TeamMember({ member }) {
  return (
    <div className="inline-block p-4 m-2 border rounded-lg w-64 shadow-md">
      <h3 className="text-lg font-bold">{member.fields.name || "No name available"}</h3>
      <p className="text-sm text-gray-600">{member.fields.role || "No role available"}</p>
      {member.fields.profileImage && (
        <Image
          src={`https:${member.fields.profileImage.fields.file.url}`}
          alt={member.fields.name || "Profile Image"}
          width={150}
          height={150}
          className="rounded-full mx-auto"
        />
      )}
    </div>
  );
}