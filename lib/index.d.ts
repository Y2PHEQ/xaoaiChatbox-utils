/// <reference types="node" />
import { IFCAU_API, IFCAU_Options, IFCAU_ListenMessage, MessageObject } from "xaoai-chatbox";
import EventEmitter from "events";
export declare const DEFAULT_USER_AGENT = "Mozilla/5.0 (Linux; Android 10; SM-G996U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36";
export declare const DEFAULT_OPTIONS: Partial<IFCAU_Options>;
export type AttachmentObject = {
    title: string;
    url_or_path: string | string[];
};
export type SendMessage = (message: string | MessageObject) => Promise<{
    threadID: string;
    messageID: string;
    timestamp: number;
}>;
export type SendAttachmentWR = (attachment: string | string[] | AttachmentObject, options?: Partial<{
    skipFailed: boolean;
    reply: boolean;
}>) => Promise<{
    threadID: string;
    messageID: string;
    timestamp: number;
}>;
export type SendAttachment = (attachment: string | string[] | AttachmentObject, options?: Partial<{
    skipFailed: boolean;
}>) => Promise<{
    threadID: string;
    messageID: string;
    timestamp: number;
}>;
export type EventMessage = Pick<IFCAU_ListenMessage, Extract<keyof IFCAU_ListenMessage, "type">> extends infer R ? Extract<IFCAU_ListenMessage, {
    type: "event";
}> extends infer S ? R & S : never : never;
export type TextMessage = Pick<IFCAU_ListenMessage, Extract<keyof IFCAU_ListenMessage, "type">> extends infer R ? Extract<IFCAU_ListenMessage, {
    type: "message" | "message_reply";
}> extends infer S ? R & S : never : never;
export type ReactionMessage = Pick<IFCAU_ListenMessage, Extract<keyof IFCAU_ListenMessage, "type">> extends infer R ? Extract<IFCAU_ListenMessage, {
    type: "message_reaction";
}> extends infer S ? R & S : never : never;
export type UnsendMessage = Pick<IFCAU_ListenMessage, Extract<keyof IFCAU_ListenMessage, "type">> extends infer R ? Extract<IFCAU_ListenMessage, {
    type: "message_unsend";
}> extends infer S ? R & S : never : never;
export type OtherMessage = Exclude<IFCAU_ListenMessage, EventMessage | TextMessage | ReactionMessage | UnsendMessage>;
export type TextMessageExtended = TextMessage & {
    send: SendMessage;
    reply: SendMessage;
    sendAttachment: SendAttachmentWR;
};
export type ReactionMessageExtended = ReactionMessage & {
    send: SendMessage;
    sendAttachment: SendAttachment;
};
export type UnsendMessageExtended = UnsendMessage & {
    send: SendMessage;
    sendAttachment: SendAttachment;
};
export type CommandsProps = {
    name: string;
    commandArgs: string[];
    message: TextMessageExtended;
};
export declare interface Client {
    on(event: "logged", listener: (api: IFCAU_API, userID: string) => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "message", listener: (message: TextMessageExtended) => void): this;
    on(event: "command", listener: (props: CommandsProps) => void): this;
    on(event: "reaction", listener: (message: ReactionMessageExtended) => void): this;
    on(event: "unsend", listener: (message: UnsendMessageExtended) => void): this;
    on(event: "others", listener: (message: OtherMessage) => void): this;
    on(event: "event", listener: (event: EventMessage) => void): this;
}
export interface ClientOptions {
    /**
     * @default null
     * @description The bot prefix to recognize commands
     */
    prefix?: string;
    /**
     * @default true
     * @description If true, the message event will not be emitted when the message is a command
     */
    ignoreMessageInCommandEvent?: boolean;
}
export declare class Client extends EventEmitter {
    #private;
    constructor(options?: ClientOptions);
    getApi(): IFCAU_API | null;
    loginWithFbState(EState: string, options: Partial<IFCAU_Options>): Promise<IFCAU_API>;
    listen(): (EventEmitter & {
        stopListening: (callback?: (() => void) | undefined) => void;
    }) | undefined;
}
//# sourceMappingURL=index.d.ts.map