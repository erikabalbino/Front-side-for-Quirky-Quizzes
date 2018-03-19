const DOMAIN = "localhost:3000";
const API_PREFIX = "/v1";
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

function getJWT() {
  return localStorage.getItem("jwt");
}

const Quiz = {
  all() {
    return fetch(`${BASE_URL}/quizzes`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/quizzes/${id}`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  delete(id) {
    return fetch(`${BASE_URL}/quizzes/${id}`, {
      headers: {
        Authorization: getJWT()
      },
      method: "DELETE"
    }).then(res => res.json());
  },
  //----------------------------------------------
  create(params) {
    return fetch(`${BASE_URL}/quizzes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  edit(params, id) {
    return fetch(`${BASE_URL}/quizzes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "PATCH",
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const Question = {
  all() {
    return fetch(`${BASE_URL}/questions`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/questions/${id}`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  create(params, quiz_id) {
    return fetch(`${BASE_URL}/quizzes/${quiz_id}/questions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  edit(params, id) {
    return fetch(`${BASE_URL}/questions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "PATCH",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  destroy(id) {
    return fetch(`${BASE_URL}/questions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "DELETE"
    });
  }
};

const Token = {
  create(params) {
    return fetch(`${BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const User = {
  create(params) {
    return fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  all() {
    return fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  reset(params) {
    return fetch(`${BASE_URL}/users/reset_password`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(params)
    })
  }
};

const QuizTaken = {
  all() {
    return fetch(`${BASE_URL}/quiz_takens`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  edit(params, id) {
    return fetch(`${BASE_URL}/quiz_takens/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "PATCH",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/quiz_takens/${id}`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  create(params) {
    return fetch(`${BASE_URL}/quiz_takens`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  delete(id) {
    return fetch(`${BASE_URL}/quiz_takens/${id}`, {
      headers: {
        Authorization: getJWT()
      },
      method: "DELETE"
    }).then(res => res.json());
  }
};

export { Quiz, Question, Token, User, QuizTaken };
