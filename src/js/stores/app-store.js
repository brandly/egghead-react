var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var CHANGE_EVENT = 'change';

// since we don't have an external db or anything, we'll put this here
var _catalog = [
  {id: 1, title: 'Widget #1', cost: 1},
  {id: 2, title: 'Widget #2', cost: 2},
  {id: 3, title: 'Widget #3', cost: 3}
];

var _cartItems = [];

function _removeItem (index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem (index) {
  _cartItems[index].qty++;
}

function _decreaseItem (index) {
  if (_cartItems[index].qty > 1) {
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
}

function _addItem (item) {
  if (!item.inCart) {
    item.qty = 1;
    item.inCart = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach(function (cartItem, i) {
      if (cartItem.id === item.id) {
        _increaseItem(i);
      }
    })
  }
}

var appStore = _.extend(EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCart: function () {
    return _cartItems;
  },

  getCatalog: function () {
    return _catalog;
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action; // this is our action from handleViewAction
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(action.index);
        break;
    }

    appStore.emitChange();

    // going into a queue of promises so we want to return something positive for a resolve
    return true;
  })
});

module.exports = appStore;
