import React, { Fragment, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [data, setdata] = useState({
    country: "",
  });

  const [cdata, setcdata] = useState(null);

  const { country } = data;

  const change = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    var cont = data.country;
    try {
      Axios.get(`https://corona.lmao.ninja/v2/countries/${cont}`)
        .then((res) => {
          const i = res.data;
          setcdata(i);
        })
        .catch((err) => {
          alert("Country Not Found");
        });
    } catch (error) {
      console.log("Error occured");
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Covid-19 Track Center</h1>
            <div className="form">
              <form className="form" onSubmit={onsubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="country" className="label">
                    Country Name
                  </label>
                  <input
                    type="text"
                    id="my-input"
                    name="country"
                    value={country}
                    onChange={change}
                    className="form-control"
                    placeholder="Country Name"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                  Find
                </button>
              </form>
            </div>
          </div>
          <div className="col-12">
            {cdata === null ? (
              <h2>Enter Country</h2>
            ) : (
              <Fragment>
                <h2>
                  COVID-19 Status for {cdata.country}{" "}
                  <span>{cdata.countryInfo.iso2}</span>{" "}
                  <img
                    src={cdata.countryInfo.flag}
                    alt={cdata.countryInfo.iso3}
                  />
                </h2>
                <div className="card-columns">
                  <div className="card">
                    <label color="textSecondary">Active Cases</label>
                    <h3>{cdata.active}</h3>
                  </div>
                  <div className="card">
                    <label color="textSecondary">Cases</label>
                    <h3>{cdata.cases}</h3>
                  </div>
                  <div className="card">
                    <label color="textSecondary">Continent</label>
                    <h3>{cdata.continent}</h3>
                  </div>
                  <div className="card">
                    <label color="textSecondary">Deaths</label>
                    <h3>{cdata.active}</h3>
                  </div>
                  <div className="card">
                    <label color="textSecondary">Recovered Cases</label>
                    <h3>{cdata.recovered}</h3>
                  </div>
                  <div className="card">
                    <label color="textSecondary">Test Done</label>
                    <h3>{cdata.tests}</h3>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
