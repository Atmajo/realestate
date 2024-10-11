import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Profile = ({ src }: ProfAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>
        <Image src="/icons/user.svg" alt="user" width={32} height={32} />
      </AvatarFallback>
    </Avatar>
  );
};

export default Profile;
