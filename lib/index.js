import login from "xaoai-chatbox";
import EventEmitter from "events";
import isCommand from "./tools/isCommand.js";
import { getAppstate } from "./utils.js";
import { eventParser, reactionMessageParser, textMessageParser, unsendMessageParser, } from "./tools/parser.js";
export const DEFAULT_USER_AGENT = "Mozilla/5.0 (Linux; Android 10; SM-G996U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36";
export const DEFAULT_OPTIONS = {
    pauseLog: true,
    userAgent: DEFAULT_USER_AGENT,
};
export class Client extends EventEmitter {
    #prefix = null;
    #ignoreMessageInCommandEvent = true;
    #api = null;
    constructor(options) {
        super();
        if (typeof options?.prefix === "string" && options.prefix.length > 0)
            this.#prefix = options.prefix;
        if (typeof options?.ignoreMessageInCommandEvent === "boolean")
            this.#ignoreMessageInCommandEvent =
                options.ignoreMessageInCommandEvent;
    }
    getApi() {
        return this.#api;
    }
    #isCommand(message) {
        return isCommand(message, this.#prefix, this.#api);
    }
    async #loginWithEmail(email, password, options) {
        return login({ email, password }, { ...DEFAULT_OPTIONS, ...options }).then((api) => { });
    }
    async loginWithFbState(EState, options) {
        const appState = getAppstate(EState);
        const api = await login({ appState }, { ...DEFAULT_OPTIONS, ...options });
        this.#api = api;
        process.nextTick(() => {
            this.emit("logged", api, api.getCurrentUserID());
        });
        return api;
    }
    listen() {
        const api = this.#api;
        if (!api) {
            this.emit("error", new Error("API not initialized"));
            return;
        }
        return api.listenMqtt((err, message) => {
            if (!message)
                return this.emit("error", err ??
                    new Error("Fbstate expired/Account checkpointed/banned"));
            if (message.type === "event")
                return this.emit("event", eventParser(message, api));
            if (message.type === "message" ||
                message.type === "message_reply") {
                const command = this.#isCommand(message);
                if (command.status === true)
                    this.emit("command", command.data);
                if (command.status === true &&
                    this.#ignoreMessageInCommandEvent === true)
                    return;
                return this.emit("message", textMessageParser(message, api));
            }
            if (message.type === "message_reaction") {
                return this.emit("reaction", reactionMessageParser(message, api));
            }
            if (message.type === "message_unsend") {
                return this.emit("unsend", unsendMessageParser(message, api));
            }
            return this.emit("others", message);
        });
    }
}
