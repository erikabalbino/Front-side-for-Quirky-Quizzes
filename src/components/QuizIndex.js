import React, { Component } from "react";
import { Quiz, QuizTaken, User } from "../lib/requests";
import { Link } from "react-router-dom";
import { Card, Button, Container } from "semantic-ui-react";

class QuizIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: [],
      my_quizTakens: [],
      viewType: "all"
    };
    this.deleteQuiz = this.deleteQuiz.bind(this);
    this.addQuiz = this.addQuiz.bind(this);
    this.filterQuizzes = this.filterQuizzes.bind(this);
    this.allQuizzes = this.allQuizzes.bind(this);
    this.newQuizTaken = this.newQuizTaken.bind(this);
    this.deleteQuizTaken = this.deleteQuizTaken.bind(this);
  }

  componentDidMount() {
    Quiz.all().then(quizzes => {
      this.setState({
        quizzes: quizzes
      });
    });
    // QuizTaken.all().then(quizTakens => {
    //   this.setState({
    //     quizTakens: quizTakens
    //   })
    // });
  }

  addQuiz(addQuiz) {
    const { quizzes } = this.state;
  }

  findQuiz(id) {}

  allQuizzes() {
    Quiz.all().then(quizzes => {
      quizzes.forEach;
      this.setState({
        quizzes: quizzes,
        viewType: "all"
      });
    });
  }

  newQuizTaken(event) {
    const quizId = event.currentTarget.id;
    const userId = this.props.user.id;
    const outputObj = {
      user_id: userId,
      quiz_id: quizId
    };

    QuizTaken.create(outputObj).then(qt => {
      this.props.history.push(`/quizzes/${qt.quiz_id}/take_quiz/${qt.id}`);
    });
  }

  restartQuiz(event) {
    const quizTakenId = event.currentTarget.id;
    const quizId = event.currentTarget.quizid;
    this.props.history.push(`/quizzes/${quizId}/take_quiz/${quizTakenId}`);
  }

  deleteQuizTaken(event) {
    const quizTakenId = event.currentTarget.id;
    QuizTaken.delete(quizTakenId).then(() => {
      User.one(this.props.user.id).then(user => {
        this.setState({
          my_quizTakens: user.quiz_takens,
          viewType: "filtered"
        });
      });
    });
  }

  filterQuizzes() {
    User.one(this.props.user.id).then(user => {
      this.setState({
        my_quizTakens: user.quiz_takens,
        viewType: "filtered"
      });
    });
  }

  deleteQuiz(event) {
    const { currentTarget } = event;
    let quizId = currentTarget.id;
    Quiz.delete(quizId).then(quizzes => this.setState({ quizzes }));
  }

  render() {
    const { quizzes, viewType, my_quizTakens } = this.state;
    const { user } = this.props;

    if (user.is_admin) {
      return (
        <Container>
          <Button
            basic
            floated="right"
            color="blue"
            style={{
              marginTop: "20px",
              marginBottom: "20px"
            }}
          >
            <Link to="/quizcreate">New Quiz</Link>
          </Button>
          <div
            className="ui two buttons"
            style={{
              marginTop: "75px",
              marginLeft: "25px",
              borderRadius: "0px",
              display: "flex",
              alignItems: "center"
            }}
          />
          <main
            className="QuizIndex"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "1100px",
                borderRadius: "10px",
                border: "1px solid grey",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {quizzes.map(quiz => (
                <Card
                  key={quiz.id}
                  style={{
                    minWidth: "240px",
                    margin: "10px"
                  }}
                >
                  <Card.Content header={quiz.name} />
                  <Card.Content description={quiz.description} />
                  <Card.Content content={`Difficulty: ${quiz.difficulty}`} />
                  <Card.Content content={`Max Points: ${quiz.quiz_points}`} />
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button id={quiz.id} basic color="green">
                        <Link to={`/quizzes/${quiz.id}/questions`}>
                          View/Edit
                        </Link>
                      </Button>
                      <Button
                        id={quiz.id}
                        basic
                        color="red"
                        onClick={this.deleteQuiz}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </main>
        </Container>
      );
    } else if (viewType === "all") {
      return (
        <Container>
          <div
            className="ui two buttons"
            style={{
              marginTop: "75px",
              marginLeft: "25px",
              borderRadius: "0px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Button
              style={{ maxWidth: "150px", margin: "2px" }}
              onClick={this.filterQuizzes}
            >
              My Quizzes
            </Button>
            <Button.Or />
            <Button
              style={{ maxWidth: "150px", margin: "2px" }}
              onClick={this.allQuizzes}
            >
              All Quizzes
            </Button>
          </div>
          <main
            className="QuizIndex"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "1100px",
                borderRadius: "10px",
                border: "1px solid grey",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {quizzes.map(quiz => (
                <Card
                  key={quiz.id}
                  style={{
                    minWidth: "240px",
                    margin: "10px"
                  }}
                >
                  <Card.Content header={quiz.name} />
                  <Card.Content description={quiz.description} />
                  <Card.Content extra style={{ textAlign: "center" }}>
                    {/* <strong>
                      Taken: {3} times | Score {34}%
                    </strong> */}
                  </Card.Content>

                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button
                        onClick={this.newQuizTaken}
                        id={quiz.id}
                        basic
                        color="green"
                      >
                        Start!
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </main>
        </Container>
      );
    } else {
      return (
        <Container>
          <div
            className="ui two buttons"
            style={{
              marginTop: "75px",
              marginLeft: "25px",
              borderRadius: "0px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Button
              style={{ maxWidth: "150px", margin: "2px" }}
              onClick={this.filterQuizzes}
            >
              My Quizzes
            </Button>
            <Button.Or />
            <Button
              style={{ maxWidth: "150px", margin: "2px" }}
              onClick={this.allQuizzes}
            >
              All Quizzes
            </Button>
          </div>
          <main
            className="QuizIndex"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "1100px",
                borderRadius: "10px",
                border: "1px solid grey",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {my_quizTakens.map(quiz_taken => (
                <Card
                  key={quiz_taken.id}
                  quiz={quiz_taken.quiz.id}
                  style={{
                    minWidth: "240px",
                    margin: "10px"
                  }}
                >
                  <Card.Content header={quiz_taken.quiz.name} />
                  <Card.Content description={quiz_taken.quiz.description} />
                  <Card.Content extra style={{ textAlign: "center" }}>
                    <strong>
                      Score:{" "}
                      {quiz_taken.score
                        ? `${quiz_taken.score /
                            quiz_taken.quiz.quiz_points *
                            100}%`
                        : "Incomplete"}
                    </strong>
                  </Card.Content>

                  <Card.Content extra>
                    <div>
                      {quiz_taken.score ? (
                        <Button
                          onClick={this.deleteQuizTaken}
                          id={quiz_taken.id}
                          basic
                          fluid
                          color="red"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Link
                          to={`/quizzes/${quiz_taken.quiz.id}/take_quiz/${
                            quiz_taken.id
                          }`}
                        >
                          <Button
                            // onClick={this.restartQuiz}
                            id={quiz_taken.id}
                            quizId={quiz_taken.quiz_id}
                            basic
                            fluid
                            color="green"
                          >
                            Start!
                          </Button>
                        </Link>
                      )}
                      {/* <Button
                        onClick={this.newQuizTaken}
                        id={quiz_taken.id}
                        basic
                        color="green"
                      >
                        Start!
                      </Button>

                      <Button
                        onClick={this.deleteQuizTaken}
                        id={quiz_taken.id}
                        basic
                        fluid
                        color="red"
                      >
                        Remove
                      </Button> */}
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </main>
        </Container>
      );
    }
  }
}

export default QuizIndex;
