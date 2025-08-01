import React, { useEffect, useState } from "react";

const Xstates = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCites, setAllCites] = useState([]);

  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [isCityDisabled, setIsCityDisabled] = useState(true);

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setAllCountries(data));
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    setIsStateDisabled(false);
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((res) => res.json())
      .then((data) => setAllStates(data));
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry && !selectedState) return;
    setIsCityDisabled(false);
    fetch(
      ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((res) => res.json())
      .then((data) => setAllCites(data));
  }, [selectedState]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <h1>Select Location</h1>

      <form style={{ display: "flex", gap: "20px" }}>
        <select
          name="country"
          id="country"
          style={{ width: "300px", padding: "8px" }}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>

          {allCountries.map((country_name) => {
            return (
              <option key={country_name} value={country_name}>
                {country_name}
              </option>
            );
          })}
        </select>

        <select
          name="state"
          id="state"
          style={{ padding: "8px" }}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={isStateDisabled}
        >
          <option value="" disabled selected>
            Select State
          </option>

          {allStates.map((state, idx) => {
            return (
              <option key={idx} value={state}>
                {state}
              </option>
            );
          })}
        </select>

        <select
          name="city"
          id="city"
          style={{ padding: "8px" }}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={isCityDisabled}
        >
          <option value="" disabled selected>
            Select City
          </option>

          {allCites.map((city, idx) => {
            return (
              <option key={idx} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </form>

      {selectedCity && (
        <h2>
          You selected <span style={{ fontSize: "30px" }}>{selectedCity}</span>,{" "}
          <span style={{ color: "gray" }}>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
};

export default Xstates;
