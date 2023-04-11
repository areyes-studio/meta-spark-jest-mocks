export class SubscriptionMock {
    /**
     * @param {Set<any>} subcriptions
     * @param {Object} subcriptionData
     * @memberof SubscriptionMock
     */
    constructor(subcriptions: Set<any>, subcriptionData: Object);
    _subcriptions: Set<any>;
    _subcriptionsData: Object;
    unsubscribe(): void;
}
export default SubscriptionMock;
