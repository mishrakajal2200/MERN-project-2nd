import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  return (
    <div className="container">
      <h1>welcome to my page</h1>
      <div className="row">
        <div className="col-md-6">
          <h5>add an avatar</h5>
        </div>
        <div className="col-md-6">
          <button>choose image</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-2">
          <p>This is avatar div</p>
        </div>
        <div className="col-md-4 ">
          <p>This is column 2</p>
        </div>
        <div className="col-md-4">
          <p>This is column 3</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
