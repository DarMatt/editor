import "./style.scss";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { options } from "../../../../CONST/options";

export const Borders = ({
  handleClick,
  styles,
  handleBorderChange,
  border,
}) => {
  const handleChange = ({ target: { value, name } }) => {
    handleBorderChange({ ...border, [name]: value });
  };
  console.log('styles?.border', styles?.border)
  return (
    <div className="fieldset__borders-inner">
      <h3 className="fieldset__borders-title">Borders</h3>
      <div className="fieldset__borders-inner-line">
        <label htmlFor="select" className="fieldset__border-label">
          Style
          <select
            name="style"
            id="select"
            value={border.style}
            onChange={handleChange}
            className="fieldset__input fieldset__border-select"
          >
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="" className="fieldset__border-label">
          Size
          <input
            type="text"
            name="size"
            value={border.size}
            onChange={handleChange}
            className="fieldset__input fieldset__border-input-size"
          />
        </label>
        <label htmlFor="bg-color" className="fieldset__border-label">
          Color
          <input
            name="border"
            type="button"
            id="border"
            className="fieldset__input"
            onClick={handleClick}
            style={{ background: styles?.border }}
          />
        </label>
      </div>
      <div className="fieldset__borders-inner-angle"></div>
    </div>
  );
};
