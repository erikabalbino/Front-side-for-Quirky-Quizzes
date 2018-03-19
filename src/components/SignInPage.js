import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Divider, Container, Button, Form, Icon } from "semantic-ui-react";
import { Token } from "../lib/requests";
import "bootstrap/dist/css/bootstrap.css";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };

    this.createToken = this.createToken.bind(this);
  }

  createToken(event) {
    const { onSignIn = () => {} } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    Token.create({
      email: formData.get("email"),
      password: formData.get("password")
    }).then(data => {
      if (!data.errors) {
        localStorage.setItem("jwt", data.jwt);
        onSignIn();
        this.props.history.push("/quizzes");
      } else {
        this.setState({
          errors: [
            {
              message: "Invalid username or password"
            }
          ]
        });
      }
    });
  }
  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <main className="SignInPage" style={{ margin: "0 1rem" }}>
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

        <h2>Sign In</h2>
        {this.state.errors.map((e, i) => (
          <div className="alert" key={i}>
            {e.message}
          </div>
        ))}
        <Form onSubmit={this.createToken}>
          <Form.Field>
            <label>Email</label>

            <input
              placeholder="example@gmail.com"
              id="email"
              type="email"
              name="email"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" id="password" name="password" />
          </Form.Field>
          <Button type="submit">Sign In</Button> <small><Link to="/reset_password">Forgot Password?</Link></small>
        </Form>
      </main>
    );
  }
}

export default SignInPage;

//
// class SignInPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       errors: []
//     };
//
//     this.createToken = this.createToken.bind(this);
//   }
//
//   createToken(event) {
//     const { onSignIn = () => {} } = this.props;
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     Token.create({
//       email: formData.get("email"),
//       password: formData.get("password")
//     }).then(data => {
//       if (!data.errors) {
//         localStorage.setItem("jwt", data.jwt);
//         onSignIn();
//         this.props.history.push("/");
//       } else {
//         this.setState({
//           errors: [
//             {
//               message: "Invalid username or password"
//             }
//           ]
//         });
//       }
//     });
//   }
//
//   render() {
//     return (
//       <main className="SignInPage">
//         <h1>Sign In</h1>
//         <Form onSubmit={this.createToken}>
//           <Form.Field>
//             <label>Email</label>
//
//             <input
//               palceholder="youremail@gmail.com"
//               id="email"
//               type="email"
//               name="email"
//             />
//           </Form.Field>
//
//           <Form.Field>
//             <label>Password</label>
//             <input type="password" id="password" name="password" />
//           </Form.Field>
//           <Button type='submit'>Sign In</Button>
//         </Form>
//         <div />
//       </main>
//     );
//   }
// }
//
// export default SignInPage;
