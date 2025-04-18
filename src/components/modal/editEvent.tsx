"use client";

import Modal from "../modal";
import { useState } from "react";
import { EventType } from "@/types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    event: EventType;
    onSubmit: (data: Partial<EventType>) => void;
}

const EditEventModal = ({ isOpen, onClose, event, onSubmit }: Props) => {
    const [title, setTitle] = useState(event.title);
    const [date, setDate] = useState(event.date);

    const handleSave = () => {
        onSubmit({ title });
        onClose();
    };
    // TODO: タイトル以外も編集できるようにする

    return (
        <Modal title="イベントを編集" isOpen={isOpen} onClose={onClose}>
            <label htmlFor="eventName">イベント名</label>
            <input
                id="eventName"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="イベント名"
            />
            <label htmlFor="date">日付</label>
            <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                保存
            </button>
        </Modal>
    );
};

export default EditEventModal;
