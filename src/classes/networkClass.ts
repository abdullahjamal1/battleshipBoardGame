class NetworkClass {
    private sendHttpRequest: boolean;
    private startOnlineGame: boolean;

    constructor() {
        this.sendHttpRequest = true;
        this.startOnlineGame = false;
    }

    public setSendHttpRequest(sendHttpRequest: boolean): void {
        this.sendHttpRequest = sendHttpRequest;
    }

    public getSendHttpRequest(): boolean {
        return this.sendHttpRequest;
    }

    public setStartOnlineGame(startOnlineGame: boolean): void {
        this.startOnlineGame = startOnlineGame;
    }

    public getStartOnlineGame(): boolean {
        return this.startOnlineGame;
    }
}

export default NetworkClass;