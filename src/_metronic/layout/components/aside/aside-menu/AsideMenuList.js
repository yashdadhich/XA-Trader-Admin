/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive, toAbsoluteUrl } from "../../../../_helpers";

export function AsideMenuList({ layoutProps, permissions }) {
  const location = useLocation();

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  console.log("permissions", permissions);

  const menuItems = [
    { title: "Role", key: "ROLE", url: "/roles", icon: "role.png" },
    { title: "User", key: "USER", url: "/users", icon: "user.png" },
  ];

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {menuItems.map((menuItem) => {
          const key = `LIST_${menuItem.key}`;


          return permissions.includes(menuItem.key) ? (
            <li
              className={`menu-item ${getMenuItemActive(menuItem.url, false)}`}
              aria-haspopup="true"
              key={key}
            >
              <NavLink className="menu-link p-3" to={menuItem.url}>
                <span className="svg-icon svg-icon-lg">
                  <img
                    style={{
                      width: "20px",
                      marginRight: "20px",
                      fontWeight: "450",
                    }}
                    src={toAbsoluteUrl(`/media/asideList/${menuItem.icon}`)}
                    alt="Dashboard"
                  />
                </span>
                <span className="menu-text">{menuItem.title}</span>
              </NavLink>
            </li>
          ) : null;
        })}
        {/*end::1 Level*/}
      </ul>
      {/* end::Menu Nav */}
    </>
  );
}
