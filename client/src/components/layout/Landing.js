import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Import User Creation Modal
import CreateUser from "../auth/CreateUser";

//Import Image Files
import groceries from "../../images/groceries.jpg";
import medicine from "../../images/medicine.jpg";
import delivary_man from "../../images/delivary.jpg";
import supply_depot from "../../images/depot.jfif";
import supply_depot2 from "../../images/store.jpg";
import food_supply from "../../images/food_supply.jfif";
import food_truck from "../../images/food_truck.jpg";
import stay_home from "../../images/stay_home.jpg";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div style={{ backgroundColor: "#f5f5f5" }}>
        {/*slider for the images*/}
        <section className="slider">
          <ul className="slides">
            <li>
              <img className="img-responsive" src={groceries}></img>
              <div className="caption left-align text-black">
                <h2>FOOD</h2>
                <h5 className="light white-text text-darken-3 hide-on-small-only">
                  Get food delivered to your home
                </h5>
              </div>
            </li>
            <li>
              <img className="img-responsive" src={medicine}></img>
              <div className="caption left-align">
                <h2>MEDICINE</h2>
                <h5 className="light white-text text-darken-3 hide-on-small-only">
                  Get your medicine delivered to your home
                </h5>
              </div>
            </li>
            <li>
              <img className="img-responsive" src={delivary_man}></img>
              <div className="caption left-align">
                <h2>DELIVARY</h2>
                <h5 className="light white-text text-darken-3 hide-on-small-only">
                  Start delivering essential supplies to your local area
                </h5>
              </div>
            </li>
            <li>
              <img className="img-responsive" src={supply_depot2}></img>
              <div className="caption left-align">
                <h2>SUPPLY</h2>
                <h5 className="light white-text text-darken-3 hide-on-small-only">
                  Create your supply port and start distributing essential
                  supplies to your local area
                </h5>
              </div>
            </li>
            <li>
              <img className="img-responsive" src={stay_home}></img>
              <div className="caption left-align">
                <h2>Stay Home,Stay Safe</h2>
                <h5 className="light white-text text-darken-3 hide-on-small-only">
                  Get food delivered to your home
                </h5>
              </div>
            </li>
          </ul>
        </section>

        {/*Section for Registration*/}

        <section className="section section-users">
          <div className="row center">
            <h4>Sign Up or Login to get Started</h4>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src={food_supply}></img>
                  </div>
                  <div className="card-content">
                    <span className="card-title center black-text">
                      Sign Up/Login to order your supplies
                    </span>
                    <div className="row"></div>
                    <div className="center">
                      <div>
                        <i className="material-icons medium black-text">
                          local_grocery_store
                        </i>
                      </div>
                      <div>
                        <a
                          style={{ height: "auto" }}
                          className="btn btn-medium teal lighten-2 waves-effect waves-light modal-trigger"
                          href="#modalCustomer"
                        >
                          <h6 className="center">Get Supplies</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src={food_truck}></img>
                  </div>
                  <div className="card-content">
                    <span className="card-title black-text center">
                      Sign Up/Login to start a delivary cart
                    </span>
                    <div className="row"></div>
                    <div className="center">
                      <div>
                        <i className="material-icons medium black-text">
                          local_shipping
                        </i>
                      </div>
                      <div>
                        <a
                          style={{ height: "auto" }}
                          className="btn btn-medium amber lighten-2 waves-effect waves-light"
                        >
                          <h6 className="center">Start Delivary</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card">
                  <div className="card-image">
                    <img src={supply_depot}></img>
                  </div>
                  <div className="card-content">
                    <span className="card-title center">
                      Sign Up/Login to add your stock for distribution
                    </span>
                    <div className="row"></div>
                    <div className="center">
                      <div>
                        <i className="material-icons medium black-text">
                          local_grocery_store
                        </i>
                      </div>
                      <div>
                        <a
                          style={{ height: "auto" }}
                          className="btn btn-medium red lighten-2 waves-effect waves-light"
                        >
                          <h6 className="center">Create Store</h6>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Modals Section*/}
        <section>
          <div className="modal s12" id="modalCustomer">
            <CreateUser history={history} userType="customer" />
          </div>
        </section>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
