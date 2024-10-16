import { IFCAU_API } from "xaoai-chatbox";
import { AttachmentObject } from "../index.js";
import { TextMessage, TextMessageExtended, ReactionMessage, ReactionMessageExtended, UnsendMessage, UnsendMessageExtended, EventMessage } from "../index.js";
export declare function isAttachmentObject(obj: unknown): obj is AttachmentObject;
export declare function eventParser(message: EventMessage, api: IFCAU_API): Pick<import("@xaoai/chatbox").IFCAU_ListenMessage, "type"> & ({
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        image: {
            attachmentID: string;
            width: number;
            height: number;
            url: string;
        };
    };
    logMessageType: "log:thread-image";
    threadID: string;
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        addedParticipants: {
            fanoutPolicy: string;
            firstName: string;
            fullName: string;
            groupJoinStatus: string;
            initialFolder: string;
            initialFolderId: {
                systemFolderId: string;
            };
            lastUnsubscribeTimestampMs: string;
            userFbId: string;
            isMessengerUser: boolean;
        }[];
    };
    logMessageType: "log:subscribe";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        leftParticipantFbId: string;
    };
    logMessageType: "log:unsubscribe";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        name: string;
    };
    logMessageType: "log:thread-name";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        theme_color: string;
        gradient?: string | undefined;
        should_show_icon: string;
        theme_id: string;
        accessibility_label: string;
        theme_name_with_subtitle: string;
        theme_emoji?: string | undefined;
    };
    logMessageType: "log:thread-color";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        thread_quick_reaction_instruction_key_id: string;
        thread_quick_reaction_emoji: string;
        thread_quick_reaction_emoji_url: string;
    };
    logMessageType: "log:thread-icon";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        nickname: string;
        participant_id: string;
    };
    logMessageType: "log:user-nickname";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        THREAD_CATEGORY: string;
        TARGET_ID: string;
        ADMIN_TYPE: string;
        ADMIN_EVENT: "add_admin" | "remove_admin";
    };
    logMessageType: "log:thread-admins";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        removed_option_ids: string;
        question_json: string;
        event_type: "question_creation" | "update_vote" | "add_unvoted_option" | "multiple_updates";
        added_option_ids: string;
        new_option_texts: string;
        new_option_ids: string;
        question_id: string;
    };
    logMessageType: "log:thread-poll";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: {
        APPROVAL_MODE: "0" | "1";
        THREAD_CATEGORY: string;
    };
    logMessageType: "log:thread-approval-mode";
    threadID: string;
    participantIDs: string[];
} | {
    type: "event";
    author: string;
    logMessageBody: string;
    logMessageData: any;
    logMessageType: "log:thread-call";
    threadID: string;
    participantIDs: string[];
});
export declare function textMessageParser(message: TextMessage, api: IFCAU_API): TextMessageExtended;
export declare function reactionMessageParser(message: ReactionMessage, api: IFCAU_API): ReactionMessageExtended;
export declare function unsendMessageParser(message: UnsendMessage, api: IFCAU_API): UnsendMessageExtended;
//# sourceMappingURL=parser.d.ts.map