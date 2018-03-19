import React from "react";
import { User } from "../lib/requests";
import { ListGroup, ListGroupItem, Container, Row, Col } from "reactstrap";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    User
      .all()
      .then(
        users => {
          this.setState({
            users: users
          })
        }
      );
  }

  render() {
    const { users } = this.state;
    return (
      <Container>
        <Row>
          <Col s="10">
            <ListGroup>
              <p></p>
              <h1>Admin Dashboard</h1>
              <ListGroupItem className="userSummary dashboard header">
                <div className="firstName">First Name</div>
                <div className="lastName">Last Name</div>
                <div className="totalScore">Points</div>
                <div className="numberOfBadges">Total Badges</div>
                <div className="email">Email</div>
              </ListGroupItem>
              {users.map(user => (
                <ListGroupItem className="userSummary dashboard" key={user.id}>
                  <div className="firstName">{user.first_name}</div>
                  <div className="lastName">{user.last_name}</div>
                  <div className="totalScore">{user.total_score}</div>
                  <div className="numberOfBadges">{user.number_of_badges}</div>
                  <div className="email">{user.email}</div>
                </ListGroupItem>
              ))}

            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
