import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import profileImage from "../../../images/background.jpg";

class CustomerDashboard extends Component {
  displaySupplies(items) {
    const supplies = items.map((item) => (
      <tr key={item.id}>
        <td>
          <img
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
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
      <div style={{ height: "83vh" }}>
        <br></br>
        <div className="row left-align">
          <br></br>
          <div style={{ width: "100%" }}>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="col s12 m3">
                    <div className="card grey darken-3">
                      <div className="card-image">
                        <img src={profileImage}></img>
                      </div>
                      <div className="card-content left-align">
                        <div className="card-title blue-text">
                          <h5>
                            {firstName} {lastName}
                          </h5>
                        </div>
                        <ul className="grey-text">
                          <li>Email : {email}</li>
                          <br></br>
                          <li>Telephone : {phone}</li>
                          <br></br>
                          <li>Address : {deliveryAddress}</li>
                        </ul>
                      </div>
                      <div className="card-action center-align">
                        <a
                          href="#"
                          onClick={() => {
                            Swal.fire(
                              "Success",
                              "Item has been added to your store",
                              "success"
                            );
                          }}
                          className="btn btn-medium waves-effect waves-light blue darken-3"
                        >
                          Edit Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m9">
                    <div className="container">
                      <div className="row">
                        <div
                          className="container card grey darken-3 white-text center-align"
                          style={{ width: "100%" }}
                        >
                          <h5
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            Your Current Order
                          </h5>
                        </div>
                        <table className="highlight responsive-table">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Description</th>
                              <th>Price</th>
                              <th>Date added</th>
                              <th>Quantity</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                      <div className="row center-align">
                        <div className="col s12">
                          <a
                            href="#addItem"
                            className="btn btn-small waves-effect waves-light blue darken-3 modal-trigger"
                          >
                            <i className="material-icons">add</i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
