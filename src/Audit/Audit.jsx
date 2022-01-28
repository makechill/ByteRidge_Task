import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import Pagination from "./Pagination";

import { Navbar, Nav } from "react-bootstrap";
import { userService } from "../_services";

var indexOfLastPost = 0;
var indexOfFirstPost = 0;
var currentPosts = [];

class Auditpage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
    const useofgr = this.props.getUsers();
    console.log("this.state.postPerPage", useofgr);
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  indexOfLastPost = 1 * 10;
  indexOfFirstPost = 10 - indexOfLastPost;

  render() {
    const { user, users } = this.props;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#features">Auditor</Nav.Link>
            <Nav.Link>
              <Link to="/login">Logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="col-md-12" style={{ width: "100%" }}>
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
          <h3>All login audit :</h3>
          {users.loading && <em>Loading users...</em>}
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}
          <input
            type="text"
            placeholder="Search"
            className="form-control"
          ></input>
          {users.items && (
            <table
              className="table col-md-12 table-bordered table-stripped"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th> Id</th>
                  <th> Role </th>
                  <th> Created Date </th>
                  <th> First Name </th>
                  <th> Last Name </th>
                </tr>
              </thead>
              <tbody>
                {users.items.slice(0, 10).map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.role}</td>
                    <td>{user.createdDate}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      {user.deleting ? (
                        <em> - Deleting...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          - ERROR: {user.deleteError}
                        </span>
                      ) : (
                        <span>
                          <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {console.log("currentPosts", currentPosts)}
        <Pagination
          postsPerPage={10}
          totalPosts={users.items ? users.items.length : [0]}
        />
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
