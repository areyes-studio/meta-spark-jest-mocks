export class EventSourceMock {
    constructor(config: any, source: any);
    _subcriptions: Set<any>;
    _config: any;
    _source: any;
    subscribe(callback: any): SubscriptionMock;
    subscribeOnNext(callback: any): SubscriptionMock;
    subscribeWithSnapshot(snapshot: any, callback: any): SubscriptionMock;
    mockCallback(event: any): Promise<void>;
}
export default EventSourceMock;
import SubscriptionMock from "./Subscription.mock";
