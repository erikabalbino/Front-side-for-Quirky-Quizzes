import React from 'react';

function AnswerShow(props) {
  const { numOfAnswers }= props;
  return (
    <div className="AnswerShow">
      {[...Array(numOfAnswers)].map((e, i) => (
        <div className="answerBody" key={i}>
          <label>Answer {i+1}</label>
          <textarea/>
        </div>
      ))}

    </div>
  )


}
export default AnswerShow;
