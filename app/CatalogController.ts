class CatalogControllerSecond {
    constructor(private catalogItems, private cardActions) {

    }

    addToCard(catalogItem):void {
        this.cardActions.addItem(catalogItem)
    }
}