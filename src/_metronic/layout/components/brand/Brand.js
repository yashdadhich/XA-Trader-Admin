import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_helpers";
import { TopActions } from "../subheader/components/TopActions";
import { BsBell, BsHouse } from "react-icons/bs"; // Import notification and home icons

export function Brand() {
  return (
    <>
      {/* begin::Brand */}
      <div className="aside-brand d-none d-lg-flex justify-content-between pl-3 py-3 py-lg-5 border-bottom position-fixed w-100 bg-white" style={{ zIndex: 99 }}>
        <div className="brand-link d-flex align-items-center">
          {/* begin::Logo */}
          <Link to="" className="brand-image">
            <img
              alt="logo"
              src={toAbsoluteUrl("/media/logos/X-Trader-Admin.jpg")}
              style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", border: "2px solid #ddd" }}
            />
          </Link>
          {/* end::Logo */}
          <div className="ml-3">
            <h3 className="mb-0">
              <Link to="/" style={{ color: "#333", textDecoration: "none" }}>XA Trader Admin</Link>
            </h3>
            <p className="text-muted mb-0">Your ultimate trading platform</p>
          </div>
        </div>
        <div className="d-flex align-items-center ml-auto">
          {/* Notification icon */}
          <Link to="/notifications" className="mr-3 text-dark">
            <BsBell size={24} />
          </Link>
          {/* Home icon */}
          <Link to="/" className="text-dark">
            <BsHouse size={24} />
          </Link>
        </div>
        <TopActions />
      </div>
      {/* end::Brand */}
    </>
  );
}
