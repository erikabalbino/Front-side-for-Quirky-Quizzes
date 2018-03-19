import React, { Component } from 'react';
import { Button, Container, Divider, Icon } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

class UserProfilePage extends Component {

  render () {
    return (
      <main className="UserProfilePage">
        <NavBarUser />

        <Divider />

        <Container>

          {/* Please put user content inside. Thanks. */}

        </Container>
      </main>
    )
  }

}


export default UserProfilePage
