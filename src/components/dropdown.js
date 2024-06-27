import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDropdown = styled.div`
.menu {
  ${({ theme }) => theme.mixins.bigButton};
  padding: 18px 53px;
  margin: 10% auto 0;
  width: max-content;
  cursor: pointer;

  &> button {
    list-style: none;
  }
}
.nav {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
    cursor: pointer;

    &> button {
      list-style: none;
    }
}
.itemList {
    ${({ theme }) => theme.mixins.fancyList};
    position: absolute;
    margin: 5px 15px;
    font-size: var(--fz-xs);

    li {
      position: relative;
      padding-left: 15px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover,
      &:focus-visible {
        color: var(--green);
      }
    }

    &> button {
      list-style: none;
      margin: 0;
      background: transparent;
      color: var(--green);
      display: block;
    }

    &> div {
        list-style: none;
        margin: 0;
    }
    &.active {
        display: block;
    }
`;

const Dropdown = ({ activatorText, items = [], forTo = {}, callback, type }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const menu = items.map((item, index) => (
    <li role="menuitem" key={`${index}item`} onKeyPress={() => callback(item)}>
      {forTo[item]}
    </li>
  ));

  return (
    <StyledDropdown>
      <button onClick={handleOpen} className={type}>
        {forTo[activatorText]}
      </button>
      {open ? (
        <div className={`itemList ${open ? 'active' : null}`}>
          {menu.map((menuItem, index) => (
            <button key={index}>
              {React.cloneElement(menuItem, {
                onClick: () => {
                  if (activatorText !== menuItem) {
                    menuItem.props.onKeyPress();
                  }
                  setOpen(false);
                },
              })}
            </button>
          ))}
        </div>
      ) : null}
    </StyledDropdown>
  );
};

Dropdown.propTypes = {
  activatorText: PropTypes.string,
  items: PropTypes.array,
  forTo: PropTypes.map,
  callback: PropTypes.callback,
  type: PropTypes.string,
};

export default Dropdown;
