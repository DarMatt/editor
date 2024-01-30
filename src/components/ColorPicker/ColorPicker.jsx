import { SketchPicker } from "react-color";

export const ColorPicker = ({
  pickerPosition,
  innerBorderRef,
  displayColorPicker,
  styles,
  handlePickerChange,
  colorKey,
}) => {
  return (
    <div
      style={{ top: pickerPosition }}
      ref={innerBorderRef}
      className="fieldset__color-picker"
    >
      {displayColorPicker && (
        <SketchPicker color={styles[colorKey]} onChange={handlePickerChange} />
      )}
    </div>
  );
};
