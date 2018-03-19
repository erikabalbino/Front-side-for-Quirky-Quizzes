import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Question, Quiz, QuizTaken } from "../lib/requests";

class QuestionShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      quiz: [],
      questionIds: [], //array of questionIDs
      quizLength: 0, //length of quiz
      currentQuestionIndex: 0,
      answered: false,
      correctAnswers: 0,
      isCorrect: false,
      answers: [],
      userAnswer: [],
      errors: [],
      showResults: false
    };
    this.answerQuestion = this.answerQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.completeQuiz = this.completeQuiz.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  componentDidMount() {
    // const questionId = this.props.match.params.questionId;
    const quizId = this.props.match.params.quizId;
    const quizTakenId = this.props.match.params.quizTakenId;
    console.log(quizTakenId);
    // Question.one(questionId).then(question => {
    //   this.setState({ question: question, answers: question.answers });
    // });
    // Quiz.all().then(quizzes => {
    //   this.setState({
    //     quizzes: quizzes,
    //     quizLength: quizzes.length,
    //     questionIds: quizzes.map(quiz => quiz.id)
    //   });
    // });
    Quiz.one(quizId).then(quiz => {
      this.setState({
        question: quiz.questions[0],
        answers: quiz.questions[0].answers,
        quiz: quiz,
        quizLength: quiz.questions.length,
        questionIds: quiz.questions.map(question => question.id)
      });
    });
    console.log(this.state);
  }

  answerQuestion(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    this.setState({
      answered: true,
      userAnswer: formData.get("Answer"),
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      isCorrect:
        this.state.answers.filter(
          answer => answer.body === this.state.userAnswer
        ).length > 0
    });
  }

  nextQuestion() {
    this.setState({
      question: this.state.quiz.questions[this.state.currentQuestionIndex],
      // questionIds: [], //array of questionIDs
      // quizLength: null, //length of quiz
      // currentQuestionIndex: 0,
      answered: false,
      correctAnswers:
        this.state.answers.filter(
          answer => answer.body === this.state.userAnswer
        ).length > 0
          ? (this.state.correctAnswers += 1)
          : this.state.correctAnswers,
      answers: this.state.quiz.questions[this.state.currentQuestionIndex]
        .answers,
      userAnswer: [],
      errors: []
    });
  }

  completeQuiz() {
    console.log(this.props.match.params.quizTakenId);
    QuizTaken.edit(
      {
        id: this.props.match.params.quizTakenId,
        correct_answers: this.state.correctAnswers
      },
      this.props.match.params.quizTakenId
    ).then(this.props.history.push("/quizzes"));
  }

  showResults() {
    this.setState({
      correctAnswers:
        this.state.answers.filter(
          answer => answer.body === this.state.userAnswer
        ).length > 0
          ? (this.state.correctAnswers += 1)
          : this.state.correctAnswers,
      showResults: true
    });
  }

  render() {
    return (
      <div>
        <h2>Quiz: {this.state.quiz.name}</h2>
        <h3>Question: {this.state.question.body}</h3>

        <Form onSubmit={this.answerQuestion}>
          <Form.Field>
            <label>Submit your Answer:</label>

            <input
              placeholder="Enter your answer here"
              id="Answer"
              type="text"
              name="Answer"
            />
          </Form.Field>
          <Button type="submit">Answer Question</Button>
        </Form>
        <div
          style={
            this.state.answered ? { display: "block" } : { display: "none" }
          }
        >
          <br />
          <h3>
            {this.state.answers.filter(
              answer => answer.body === this.state.userAnswer
            ).length > 0
              ? "Correct!"
              : "Incorrect"}
          </h3>
          <h4>
            Your Answer: <strong>{this.state.userAnswer}</strong>
          </h4>
          <h4>Valid Answers:</h4>

          <ul>{this.state.answers.map(answer => <li>{answer.body}</li>)}</ul>
          {this.state.quizLength === this.state.currentQuestionIndex ? (
            <Button color="red" onClick={this.showResults}>
              See Results
            </Button>
          ) : (
            <Button onClick={this.nextQuestion}>Next Question</Button>
          )}
          <div
            style={
              this.state.showResults
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <br />
            <h2>
              You Scored: {this.state.correctAnswers}/{this.state.quizLength}
            </h2>
            <br />
            <Button onClick={this.completeQuiz}>Back to Quizzes</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionShow;
