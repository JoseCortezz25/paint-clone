import PropTypes from "prop-types";

const Color = ({ value, setSetting }) => {
  return (
    <li
      className="option"
      style={{ backgroundColor: value }}
      onClick={() => {
        console.log("value", value);
        setSetting((prevSetting) => ({
          ...prevSetting.thickness,
          color: value,
        }));
      }}
    />
  );
};

Color.propTypes = {
  value: PropTypes.string.isRequired,
  setSetting: PropTypes.func.isRequired,
};

export { Color };
