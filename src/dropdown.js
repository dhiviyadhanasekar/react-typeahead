import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/dropdown.css";

export const MenuItem = (props) => {
  const { value, onClick } = props;
  const [isSelected, setIsSelected] = useState(false);

  return (
    <li
      className="menuItem"
      role="option"
      aria-selected={isSelected}
      onMouseDown={onClick}
      onMouseOver={() => setIsSelected(true)}
      onMouseLeave={() => setIsSelected(false)}
    >
      {value}
    </li>
  );
};
MenuItem.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

const Dropdown = (props) => {
  const { items, onItemClicked } = props;

  return (
    <div id="dropdown">
      <ul role="listbox">
        {items.map(({ value, id }) => (
          <MenuItem value={value} key={id} onClick={onItemClicked} />
        ))}
      </ul>
    </div>
  );
};
Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.number
    })
  ),
  onItemClicked: PropTypes.func.isRequired
};
export default Dropdown;
