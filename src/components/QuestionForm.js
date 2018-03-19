import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Question } from "../lib/requests";
import AnswerShow from "./AnswerShow";

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfAnswers: 1,
      quizId: props.quizId
    };

    this.addAnswer = this.addAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addAnswer() {
    let numOfAnswers = this.state.numOfAnswers;
    this.setState({
      numOfAnswers: numOfAnswers + 1
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const questionBody = document.querySelector(".questionBody textarea").value;
    let answerBodies = [];
    document
      .querySelectorAll(".answerBody textarea")
      .forEach(answerBody => answerBodies.push(answerBody.value));

    const outputObj = {
      body: questionBody,
      answers_attributes: {}
    };

    for (let i = 0; i < answerBodies.length; i += 1) {
      outputObj.answers_attributes[`${i}`] = { body: answerBodies[i] };
    }
    Question.create(outputObj, this.state.quizId).then(
      window.location.reload()
    );
  }

  render() {
    return (
      <div className="QuestionForm">
        <Form onSubmit={this.handleSubmit}>
          <div className="questionBody">
            <label>Question</label>
            <textarea name="question" />
          </div>
          <AnswerShow {...this.state} />
          <input
            style={{
              color: "#858585",
              backgroundColor: "#e0e1e2",
              borderRadius: "3px",
              margin: "8px",
              height: "30px"
            }}
            className="addAnswerButton"
            type="button"
            value="Additional Answer"
            onClick={this.addAnswer}
          />
          <Form.Field
            className="saveQuestionButton"
            control="button"
            style={{
              color: "#858585",
              backgroundColor: "#e0e1e2",
              borderRadius: "3px",
              margin: "8px",
              height: "30px"
            }}
          >
            Save Question
          </Form.Field>
        </Form>
      </div>
    );
  }
}
export default QuestionForm;
