"use client";

import { error } from "@/functions/error";
import { deleteEvent, updateEvent } from "@/lib/api/events";
import { EventType } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import EventEditModal from "./modal/editEvent";
import { useState } from "react";

interface Props {
    event: EventType;
    token: string;
}

const Event = ({ event, token }: Props) => {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleEdit = async (data: Partial<EventType>) => {
        try {
            await updateEvent(event.id, data, token);
            toast.success("イベントを更新しました！");
            router.refresh();
        } catch (err) {
            error(err);
        }
    };

    const handleDelete = async () => {
        if (!confirm("本当に削除しますか？")) return;
        try {
            await deleteEvent(event.id, token);
            toast.success("イベントを削除しました！");
            router.refresh();
        } catch (err) {
            error(err);
        }
    };

    return (
        <>
            <div className="calendar-event flex justify-between items-center gap-2">
                <span>{event.title}</span>
                <div className="flex gap-1">
                    <button onClick={() => setIsEditOpen(true)} className="text-xs text-blue-500 hover:underline">
                        編集
                    </button>
                    <button onClick={handleDelete} className="text-xs text-red-500 hover:underline">
                        削除
                    </button>
                </div>
            </div>
            <EventEditModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                event={event}
                onSubmit={handleEdit}
            />
        </>
    );
};

export default Event;
