import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomModal = ({ children, isOpen, onClose }: PortalProps) => {
  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }

      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal" >
        {children}
      </div>
    </div>,
    document.querySelector("#portal") as HTMLElement
  );
};
