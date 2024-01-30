import "./style.scss";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { useDebounce } from "../../hooks/useDebounce";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import { Borders } from "./widgets/Borders/Borders";
import { ColorPicker } from "../ColorPicker/ColorPicker";

export const initialBorderState = {
  style: "solid",
  size: "1px",
  color: "#3865af",
};

const initialColorState = {
  color: "",
  background: "",
  border: "#3865af",
};

export const EditorForm = ({ setElement, contentRef }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [openElStyle, setOpenElStyle] = useState(false);
  const [value, setValue] = useState(
    "<h3 style='font-weight: 200'>Add some layout :)</h3>"
  );
  const [styles, setStyles] = useState(initialColorState);
  const [pickerPosition, setPickerPosition] = useState(0);
  const [colorKey, setColorKey] = useState(null);
  const [border, setBorder] = useState(initialBorderState);
  const debouncedSearchTerm = useDebounce(value, 1300);
  const { innerBorderRef } = useOnOutsideClick(() =>
    setDisplayColorPicker(false)
  );

  useEffect(() => {
    setElement(value);
  }, [debouncedSearchTerm]);

  const handleClick = ({ clientY, target: { name } }) => {
    setDisplayColorPicker(!displayColorPicker);
    setColorKey(name);
    setPickerPosition(clientY);
  };

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handlePickerChange = (color) => {
    contentRef.current.style[colorKey] =
      colorKey === "border"
        ? Object.values(border).slice(0, 1).join(' ') + ` ${color.hex}`
        : color.hex;
    setStyles((prev) => ({ ...prev, [colorKey]: color.hex }));
  };

  const handleBorderChange = (value) => {
    setBorder(value);
    contentRef.current.style.border = Object.values(value).join(" ");
  };

  return (
    <form action="submit" className="form">
      <label
        htmlFor="textarea"
        className={classNames(`form__textarea`, {
          "form__textarea--false": openElStyle,
        })}
      >
        <legend>Custom HTML Code</legend>
        <textarea
          className="form__field"
          name="textarea"
          id="textarea"
          value={value}
          onChange={handleChange}
        ></textarea>
      </label>

      <fieldset
        className={classNames(`form__fieldset fieldset`, {
          "fieldset--close": openElStyle,
        })}
      >
        <div
          className="fieldset__elements-btn"
          onClick={() => setOpenElStyle(!openElStyle)}
        >
          <span className="fieldset__elements-title">element styles</span>
          <div className="fieldset__elements-arrow"></div>
        </div>
        <legend>Colors</legend>
        <div className="fieldset__elements-inner">
          <div className="fieldset__colors-inner">
            <label htmlFor="color" className="fieldset__label">
              Text Color
              <input
                name="color"
                type="button"
                id="color"
                className="fieldset__input"
                onClick={handleClick}
                style={{ background: styles?.color }}
              />
            </label>
            <label htmlFor="bg-color" className="fieldset__label">
              Background Color
              <input
                name="background"
                type="button"
                id="background"
                className="fieldset__input"
                onClick={handleClick}
                style={{ background: styles?.background }}
              />
            </label>
          </div>
          <Borders
            handleClick={handleClick}
            styles={styles}
            handleBorderChange={handleBorderChange}
            border={border}
          />
        </div>
        <ColorPicker
          pickerPosition={pickerPosition}
          innerBorderRef={innerBorderRef}
          displayColorPicker={displayColorPicker}
          styles={styles}
          handlePickerChange={handlePickerChange}
          colorKey={colorKey}
        />
      </fieldset>
    </form>
  );
};
