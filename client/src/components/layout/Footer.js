import React from "react";

export default () => {
  return (
    <div
      className="grey darken-3"
      style={{
        clear: "both",
        bottom: "0",
        width: "100%",
        position: "relative",
        marginTop: "-200px",
      }}
    >
      <section className="section grey darken-3 white-text center">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h6>Copyright &copy; {new Date().getFullYear()} TryCargo</h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
