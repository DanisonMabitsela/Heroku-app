import React, { useState, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleButtonClick = () => {
    fetch(`https://api.nationalize.io?name=${name}`)
      .then((response) => response.json()) // Extract the JSON data from the API response
      .then((data) => {
        setCountry(data.country[0]); // Update the state variable with the first object in the country array
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        ref={inputRef}
        autoFocus
      />
      <button onClick={handleButtonClick}>Predict Nationality</button>
      {country && (
        <div>
          <h2>Nationality: {country.country_id}</h2>
          <p>Probability: {country.probability}</p>
        </div>
      )}
    </div>
  );
}

export default App;
