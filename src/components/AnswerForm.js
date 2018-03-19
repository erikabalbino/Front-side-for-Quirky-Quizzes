import React from 'react';
import { Button, Form } from 'semantic-ui-react';

class AnswerForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listAnswers = this.listAnswers.bind(this);
    this.state = {
      answers: []
    };
    console.log('this.state.answers: ', this.state.answers);
    //const { onSubmit = () => {} } = props;
  }
    handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      let latestBody = `body[${this.state.answers.length}]`
      const newAnswer = {
        body: formData.get(latestBody)
      };
      console.log('newAnswer: ', newAnswer);
      this.setState({
      answers: [newAnswer, ...this.state.answers]
      })
      console.log('this.state.answers: ', this.state.answers);

    };

    listAnswers() {
      let arr = []
      for (let a = 0; a < this.state.answers.length; a += 1) {
        // console.log(this.state.answers.length);
        let fieldName = `body[${a+1}]`
        arr.push(
            <Form.Field //label='Answer'
              key={a}
              name={fieldName}
              //defaultValue={this.state.answers[a].body}
              control='textarea'
              row='1'
            />
          );
      }
      return(arr)
    }

  render(){

    return(
      <div className="AnswerForm">
        <Form onSubmit={this.handleSubmit}>

          <Form.Field //label='Answer'
            name='body[0]'
            //placeholder='Add Answer here'
            control='textarea'
            row='1'
          />
          {this.listAnswers()}
          {/* <Form.Field>
            <input placeholder='Add Answer here' />
          </Form.Field> */}
          <Form.Field control='button'>Add Another Solution</Form.Field>
        </Form>
      </div>
      )
  }



}

export default AnswerForm;
