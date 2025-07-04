"use client";

// Minor formatting update for clean GitHub commit.

import Image from "next/image";

export default function TeamMember({ member }) {
  const imageUrl = member.fields.profileImage?.fields?.file?.url
    ? `https:${member.fields.profileImage.fields.file.url}`
    : null;

  return (
    <div className="bg-white text-center p-6 rounded-2xl shadow-md w-full h-full">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={member.fields.name || "Team Member"}
          width={150}
          height={150}
          className="rounded-full mx-auto mb-4"
          priority
          unoptimized
        />
      ) : (
        <p className="text-gray-400">No profile image available</p>
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
