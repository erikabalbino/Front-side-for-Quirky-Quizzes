import React from 'react';
import { Divider, Container, Button, Form, Icon } from "semantic-ui-react";

function NotFound() {
  return (
    <main className="NotFound" style={{ margin: "0 1rem" }}>

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
      <h2>404: Page Not Found</h2>

    </main>
  )
}

export default NotFound;
