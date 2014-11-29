/** @jsx REACT.DOM */
var React = require('react');
var Catalog = require('./app-catalog');
var Cart = require('./app-cart');

var APP =
  React.createClass({
    render: function () {
      return (
        <div>
          <h1>Let us Shop!</h1>
          <Catalog />
          <h1>Cart</h1>
          <Cart />
        </div>
      )
    }
  });

module.exports = APP;
