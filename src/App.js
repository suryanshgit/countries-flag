import AddRecord from "./Components/AddRecord";
import DisplayRecord from "./Components/DisplayRecord";
import { Switch, Route, Link, Router, NavLink } from "react-router-dom";
import "./saas/App.css";

function App() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper nav-container">
          <ul className="medium ">
            <li>
              <NavLink
                to="/add-record"
                activeClassName="selected"
                className="NavLink"
              >
                Add Record
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/display-record"
                activeClassName="selected"
                className="NavLink"
              >
                Display Record
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Switch>
        <Route exact path="/">
          <DisplayRecord />
        </Route>
        <Route exact path="/add-record">
          <AddRecord />
        </Route>
        <Route exact path="/display-record">
          <DisplayRecord />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
