import React from "react";
import { User } from "../lib/requests";
import { ListGroup, ListGroupItem, Container, Row, Col } from "reactstrap";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: this.props.user,
      loading: true
    };
  }

  componentDidMount() {
    User.all().then(users => {
      this.setState({
        users: users,
        loading: false
      });
    });

    User.one(this.state.user.id).then(user => {
      this.setState({
        user: user
      });
    });
  }

  render() {
    const { users, user, loading } = this.state;
    return (
      <Container>
        <Row>
          <Col xs="8">
            <ListGroup>
              <h1>Leaderboard</h1>

              <ListGroupItem className="userSummary header">
                <div className="firstName">First Name</div>
                <div className="lastName">Last Name</div>
                <div className="totalScore">Points</div>
                <div className="numberOfBadges">Total Badges</div>
              </ListGroupItem>
              {users.map(user => (
                <ListGroupItem className="userSummary" key={user.id}>
                  <div className="firstName">{user.first_name}</div>
                  <div className="lastName">{user.last_name}</div>
                  <div className="totalScore">{user.total_score}</div>
                  <div className="numberOfBadges">{user.number_of_badges}</div>
                </ListGroupItem>
              ))}

            </ListGroup>
          </Col>
          <Col xs="4">
            <div className="profile-box">
              <h1>Profile</h1>
              <p><strong>Name: </strong> {user.first_name} {user.last_name}</p>
              <p><strong>Email: </strong> {user.email}</p>
              <p><strong>Accumulated Points: </strong> {user.total_score}</p>
              <p><strong>Number of Badges: </strong> {user.number_of_badges}</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Leaderboard;
