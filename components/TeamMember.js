"use client";

import Image from "next/image";

export default function TeamMember({ member }) {
  const profileImageUrl = member.fields.profileImage?.fields?.file?.url
    ? `https:${member.fields.profileImage.fields.file.url}`
    : null;

  return (
    <div className="inline-block p-4 m-2 border rounded-lg w-64 shadow-md text-center bg-white">
      {/* Profile Image */}
      {profileImageUrl ? (
        <div className="flex justify-center">
          <Image
            src={profileImageUrl}
            alt={member.fields.name || "Profile Image"}
            width={150}
            height={150}
            className="rounded-full"
            priority
            unoptimized={true}
          />
        </div>
      ) : (
        <p className="text-gray-400">No profile image available</p>
      )}

      {/* Name & Role */}
      <h3 className="text-lg font-bold mt-4">{member.fields.name || "No name available"}</h3>
      <p className="text-sm text-gray-600">{member.fields.role || "No role available"}</p>
    </div>
  );
}