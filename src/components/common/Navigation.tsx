import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Nav, NavProps } from "react-bootstrap";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAsync } from "@/store/actions/user";
import { Routes } from "@/containers/App";

interface Props {
  menuLinks: [string, string, boolean][];
}

const Navigation: React.FC<Props> = ({ menuLinks }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLinkClick = (link: string) => () => history.push(link);

  const handleLogoutClick = () => {
    dispatch(logoutAsync());
    history.push(Routes.ROOT);
  };

  return (
    <Nav
      defaultActiveKey={menuLinks[0][0]}
      className="flex-column flex-fill"
      variant="pills"
    >
      {menuLinks.map(([link, title, isActive], i) => (
        <Nav.Link key={i} eventKey={link} onClick={handleLinkClick(link)}>
          {/* {p
            .split("_")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ")} */}
          {/* <NavLink
            //
            activeClassName="active"
            to={link}
            exact
          > */}
          {title}
          {/* </NavLink> */}
        </Nav.Link>
      ))}
      <Nav.Link
        onClick={handleLogoutClick}
        className="mt-auto"
        eventKey="logout"
      >
        - Logout
      </Nav.Link>
    </Nav>
  );
};

export default Navigation;
