/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import { AsideMenu } from "./aside-menu/AsideMenu";
import { KTUtil } from "../../../_assets/js/components/util";
import { Icon } from "@material-ui/core";

export function Aside() {
  const uiService = useHtmlClassService();

  const { permissions } = useSelector(
    (state) => ({
      permissions: state.auth.role ? state.auth.role.permissions : [],
    }),
    shallowEqual
  );

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  const tabs = {
    manage: "kt_aside_tab_1",
  };
  const [activeTab, setActiveTab] = useState("");
  const handleTabChange = (id) => {
    setActiveTab(id);
    const asideWorkspace = KTUtil.find(
      document.getElementById("kt_aside"),
      ".aside-secondary .aside-workspace"
    );

    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }

    if (id !== "") {
      document.body.classList.remove("aside-minimize");
    } else {
      document.body.classList.add("aside-minimize");
    }
  };

  return (
    <>
      <div
        id="kt_aside"
        className={`aside aside-left d-flex flex-column ${layoutProps.asideClassesFromConfig}`}
      >
        
        <div className="d-flex flex-row">
          {/* begin::Primary */}
          <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
            {/* begin::Nav Wrapper */}
            <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
              {/* begin::Nav */}
              <ul className="list-unstyled flex-column" role="tablist">
                {/* begin::Item */}
                {permissions.includes("TICKET_BOOKINGS") && (
                  <li
                    className="nav-item mb-3"
                    data-toggle="tooltip"
                    data-placement="right"
                    data-container="body"
                    data-boundary="window"
                    title="Dashboard"
                  >
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip id="dashboard">Dashboard</Tooltip>}
                    >
                      <NavLink
                        className="nav-link btn btn-icon btn-clean btn-lg"
                        to="/dashboard"
                        onClick={() => handleTabChange("")}
                      >
                        <span className="svg-icon svg-icon-lg">
                          <img
                            className="w-50"
                            src={toAbsoluteUrl("/media/aside/home.png")}
                            alt="Dashboard"
                          />
                        </span>
                        <span className="menu-text sr-only">Dashboard</span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>
                )}
                {[
                  "ROLE",
                  "USER",
                
                  "PROPERTY",
                  "OFFER",
                  "PAGE",
                  "SETTING",
                  "TICKET_PRICE_TYPE",
                  "TICKET_PRICE",
                ].filter((permission) => permissions.includes(permission))
                  .length > 0 && (
                  <li
                    className="nav-item mb-3"
                    data-toggle="tooltip"
                    data-placement="right"
                    data-container="body"
                    data-boundary="window"
                    title="Admin Panel"
                  >
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip id="manage">Manage</Tooltip>}
                    >
                      <NavLink
                        className="nav-link btn btn-icon btn-clean btn-lg"
                        to="/roles"
                        data-toggle="tab"
                        data-target={`#${tabs.manage}`}
                        onClick={() => handleTabChange(tabs.manage)}
                        role="tab"
                      >
                        <span className="svg-icon svg-icon-lg">
                          <img
                            className="w-50"
                            src={toAbsoluteUrl("/media/aside/manage.png")}
                            alt="Manage"
                          />
                        </span>
                        <span className="menu-text sr-only">Manage</span>
                      </NavLink>
                    </OverlayTrigger>
                  </li>
                )}
                {/* )} */}
                <li
                  className="nav-item mb-3"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  title="Update Profile"
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="update-profile">Update Profile</Tooltip>
                    }
                  >
                    <NavLink
                      onClick={() => handleTabChange("")}
                      className="nav-link btn btn-icon btn-clean btn-lg"
                      to="/update-profile"
                    >
                      <span className="svg-icon svg-icon-lg">
                        <img
                          className="w-50"
                          src={toAbsoluteUrl("/media/aside/update-profile.png")}
                          alt="Update Profile"
                        />
                      </span>
                      <span className="menu-text sr-only">Update Profile</span>
                    </NavLink>
                  </OverlayTrigger>
                </li>
                <li
                  className="nav-item mb-3"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  title="Change Password"
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="Change-Password">Change Password</Tooltip>
                    }
                  >
                    <NavLink
                      onClick={() => handleTabChange("")}
                      className="nav-link btn btn-icon btn-clean btn-lg"
                      to="/change-password"
                    >
                      <span className="svg-icon svg-icon-lg">
                        <img
                          className="w-50"
                          src={toAbsoluteUrl(
                            "/media/aside/change-password.png"
                          )}
                          alt="Change Password"
                        />
                      </span>
                      <span className="menu-text sr-only">Change Password</span>
                    </NavLink>
                  </OverlayTrigger>
                </li>
                <li
                  className="nav-item mb-3"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                  title="Logout"
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="admin">Logout</Tooltip>}
                  >
                    <NavLink
                      className="nav-link btn btn-icon btn-clean btn-lg"
                      to="/logout"
                    >
                      <span className="svg-icon svg-icon-lg">
                        <h4>logout</h4>
                      </span>
                    </NavLink>
                  </OverlayTrigger>
                </li>
                {/* end::Item */}
              </ul>
              {/* end::Nav */}
            </div>
            {/* end::Nav Wrapper */}

            {/* begin::Footer */}
            <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
              {/* begin::Aside Toggle */}
              {false &&
                layoutProps.asideSecondaryDisplay &&
                layoutProps.asideSelfMinimizeToggle && (
                  <>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="toggle-aside">Toggle Aside</Tooltip>
                      }
                    >
                      <span
                        className="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
                        id="kt_aside_toggle"
                      >
                        <i className="ki ki-bold-arrow-back icon-sm" />
                      </span>
                    </OverlayTrigger>
                  </>
                )}
              {/* end::Aside Toggle */}
            </div>
            {/* end::Footer */}
          </div>
          {/* end::Primary */}

          {layoutProps.asideSecondaryDisplay && (
            <>
              {/* begin::Secondary */}
              <div className="aside-secondary d-flex flex-row-fluid">
                {/* begin::Workspace */}
                <div className="aside-workspace scroll scroll-push my-2">
                  <div className="tab-content">
                    <AsideMenu
                      isActive={activeTab === tabs.manage}
                      permissions={permissions}
                    />
                  </div>
                </div>
                {/* end::Workspace */}
              </div>
              {/* end::Secondary */}
            </>
          )}
        </div>
      </div>
      {/* end::Aside */}
    </>
  );
}
