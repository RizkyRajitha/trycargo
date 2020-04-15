import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import try_cargo from "../../../images/banana.jpg";

class CustomerDashboard extends Component {
  displaySupplies(items) {
    const supplies = items.map((item) => (
      <tr key={item.id}>
        <td>
          <img
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            src={try_cargo}
          ></img>
        </td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.supplier}</td>
        <td>
          <input style={{ width: "40px" }}></input>
        </td>
        <td>
          <a href="#" className="btn waves-effect waves-light">
            <i className="material-icons">add_shopping_cart</i>
          </a>
        </td>
      </tr>
    ));
    return supplies;
  }
  displayOrders(items) {
    const orders = items.map((item) => (
      <tr key={item.id}>
        <td>{item.dateOfOrder}</td>
        <td>{item.dateOfArrival}</td>
        <td>{item.description}</td>
        <td>{item.netCost}</td>
      </tr>
    ));
    return orders;
  }
  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      deliveryAddress,
    } = this.props.auth.user;
    return (
      <div>
        <br></br>
        <div className="row">
          <div className="container left">
            <div className="row">
              <div className="col s12">
                <h4>
                  Welcome{" "}
                  <span className="blue-text">
                    {firstName + " " + lastName}
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <br></br>
          <div class="contatiner">
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s4">
                    <a href="#supplies">Supplies</a>
                  </li>
                  <li className="tab col s4">
                    <a href="#orders">Orders</a>
                  </li>
                  <li className="tab col s4">
                    <a href="#support">Support</a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="supplies">
              <h4>Create your Order</h4>
              <div className="container center">
                <table className="highlight responsive-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Supplier</th>
                      <th>Quantity</th>
                      <th>Add to Cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.displaySupplies([
                      { name: "mango", price: "20", supplier: "keels" },
                      { name: "mango", price: "20", supplier: "keels" },
                      { name: "mango", price: "20", supplier: "keels" },
                      { name: "mango", price: "20", supplier: "keels" },
                      { name: "mango", price: "20", supplier: "keels" },
                      { name: "mango", price: "20", supplier: "keels" },
                    ])}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="orders">
              <h4>Your Orders</h4>
              <div className="container center">
                <table className="highlight responsive-table">
                  <thead>
                    <tr>
                      <th>Date of the Order</th>
                      <th>Date of Arrival</th>
                      <th>Description</th>
                      <th>Net Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.displayOrders([
                      {
                        dateOfOrder: "2020/04/12",
                        description: "description goes here",
                        dateOfArrival: "2020/04/15",
                        netCost: "1500",
                      },
                    ])}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomerDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CustomerDashboard);
