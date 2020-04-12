import React from "react";

export default () => {
  return (
    <footer className="footer page-footer grey darken-3">
      <section className="section grey darken-3 white-text center">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <h6>Copyright &copy; {new Date().getFullYear()} TryCargo</h6>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
