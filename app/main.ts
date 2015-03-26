/// <reference path="vendor/angular.d.ts" />
/// <reference path="vendor/angular-ui-router.d.ts"/>
/// <reference path="CatalogController.ts"/>
/// <reference path="CartController.ts"/>
/// <reference path="CartStore.ts"/>
/// <reference path="EventEmitter.ts"/>

var app = angular.module('app', ['ui.router']);
app.config(function ($stateProvider: ng.ui.IStateProvider) {
        $stateProvider.state('main', {
            url: '/',
            views: {
                'main': {
                    templateUrl: "main.html",
                    controller: 'CatalogControllerSecond',
                    controllerAs: 'CatalogControllerSecond'
                }
            }
        })
    })
    .run(()=>{})
    .value("catalogItems", [
        {id: 1, title: 'Item #1', cost: 1},
        {id: 2, title: 'Item #2', cost: 2},
        {id: 3, title: 'Item #3', cost: 3}
    ])

.controller("CatalogControllerSecond", ['catalogItems','cartActions',CatalogControllerSecond])
var ADD_ITEM = "ADD_ITEM";
var REMOVE_ITEM = "REMOVE_ITEM";

app.factory("cartActions", ['dispatcher', function (dispatcher) {
    return {
        addItem(item) {
            dispatcher.emit('cartChange',{
                actionType: ADD_ITEM,
                item: item
            })
        },
        removeItem(item) {
            dispatcher.emit('cartChange',{
                actionType: REMOVE_ITEM,
                item: item
            })
        }
    };
}]);



app.service("dispatcher", EventEmitter);





app.factory("cartStore", ['dispatcher',function (dispatcher) {
    var cartStore = new CartStore();
    dispatcher.addListener('cartChange',function (action) {
        switch(action.actionType){
            case ADD_ITEM:
                cartStore.addItem(action.item);
                cartStore.emitChange();
                break;

            case REMOVE_ITEM:
                cartStore.removeItem(action.item);
                cartStore.emitChange();
                break;
        }

    });

    //expose only the public interface
    return {
       addListener: (n, l) => cartStore.addListener(n, l),
        cartItems: () => cartStore.cartItems
    };
}]);


app.controller("CartCtrl", ['cartStore', 'cartActions',CartCtrl]);