/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export function TopActions() {
  return (
    <Dropdown className="dropdown dropdown-inline mr-10" drop="down" alignRight>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
        <ul className="navi navi-hover py-5">
          <li className="navi-item">
            <a href="/logout" className="navi-link">
              <span className="navi-icon">
                <i className="flaticon-logout"></i>
              </span>
              <span className="navi-text">Logout</span>
            </a>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
