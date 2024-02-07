import { FormEvent, useRef } from "react";
import { useHotkeys } from 'react-hotkeys-hook'

interface ModalFormProps {
  currentTitle: string;
  saveNewTitle: (newTitle: string) => void;
  onClose: () => void;
}

const ModalFormTitleChange = ({ currentTitle, onClose, saveNewTitle }: ModalFormProps) => {
  const newTitle = useRef<HTMLInputElement>(null);
  useHotkeys("esc", onClose);

  function handleStoryTitle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newStoryTitle = newTitle.current?.value ?? "";
    if (newStoryTitle === "") return;

    saveNewTitle(newStoryTitle);
    onClose();
  }

  return (
    <div className="modal-inside inside-form">
      <h6>
        current title: <span>{currentTitle}</span>
      </h6>

      <form onSubmit={handleStoryTitle}>
        <input type="text" placeholder="New Title" ref={newTitle} autoFocus />
        <div className="btn-wrap">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ModalFormTitleChange;
