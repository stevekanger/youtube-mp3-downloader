"use client";

import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileToggleBtns from "./ProfileToggleBtns";
import ProfileEditForm from "./ProfileEditForm";
import ProfileDelete from "./ProfileDelete";

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="p-4 bg-background-secondary rounded-xl">
      <div className="flex flex-col items-center sm:flex-row ">
        <ProfileInfo />
        <ProfileToggleBtns
          isEditOpen={isEditOpen}
          setIsEditOpen={setIsEditOpen}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </div>

      {isEditOpen && <ProfileEditForm />}
      {isDeleteOpen && <ProfileDelete />}
    </div>
  );
}
