"use client";

import type { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ title, isOpen, onClose, children }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal-content">
                <button className="x-button" onClick={onClose}>
                    ×
                </button>
                <div className="title">{title}</div>
                <div className="flex justify-end gap-2">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
