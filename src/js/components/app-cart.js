/** @jsx REACT.DOM */
var React = require('react');
var AppStore = require('../stores/app-store');
var RemoveFromCart = require('./app-removefromcart');
var Increase = require('./app-increase');
var Decrease = require('./app-decrease');

function cartItems () {
  return {items: AppStore.getCart()}
}

var Cart = React.createClass({
  getInitialState: function () {
    return cartItems();
  },

  componentWillMount: function () {
    AppStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(cartItems());
  },

  render: function () {
    var total = 0;
    var items = this.state.items.map(function (item, i) {
      var subtotal = item.cost * item.qty;
      total += subtotal;
      return (
        <tr key={i}>
          <td><RemoveFromCart index={i} /></td>
          <td>{item.title}</td>
          <td>{item.qty}</td>
          <td>
            <Increase index={i} />
            <Decrease index={i} />
          </td>
          <td>{subtotal}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Quantity</th>
            <th></th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-right">Total</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    );
  }
})

module.exports = Cart;
