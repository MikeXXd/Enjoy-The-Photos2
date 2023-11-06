import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cc } from "../utils/cc";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

  // function returnChildren() {if (children !== null &&  children !== undefined) return children.type.name}
  // console.log('Modal Component',returnChildren() )


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

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={cc("modal", isClosing && "closing")}
    >
      <div className="overlay" onClick={onClose} />
      <div className="modal-body" style={isClosing ? {transform: 'translateX(200%)'} : undefined}>{children}</div> {/*style send the children to the right instead returning left */}
    </div>,
    document.querySelector("#portal") as HTMLElement
  );
}

export default Modal;