import EventSourceMock from './Reactive/EventSource.mock';

export class EchoMessageChannelMock {
    /**
     * @param {string} topic 
     */
    constructor(topic) {
        this._topic = topic;
        this._messageStream = undefined;
    }

    /**
     * @param {Object} message 
     * @param {boolean} realTimeChannel 
     */
    async sendMessage(message, realTimeChannel) {
        if (this._messageStream != undefined) {
            await this._messageStream.mockCallback(message);
        }
    }

    get onMessage() {
        if (this._messageStream == undefined) {
            this._messageStream = new EventSourceMock();
        }
        return this._messageStream;
    }
}

export class MultipeerMock {
    constructor() {
        /**@type {{[key: string]: any}} */
        this._channels = {};
    }

    getMessageChannel(topic = 'GLOBAL') {
        if (this._channels[topic] == undefined) {
            this._channels[topic] = new EchoMessageChannelMock(topic);
        }
        return this._channels[topic];
    }

    /**
     * @param {string} topic 
     * @returns {string}
     */
    getBinaryMessageChannel(topic) {
        if (this._channels[topic] == undefined) {
            this._channels[topic] = new EchoMessageChannelMock(topic);
        }
        return this._channels[topic];
    }
}

export default MultipeerMock