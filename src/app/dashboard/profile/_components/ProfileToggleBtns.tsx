import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  isEditOpen: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileToggleBtns({
  isEditOpen,
  setIsEditOpen,
  isDeleteOpen,
  setIsDeleteOpen,
}: Props) {
  function toggleEdit() {
    setIsEditOpen(!isEditOpen);
  }

  function toggleDelete() {
    setIsDeleteOpen(!isDeleteOpen);
  }

  function closeAll() {
    setIsDeleteOpen(false);
    setIsEditOpen(false);
  }

  if (isEditOpen || isDeleteOpen) {
    return (
      <div className="ml-auto my-4">
        <button onClick={closeAll} className="p-2">
          <XMarkIcon className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 ml-auto my-4">
      <button onClick={toggleEdit} className="p-2">
        <PencilIcon className="size-4" />
      </button>
      <button onClick={toggleDelete} className="p-2 ml-4">
        <TrashIcon className="size-4" />
      </button>
    </div>
  );
}
