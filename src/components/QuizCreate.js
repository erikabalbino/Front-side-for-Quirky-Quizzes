import React, { Component } from "react";
import { Quiz } from "../lib/requests";

import { Redirect } from "react-router";
import { Radio, Form, Container, TextArea } from "semantic-ui-react";

class QuizNew extends Component {
  state = {};
  constructor(props) {
    super(props);
    // this.createQuiz = this.createQuiz.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createQuiz(quizParams) {
    Quiz.create(quizParams).then(data => {
      const { id } = data;
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSignUp = () => {} } = this.props;
    const formData = new FormData(event.currentTarget);
    // debugger

    Quiz.create({
      quiz: {
        name: formData.get("name"),
        description: formData.get("description"),
        difficulty: formData.get("difficulty"),
        quiz_points: formData.get("quiz_points")
      }
    }).then(data => {
      if (!data.errors) {
        // const jwt = data.jwt;
        // localStorage.setItem("jwt", jwt);
        // onSignUp();
        // debugger
        // history.push("/quizzes");
        // return <Redirect to="/" push={true} />
        this.props.history.push(`/quizzes/${data.id}/questions`);
      }
    });
  }

  render() {
    const { value } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Quiz name"
              placeholder="ex. JavaScript Recurring Method"
              name="name"
            />
            <Form.Input
              fluid
              label="Points"
              placeholder="ex. 800"
              name="quiz_points"
            />
          </Form.Group>
          <Form.Group inline>

            <label>Difficulty</label>
            <Form.Field
              control={Radio}
              label="Beginner"
              value="Beginner"
              name="difficulty"
            />
            <Form.Field
              control={Radio}
              label="Intermediate"
              value="Intermediate"
              name="difficulty"
            />
            <Form.Field
              control={Radio}
              label="Advanced"
              value="Advanced"
              name="difficulty"
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="Description on the quiz."
            name="description"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default QuizNew;
