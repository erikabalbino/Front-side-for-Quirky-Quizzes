import  React, { Compoent } from 'react';
import { Quiz } from '../lib/requests';

class AdminQuizShow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      quiz:[],
      loading: true
    };
    this.delete = this.delete.bind(this);
  }

  componentDidMount(props){
    const quizId = this.props.match.params.id;
    Quiz
      .one(questionId)
      .then(
        quiz => {
          this.setState({
            quiz: quiz,
            loading: false
          });
        }
      );
  }

  delete () {
    this.setState({
      quiz: {}
    });
  }

  render () {
    const {quiz, loading } = this.state;

    if(loading){
      return(
        <main
          className="AdminQuizShowPage"
          style={{
            margin: '0 1rem'
          }}>
          <h2>Quiz Loading...</h2>
        </main>
      )
    }

    if (!quiz.id) {
      return (
        <main
          className="QuestionShowPage"
          style={{
            margin: '0 1rem'
          }}
        >
          <h2>Quiz doesn't exist!</h2>
        </main>
      )
    }

    return (
      <main
        className="AdminQuizShowPage"
        style={{
          margin: '0 1rem'
        }}
        >
          <QuestionDetails {...question} />
          <button
            onClick={this.delete}
          >
            Delete
          </button>
          <h3>Answers</h3>
          <AnswerList
            answers={question.answers}
            onAnswerDeleteClick={this.deleteAnswer}
          />
        </main>
      )

}
