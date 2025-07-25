"use client";

import Image from "next/image";

export default function TeamMember({ member }) {
  const imageUrl = member.fields.profileImage?.fields?.file?.url
    ? `https:${member.fields.profileImage.fields.file.url}`
    : null;

  return (
    <div className="bg-white text-center p-6 rounded-2xl shadow-md w-[250px] h-full">
      {imageUrl ? (
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden mx-auto mb-4">
          <Image
            src={imageUrl}
            alt={member.fields.name || "Team Member"}
            width={150}
            height={150}
            className="object-cover w-full h-full"
            priority
            unoptimized
          />
        </div>
      ) : (
        <p className="text-gray-400 mb-4">No profile image available</p>
      )}

      <h3 className="text-lg font-bold text-gray-900">
        {member.fields.name || "Unnamed"}
      </h3>
      <p className="text-sm text-gray-600">
        {member.fields.role || "No role listed"}
      </p>
    </div>
  );
}
