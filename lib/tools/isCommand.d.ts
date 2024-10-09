import { IFCAU_API } from "@xaoai/chatbox";
import { CommandsProps, TextMessage } from "../index.js";
type CommandParserReturnTypes = {
    status: true;
    data: CommandsProps;
} | {
    status: false;
    data: null;
};
export default function commandParser(message: TextMessage, prefix: string, api: IFCAU_API): CommandParserReturnTypes;
export {};
//# sourceMappingURL=isCommand.d.ts.map