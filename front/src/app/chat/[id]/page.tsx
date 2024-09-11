import ChatBase from "@/components/chat/ChatBase";
import React from "react";

export default function chat({ params }: { params: { id: string; }; }) {
    console.log("The group id is", params.id);
    return (
        <div>
            <h1>Hello i am chat</h1>
            <ChatBase groupId={params.id} />
        </div>
    );
}
