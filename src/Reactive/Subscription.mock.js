export class SubscriptionMock {
    /**
     * @param {Set<any>} subcriptions
     * @param {Object} subcriptionData
     * @memberof SubscriptionMock
     */
    constructor(subcriptions, subcriptionData) {
        this._subcriptions = subcriptions;
        this._subcriptionsData = subcriptionData;
    }

    unsubscribe() {
        this._subcriptions.delete(this._subcriptionsData);
    }
}

export default SubscriptionMock