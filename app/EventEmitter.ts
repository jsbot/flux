
class EventEmitter {
    private listeners: any[];
    constructor() {
        this.listeners = [];
    }

    emit(event, data): void{
        this.listeners[event](data);
    }

    addListener(name, listener) : any{
        this.listeners[name] = listener;
        return this.listeners[name];
    }
}