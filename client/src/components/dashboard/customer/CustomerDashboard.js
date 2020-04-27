import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Swal from "sweetalert2";
import M from "materialize-css/dist/js/materialize.min.js";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Select from "react-select";
import { getStores, newOrder } from "../../../actions/stockActions";

import profileImage from "../../../images/background.jpg";
import cover from "../../../images/cover.jpg";
import axios from "axios";
class CustomerDashboard extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      addressline1: "",
      addressline2: "",
      city: "",
      district: "",
      postalcode: "",
      currentShop: {
        id: "",
        name: "",
        address: {},
        phone: "",
        email: "",
        about: "",

        items: [],
      },
      districtlist: [],
      currentOrder: [],
      netprice: "",
    };
    this.displaySupplies = this.displaySupplies.bind(this);
    this.displayOrders = this.displayOrders.bind(this);
    this.handleAddtoCart = this.handleAddtoCart.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    axios
      .get("/util/getdistrictlist")
      .then((result) => {
        // console.log(result.data.districtlist);
        var distlist = result.data.districtlist.map((ele) => {
          return { label: ele, value: ele };
        });
        // console.log(distlist);
        this.setState({ districtlist: distlist });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/apicustomer/customerdata")
      .then((result) => {
        // console.log("custoemer dataa");
        console.log(result.data);
        var datain = result.data;

        this.setState({
          addressline1: datain.addressline1,
          addressline2: datain.addressline2,
          city: datain.city,
          district: datain.district,
          postalcode: datain.postalcode,
          phone: datain.phone,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    document.addEventListener("DOMContentLoaded", function () {
      const modal = document.querySelectorAll(".modal");
      M.Modal.init(modal);
    });
    const slider = document.querySelector(".slider");
    M.Slider.init(slider, {
      height: "auto",
      indicators: false,
    });

    //Get available shops in  the district
    this.props.getStores(localStorage.jwtToken);
  }
  displayOrders(orders) {
    console.log(orders);
    const log = orders.map((order) => {
      return (
        <tr key={orders.indexOf(order)}>
          <td>{order.items}</td>
          <td>{order.store}</td>
          <td>
            <Moment format="YYYY/MM/DD">{order.date}</Moment>
          </td>
          <td>{order.cost}</td>
          <td>{order.status}</td>
        </tr>
      );
    });
    return log;
  }
  handleAddtoCart(itemId, itemName, quantity = 0, priceperunit) {
    const { currentOrder } = { ...this.state };
    const currentState = currentOrder;
    const newOrder = {
      itemName: itemName,
      quantity: quantity,
      unitPrice: priceperunit,
      itemId: itemId,
    };
    currentState.push(newOrder);
    this.setState({ currentOrder: currentState });
  }
  displayCurrentOrder() {
    const { currentOrder } = this.state;
    const cartItems = currentOrder.map((item) => (
      <tr key={currentOrder.indexOf(item)}>
        <td>{item.itemName}</td>
        <td>{item.quantity}</td>
        <td>{parseFloat(item.unitPrice) * parseFloat(item.quantity)}</td>
        <td>
          <button className="btn waves-effect waves-light red darken-3 white-text">
            <i className="material-icons">remove_shopping_cart</i>
          </button>
        </td>
      </tr>
    ));
    return cartItems;
  }
  handleOrder() {
    const array_of_prices = this.state.currentOrder.map(
      (item) => parseFloat(item.quantity) * parseFloat(item.unitPrice)
    );
    const total = array_of_prices.reduce((a, b) => a + b);

    const order = {
      ownerId: this.state.currentShop.id,
      customerId: this.props.auth.user.id,
      buisnessname: this.state.currentShop.name,
      customeraddress: this.props.auth.user.deliveryAddress,
      totalprice: total.toString(),
      items: this.state.currentOrder,
    };
    console.log(order);
    this.props.newOrder(order);
  }
  displaySupplies() {
    const supplies = this.state.currentShop.items.map((item) => (
      <tr key={item._id}>
        <td>{item.itemName}</td>
        <td>{item.unitPrice}</td>
        <td>
          <img
            style={{ width: "100px", height: "100px" }}
            src={item.imgurl}
          ></img>
        </td>
        <td>
          <div className="input-field inline">
            <input
              name={item.ItemName}
              id={item._id}
              type="number"
              min="0"
              step="1"
            />
          </div>
        </td>
        <td>
          <button
            onClick={() => {
              this.handleAddtoCart(
                item._id,
                item.itemName,
                document.getElementById(item._id).value,
                item.unitPrice
              );
            }}
            className="btn waves-effect waves-light blue darken-3 white-text"
          >
            <i className="material-icons">add_shopping_cart</i>
          </button>
        </td>
      </tr>
    ));
    // console.log(supplies);
    return supplies;
  }
  onSelectStore(index) {
    const store = this.props.supplies.shops[0];
    const { currentShop } = { ...this.state };
    const currentState = currentShop;
    currentState.id = store.id;
    currentState.name = store.buisnessname;
    currentState.address = store.address;
    currentState.phone = store.buisnessphone;
    currentState.email = store.email;
    currentState.about = store.aboutus;
    currentState.workinghours = store.workinghours;
    currentState.items = store.items;
    this.setState({ currentShop: currentState, currentOrder: [] });
  }
  displayStores(shops) {
    const shopNames = shops.map((shop) => (
      <label key={shops.indexOf(shop)}>
        <input
          id={shops.indexOf(shop)}
          name={shop.buisnessname}
          value={shop.buisnessname}
          onClick={() => {
            this.onSelectStore(shops.indexOf(shop));
          }}
          type="radio"
        />
        <span>{shop.buisnessname}</span>
      </label>
    ));
    return shopNames;
  }
  handleChangedistrict = (selectedOption) => {
    this.setState({ district: selectedOption.label });
  };

  handleEditProfile = (e) => {
    e.preventDefault();

    var payload = {
      addressline1: this.state.addressline1,
      addressline2: this.state.addressline2,
      city: this.state.city,
      district: this.state.district,
      postalcode: this.state.postalcode,
      phone: this.state.phone,
    };

    console.log(payload);

    axios
      .post("/apicustomer/editprofile", payload)
      .then((result) => {
        console.log(result.data);
        if (result.data.msg === "success") {
          axios
            .get("/apicustomer/customerdata")
            .then((result) => {
              // console.log("custoemer dataa");
              console.log(result.data);
              var datain = result.data;
              this.onCloseModal();
              this.setState({
                addressline1: datain.addressline1,
                addressline2: datain.addressline2,
                city: datain.city,
                district: datain.district,
                postalcode: datain.postalcode,
                phone: datain.phone,
              });
            })
            .catch((err) => {
              console.log(err);
            });
          Swal.fire("Saved", "your details saved successfully", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Whoops", "we got an error", "error");
      });
  };

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
        {" "}
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div
            hidden={false}
            className="modal-content"
            style={{ padding: "20 15 20 15" }}
          >
            <h4>Edit Profile</h4>
            <form noValidate onSubmit={this.handleEditProfile}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.phone}
                    onChange={(e) => this.setState({ phone: e.target.value })}
                    name="phone"
                    id="phone"
                    type="text"
                  />
                  <label htmlFor="buisnessphone">Contact Number</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.addressline1}
                    onChange={(e) =>
                      this.setState({ addressline1: e.target.value })
                    }
                    name="addressline1"
                    type="text"
                  />
                  <label htmlFor="addressline1">Address Line 1</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.addressline2}
                    onChange={(e) =>
                      this.setState({ addressline2: e.target.value })
                    }
                    name="addressline2"
                    type="text"
                  />
                  <label htmlFor="addressline2">Address Line 2</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.city}
                    onChange={(e) => this.setState({ city: e.target.value })}
                    name="city"
                    type="text"
                  />
                  <label htmlFor="city">city</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <Select
                    // defaultInputValue={[{ lable: "district", value: 1 }]}
                    options={this.state.districtlist}
                    onChange={this.handleChangedistrict}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.postalcode}
                    onChange={(e) =>
                      this.setState({ postalcode: e.target.value })
                    }
                    name="postalcode"
                    type="text"
                  />
                  <label htmlFor="postalcode">Zip/Postal Code</label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-medium waves-effect waves-light blue darken-3"
              >
                Save
              </button>
            </form>
          </div>
        </Modal>
        <div className="row">
          <div className="col s12 m3">
            <div className="card grey darken-3">
              <div className="center-align">
                <div className="card-image">
                  <img src={cover}></img>
                </div>
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
                  <li>Telephone : {this.state.phone}</li>
                  <br></br>
                  <li>
                    Address :{" "}
                    {this.state.addressline1 +
                      " " +
                      this.state.addressline2 +
                      " " +
                      this.state.city +
                      " " +
                      this.state.district +
                      " " +
                      this.state.postalcode}
                  </li>
                </ul>
              </div>
              <div className="card-action center-align">
                <button
                  onClick={() => {
                    this.onOpenModal();
                  }}
                  className="btn btn-medium waves-effect waves-light blue darken-3"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="card grey lighten-3">
              <div className="card-image">
                <img src={profileImage}></img>
              </div>
              <div className="card-content left-align">
                <div className="card-title green-text">
                  <h5>Shops in available in district</h5>
                </div>
                <br></br>
                <div>
                  <form noValidate action="#">
                    {this.displayStores(this.props.supplies.shops)}
                  </form>
                </div>
              </div>
              <div className="card-action center-align">
                <a
                  href="#"
                  data-target="viewOrders"
                  className="btn waves-effect waves-light green darken-3 modal-trigger"
                >
                  Previous Orders
                </a>
                <div id="viewOrders" className="modal">
                  <div
                    className="modal-content"
                    style={{ padding: "20 15 20 15" }}
                  >
                    <div
                      className="container card grey darken-3 center-align"
                      style={{ width: "100%", marginTop: "20px" }}
                    >
                      <h5
                        className="green-text"
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        Your Orders
                      </h5>
                    </div>
                    <br></br>
                    <table className="highlight">
                      <thead className="grey lighten-3">
                        <tr>
                          <td>Items</td>
                          <td>Store</td>
                          <td>Date</td>
                          <td>Cost</td>
                          <td>Status</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.displayOrders(this.props.supplies.orders)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m9" style={{ marginTop: "10px" }}>
            <section className="slider">
              <ul className="slides">
                <li>
                  <img className="img-responsive" src={profileImage}></img>
                  <div className="caption left-align text-black">
                    <h2>FOOD</h2>
                    <h5 className="light white-text text-darken-3 hide-on-small-only">
                      Get food delivered to your home
                    </h5>
                  </div>
                </li>
                <li>
                  <img className="img-responsive" src={profileImage}></img>
                  <div className="caption left-align">
                    <h2>MEDICINE</h2>
                    <h5 className="light white-text text-darken-3 hide-on-small-only">
                      Get your medicine delivered to your home
                    </h5>
                  </div>
                </li>
                <li>
                  <img className="img-responsive" src={profileImage}></img>
                  <div className="caption left-align">
                    <h2>DELIVARY</h2>
                    <h5 className="light white-text text-darken-3 hide-on-small-only">
                      Start delivering essential supplies to your local area
                    </h5>
                  </div>
                </li>
                <li>
                  <img className="img-responsive" src={profileImage}></img>
                  <div className="caption left-align">
                    <h2>SUPPLY</h2>
                    <h5 className="light white-text text-darken-3 hide-on-small-only">
                      Create your supply port and start distributing essential
                      supplies to your local area
                    </h5>
                  </div>
                </li>
                <li>
                  <img className="img-responsive" src={profileImage}></img>
                  <div className="caption left-align">
                    <h2>Stay Home,Stay Safe</h2>
                    <h5 className="light white-text text-darken-3 hide-on-small-only">
                      Get food delivered to your home
                    </h5>
                  </div>
                </li>
                <li>
                  <img className="img-responsive" src={profileImage}></img>
                  <div className="caption left-align">
                    <h2>SURVIVE</h2>
                    <h5 className="light white-text text-darken-3 hide-on-small-only">
                      Prepare and prevent,don't repair and repent
                    </h5>
                  </div>
                </li>
              </ul>
            </section>
            <div className="container" style={{ width: "100%" }}>
              <div className="row">
                <div
                  className="container card grey lighten-3 center-align"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <h5
                    style={{
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Supplies From{" "}
                    <span className="blue-text">
                      {this.state.currentShop.name}
                    </span>
                  </h5>
                </div>
                <table className="highlight responsive-table centered">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price per Unit</th>
                      <th>Image</th>
                      <th>Amount</th>
                      <th>Add to cart</th>
                    </tr>
                  </thead>
                  <tbody>{this.displaySupplies()}</tbody>
                </table>
              </div>
            </div>
            <div
              className="container"
              style={{ width: "100%", marginTop: "100px" }}
            >
              <div className="row">
                <div
                  className="container card grey darken-2 white-text center-align"
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
                <table className="highlight responsive-table centered">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Remove Item</th>
                    </tr>
                  </thead>
                  <tbody>{this.displayCurrentOrder()}</tbody>
                </table>
              </div>
              <div className="row center-align">
                <div className="col s12">
                  <button
                    className="btn btn-small waves-effect waves-light green darken-3 white-text"
                    onClick={this.handleOrder}
                  >
                    <i className="material-icons">shopping_basket</i>
                  </button>
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
  supplies: PropTypes.object.isRequired,
  newOrder: PropTypes.func.isRequired,
  getStores: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  supplies: state.supplies,
});

export default connect(mapStateToProps, { getStores, newOrder })(
  CustomerDashboard
);
