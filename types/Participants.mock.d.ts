export class ParticipantMock {
    /**
     *
     * @param {number} id
     * @param {*} isActiveInCall
     * @param {*} isActiveInSameEffect
     */
    constructor(id: number, isActiveInCall: any, isActiveInSameEffect: any);
    _id: number;
    _isActiveInCall: EventSourceMock;
    _isActiveInSameEffect: EventSourceMock;
    get id(): number;
    get isActiveInCall(): EventSourceMock;
    get isActiveInSameEffect(): EventSourceMock;
}
export class ParticipantsMock {
    _self: ParticipantMock;
    _otherParticipants: any[];
    _onOtherParticipantAdded: EventSourceMock;
    _otherParticipantCount: EventSourceMock;
    _otherParticipantsInSameEffectCount: EventSourceMock;
    get self(): ParticipantMock;
    get otherParticipantCount(): EventSourceMock;
    _getParticipantByIdSync(id: any): any;
    /**
     *
     * @param {number} id
     * @returns
     */
    getParticipantById(id: number): Promise<any>;
    getAllOtherParticipants(): Promise<any>;
    _getOtherParticipantsInSameEffectSync(): any[];
    getOtherParticipantsInSameEffect(): Promise<any>;
    onOtherParticipantAdded(): EventSourceMock;
    get otherParticipantsInSameEffectCount(): EventSourceMock;
    mockAddParticipant(participant: any): Promise<void>;
    /**
     * @param {number} id
     * @param {*} isActiveInCall
     * @param {*} isActiveInSameEffect
     */
    mockParticipantOnlineChanged(id: number, isActiveInCall: any, isActiveInSameEffect: any): Promise<void>;
    mockReset(): void;
}
import EventSourceMock from "./Reactive/EventSource.mock";
