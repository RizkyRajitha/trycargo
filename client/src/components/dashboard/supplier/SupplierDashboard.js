import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { addItem } from "../../../actions/stockActions";

import buisnesslogo from "../../../images/buisnesslogo.jpg";

class SupplierDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      unitPrice: "",
      description: "",
      quantity: "",
      file: null,
    };
    this.onChange = this.onChange.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }
  onChange(e) {
    if (e.target.name == "file") {
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }
  addNewItem(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("itemName", this.state.itemName);
    formdata.append("unitPrice", this.state.unitPrice);
    formdata.append("description", this.state.description);
    formdata.append("quantity", this.state.quantity);
    formdata.append("resobj", this.state.file);
    this.props.addItem(formdata, this.props.history);
  }
  displayOrders(items) {}
  render() {
    const {
      username,
      email,
      buisnessname,
      buisnessphone,
      buisnessaddress,
      workinghours,
      items = [],
    } = this.props.auth.user;
    const supplies = items.map((item) => (
      <tr key={items.indexOf(item)}>
        <td>
          <img
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            src={item.imgurl}
          ></img>
        </td>
        <td>{item.itemName}</td>
        <td>{item.unitPrice}</td>
        <td>
          <Moment format="YYYY/MM/DD">{item.addeddate}</Moment>
        </td>
        <td>{item.quantity}</td>
        <td>
          <button className="btn transparent">
            <i className="material-icons amber-text">edit</i>
          </button>
        </td>
        <td>
          <button className="btn transparent">
            <i className="material-icons red-text">delete</i>
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <br></br>
        <div className="row left-align">
          <br></br>
          <div style={{ width: "100%" }}>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="col s12 m3">
                    <div className="card grey lighten-3">
                      <div className="card-image">
                        <img src={buisnesslogo}></img>
                        <div className="card-title grey-text">
                          <h5>PROFILE: {buisnessname}</h5>
                        </div>
                      </div>
                      <div className="card-content left-align">
                        <ul className="black-text">
                          <li>Username : {username}</li>
                          <li>Email : {email}</li>
                          <li>Telephone : {buisnessphone}</li>
                          <li>Address : {buisnessaddress}</li>
                          <li>Working Hours : {workinghours}</li>
                        </ul>
                      </div>
                      <div className="card-action">
                        <a
                          href="#"
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
                            Your Current Stock
                          </h5>
                        </div>
                        <table className="highlight responsive-table">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th>Description</th>
                              <th>Price</th>
                              <th>Date added</th>
                              <th>Remaining Stock</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>{supplies}</tbody>
                        </table>
                      </div>
                      <div className="row center-align">
                        <div className="col s12">
                          <a
                            href="#addItem"
                            className="btn-floating btn-small waves-effect waves-light teal modal-trigger"
                          >
                            <i className="material-icons">add</i>
                          </a>
                          <div id="addItem" className="modal">
                            <div className="modal-content">
                              <h4>Add Item Details</h4>
                              <form noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                  <div className="input-field col s12">
                                    <input
                                      value={this.state.itemName}
                                      onChange={this.onChange}
                                      name="itemName"
                                      id="itemName"
                                      type="text"
                                    />
                                    <label htmlFor="itemName">Item Name</label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="input-field col s12">
                                    <input
                                      value={this.state.unitPrice}
                                      onChange={this.onChange}
                                      name="unitPrice"
                                      id="unitPrice"
                                      type="text"
                                    />
                                    <label htmlFor="unitPrice">
                                      Unit Price
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="input-field col s12">
                                    <input
                                      value={this.state.description}
                                      onChange={this.onChange}
                                      name="description"
                                      id="description"
                                      type="text"
                                    />
                                    <label htmlFor="description">
                                      Description
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="input-field col s12">
                                    <input
                                      value={this.state.quantity}
                                      onChange={this.onChange}
                                      name="quantity"
                                      id="quantity"
                                      type="text"
                                    />
                                    <label htmlFor="quantity">Quantity</label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="file-field input-field col s12">
                                    <div className="btn waves-effect waves-light grey darken-3">
                                      <span>File</span>
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={this.onChange}
                                      ></input>
                                    </div>
                                    <div className="file-path-wrapper">
                                      <input
                                        className="file-path validate"
                                        type="text"
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer center-align">
                              <a
                                onClick={this.addNewItem}
                                className="modal-close btn waves-effect waves-light blue darken-3"
                              >
                                Submit
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
        </div>
      </div>
    );
  }
}

SupplierDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addItem })(SupplierDashboard);
