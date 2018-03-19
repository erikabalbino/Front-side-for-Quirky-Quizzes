import React, { Component } from "react";
import { Container, Divider, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../index.css";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSignUp: false,
      modalLogin: false
    };

    this.signup_toggle = this.signup_toggle.bind(this);
    this.login_toggle = this.login_toggle.bind(this);
  }

  signup_toggle() {
    this.setState({
      modalSignUp: !this.state.modalSignUp
    });
  }

  login_toggle() {
    this.setState({
      modalLogin: !this.state.modalLogin
    });
  }

  render() {
    return (
      <main className="Homepage mt-5">
        <Container className="homepage-main-container">
          <Container textAlign="center" className="homepage-container mt-5">
            <Header style={{ fontSize: "65px" }}>
              Welcome to Quirky Quizzes
            </Header>
          </Container>
          <Container textAlign="center" className="homepage-container mt-3">
            <Icon name="setting" size="massive" color="red" className="m-5" />
            <Icon name="checkmark" size="massive" color="red" className="m-5" />
            <Icon
              name="location arrow"
              size="massive"
              color="red"
              className="m-5"
            />
          </Container>
          <Divider />
          <Container textAlign="center" className="homepage-container mt-3">
            <Link to="/sign_in">
              <Button
                // onClick={this.login_toggle}
                className="btn btn-dark btn-lg mr-3"
              >
                Login
              </Button>
            </Link>
            {/* <Modal
              show={this.state}
              isOpen={this.state.modalLogin}
              toggle={this.login_toggle}
              className={this.props.className}
            >
              <ModalBody>
                <SignInPage />
              </ModalBody>
            </Modal> */}
            <Link to="/sign_up">
              <Button
                // onClick={this.signup_toggle}
                className="btn btn-dark btn-lg ml-3"
              >
                Sign Up
              </Button>
            </Link>
            {/* <Modal show={this.state} isOpen={this.state.modalSignUp} toggle={this.signup_toggle} className={this.props.className}>
              <ModalHeader toggle={this.signup_toggle}>Please Sign Up</ModalHeader>
              <ModalBody>
                <SignUpPage />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.signup_toggle}>Sign Up</Button>{' '}
                <Button color="danger" onClick={this.signup_toggle}>Cancel</Button>
              </ModalFooter>
            </Modal> */}
          </Container>
        </Container>
      </main>
    );
  }
}

export default Homepage;
