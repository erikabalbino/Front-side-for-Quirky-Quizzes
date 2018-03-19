import React from 'react';
import { Icon, Divider, Radio, Form, Container, TextArea} from 'semantic-ui-react';

import { User } from '../lib/requests';


class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    User.reset({
      email: formData.get("email")
    })
    this.setState({ visible: true });
  }


  render() {
    return (
      <main className="ResetPassword" style={{ margin: "0 1rem" }}>

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
        <h1>Reset Password</h1>

        <Form onSubmit={this.sendEmail} >
          <Form.Field>
            <label>Email</label>

            <input
              id="email"
              type="email"
              name="email"
            />
          </Form.Field>
          <Form.Button>Submit</Form.Button>
        </Form>


      </main>
    )
  }
}

export default ResetPassword;
