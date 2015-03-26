
class EventEmitter {
    private listeners: any[];
    constructor() {
        this.listeners = [];
    }

    emit(event): void{
        this.listeners.forEach((listener) => {
            listener(event);
        });
    }

    addListener(listener) : any{
        this.listeners.push(listener);
        return this.listeners.length - 1;
    }
}