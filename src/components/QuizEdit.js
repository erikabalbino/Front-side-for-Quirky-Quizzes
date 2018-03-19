import React, { Component } from "react";
import { Quiz } from "../lib/requests";
import { Redirect } from "react-router";
import { Radio, Form, Container, TextArea } from "semantic-ui-react";
import QuizShow from "./QuizShow";

const options = [
  { key: "1", text: "Beginner", value: "Beginner" },
  { key: "2", text: "Intermediate", value: "Intermediate" },
  { key: "3", text: "Advanced", value: "Advanced" }
];

class QuizEdit extends Component {
  constructor(props) {
    super(props);
    // this.createQuiz = this.createQuiz.bind(this);
    const quizId = this.props.match.params.quizId;

    this.state = {
      name: "",
      description: "",
      difficulty: "",
      points: 0,
      quizId: quizId
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this);
    this.handleChangePoints = this.handleChangePoints.bind(this);

    Quiz.one(this.props.match.params.quizId).then(quiz => {
      this.setState({
        name: quiz.name,
        description: quiz.description,
        difficulty: quiz.difficulty,
        points: quiz.quiz_points
      });
    });
  }


  componentDidMount() {
    Quiz.one(this.props.match.params.quizId)
      .then(data => {
        this.setState(state => {
          state.Quiz = data;
          return state;
        });
      })
      .catch(err => {
        console.err("err", err);
      });
    }


  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangePoints(event) {
    this.setState({ points: event.target.value });
  }

  handleChangeDifficulty(event) {
    console.log(event.target);
    this.setState({ difficulty: event.target.value });
  }
  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit(event) {
    const { onSignUp = () => {} } = this.props;
    event.preventDefault();
    const quizId = this.state.quizId
    const formData = new FormData(event.currentTarget);
    // debugger
    Quiz.edit({
      quiz: {
        name: formData.get("name"),
        description: formData.get("description"),
        difficulty: formData.get("difficulty"),

        quiz_points: formData.get("quiz_points"),
      },
      id: quizId
    }, quizId).then(data => {
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

  componentDidMount;

  render() {
    const { value } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Quiz name"
              onChange={this.handleChangeName}
              value={this.state.name}
              placeholder="ex. JavaScript Recurring Method"
              name="name"
            />
            <Form.Input
              fluid
              label="Points"
              onChange={this.handleChangePoints}
              value={this.state.points}
              placeholder="ex. 800"
              name="quiz_points"
            />
            <Form.Input
              fluid
              label="Difficulty"
              onChange={this.handleChangeDifficulty}
              value={this.state.difficulty}
              placeholder="Beginner, Intermediate, or Advanced"
              name="difficulty"
            />
          </Form.Group>


          <Form.TextArea
            label="Description"
            value={this.state.description}
            onChange={this.handleChangeDescription}
            placeholder="Description on the quiz."
            name="description"
          />
      {/*  <Form.Group inline>
          <label>Difficulty</label>
          <Form.Field control={Radio} label='Beginner' value='Beginner'  onChange={this.handleChange} name="difficulty" checked={this.state.difficulty === "Beginner" ? "checked": ""} />
          <Form.Field checked={this.state.difficulty === "Intermediate" ? "checked": ""} control={Radio} label='Intermediate' value='Intermediate' onChange={this.handleChange} name="difficulty"/>
          <Form.Field checked={this.state.difficulty === "Advanced" ? "checked": ""} control={Radio} label='Advanced' value='Advanced'  onChange={this.handleChange} name="difficulty"/>
        </Form.Group>
          <Form.TextArea label='Description' value={this.state.description}  placeholder='Description on the quiz.' name="description"/> */}
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default QuizEdit;
