import { useContext } from "react";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleTempUnitChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <>
      <div className="header__toggle-container">
        <input
          type="checkbox"
          className="header__toggle-checkbox"
          id="toggle"
          checked={currentTemperatureUnit === "C"}
          onChange={handleTempUnitChange}
        />
        <label htmlFor="toggle" className="header__toggle-button">
          <span className="header__toggle-text f">F</span>
          <span className="header__toggle-text c">C</span>
        </label>
      </div>
    </>
  );
}

export default ToggleSwitch;
