export class DiagnosticsMock {
    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static error(text: string): void;
    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static log(text: string): void;
    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static warn(text: string): void;
    static watch(): void;
    static mockLogDisable(): void;
    static mockLogEnable(): void;
}
export default DiagnosticsMock;
