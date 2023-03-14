import EventSourceMock from './Reactive/EventSource.mock';
import SignalMock from './Reactive/EventSource.mock';

export class ParticipantMock {
    /**
     * 
     * @param {number} id 
     * @param {*} isActiveInCall 
     * @param {*} isActiveInSameEffect 
     */
    constructor(id, isActiveInCall, isActiveInSameEffect) {
        this._id = id;
        this._isActiveInCall = new SignalMock(isActiveInCall);
        this._isActiveInSameEffect = new SignalMock(isActiveInSameEffect);
    }

    get id() {
        return this._id;
    }

    get isActiveInCall() {
        return this._isActiveInCall;
    }

    get isActiveInSameEffect() {
        return this._isActiveInSameEffect;
    }
}

export class ParticipantsMock {
    constructor() {
        this._self = new ParticipantMock('self', true, true);
        this._otherParticipants = [];
        this._onOtherParticipantAdded = new EventSourceMock();
        this._otherParticipantCount = new SignalMock(0);
        this._otherParticipantsInSameEffectCount = new SignalMock(0);
    }

    get self() {
        return this._self;
    }

    get otherParticipantCount() {
        return this._otherParticipantCount;
    }

    _getParticipantByIdSync(id) {
        if (this._self.id === id) {
            return this._self;
        }
        for (const participant of this._otherParticipants) {
            if (participant.id === id) {
                return participant;
            }
        }
        return null;
    }

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    getParticipantById(id) {
        return new Promise((resolve, reject) => {
            resolve(this._getParticipantByIdSync());
        });
    }

    getAllOtherParticipants() {
        return new Promise((resolve, reject) => {
            resolve([...this._otherParticipants]);
        });
    }

    _getOtherParticipantsInSameEffectSync() {
        return this._otherParticipants.filter(participant =>
            participant.isActiveInSameEffect.pinLastValue(),
        );
    }

    getOtherParticipantsInSameEffect() {
        return new Promise((resolve, reject) => {
            resolve(this._getOtherParticipantsInSameEffectSync());
        });
    }

    onOtherParticipantAdded() {
        return this._onOtherParticipantAdded;
    }

    get otherParticipantsInSameEffectCount() {
        return this._otherParticipantsInSameEffectCount;
    }

    async mockAddParticipant(participant) {
        this._otherParticipants.push(participant);
        await this._onOtherParticipantAdded.mockCallback(participant);
        await this._otherParticipantCount.mockUpdate(this._otherParticipants.length);
        await this._otherParticipantsInSameEffectCount.mockUpdate(
            this._getOtherParticipantsInSameEffectSync().length,
        );
    }

    /**
     * @param {number} id 
     * @param {*} isActiveInCall 
     * @param {*} isActiveInSameEffect 
     */
    async mockParticipantOnlineChanged(id, isActiveInCall, isActiveInSameEffect) {
        const participant = this._getParticipantByIdSync(id);
        if (participant) {
            await participant._isActiveInCall.mockUpdate(isActiveInCall);
            await participant._isActiveInSameEffect.mockUpdate(isActiveInSameEffect);
            if (participant.isActiveInSameEffect !== isActiveInSameEffect) {
                await this._otherParticipantsInSameEffectCount.mockUpdate(
                    this._getOtherParticipantsInSameEffectSync().length,
                );
            }
        }
    }

    mockReset() {
        this._self = new ParticipantMock('self', true, true);
        this._otherParticipants = [];
        this._onOtherParticipantAdded = new EventSourceMock();
        this._otherParticipantCount = new SignalMock(0);
        this._otherParticipantsInSameEffectCount = new SignalMock(0);
    }
}