class CartCtrl {
    private items: any[];
    constructor(private cartStore, private cartActions) {

        this.resetItems();

        cartStore.addListener('change',() => this.resetItems());
    }

    resetItems() {
        this.items = this.cartStore.cartItems();
    }

    removeItem(item): void {
        this.cartActions.removeItem(item)
    }
}