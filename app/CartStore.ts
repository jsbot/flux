/// <reference path="EventEmitter.ts"/>
class CartStore extends EventEmitter {

    cartItems: any[]

    constructor(){
        super();
        this.cartItems = [];
    }

    addItem(catalogItem): void {
        var items = this.cartItems.filter((i) => i.catalogItem == catalogItem);
        if (items.length == 0) {
            this.cartItems.push({qty: 1, catalogItem: catalogItem});
        } else {
            items[0].qty += 1;
        }
    }

    removeItem(cartItem): void {
        var index = this.cartItems.indexOf(cartItem);
        if(this.cartItems[index].qty == 1){
            this.cartItems.splice(index, 1);
        }else{
            this.cartItems[index].qty -= 1;
        }

    }

    emitChange():void {
        this.emit("change");
    }
}