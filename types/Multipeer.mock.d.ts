export class EchoMessageChannelMock {
    /**
     * @param {string} topic
     */
    constructor(topic: string);
    _topic: string;
    _messageStream: EventSourceMock;
    /**
     * @param {Object} message
     * @param {boolean} realTimeChannel
     */
    sendMessage(message: Object, realTimeChannel: boolean): Promise<void>;
    get onMessage(): EventSourceMock;
}
export class MultipeerMock {
    /**@type {{[key: string]: any}} */
    _channels: {
        [key: string]: any;
    };
    getMessageChannel(topic?: string): any;
    /**
     * @param {string} topic
     * @returns {string}
     */
    getBinaryMessageChannel(topic: string): string;
}
export default MultipeerMock;
import EventSourceMock from "./Reactive/EventSource.mock";
