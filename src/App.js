import React from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import ResetPassword from "./components/ResetPassword";
import QuestionShow from "./components/QuestionShow";
import QuestionForm from "./components/QuestionForm";
import NavBarUser from "./components/NavBarUser";
import QuizIndex from "./components/QuizIndex";
import QuizShow from "./components/QuizShow";
import Leaderboard from "./components/Leaderboard";
import AuthRoute from "./components/AuthRoute";
import QuizCreate from "./components/QuizCreate";
import AdminDashboard from './components/AdminDashboard';
import QuizEdit from './components/QuizEdit';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    this.signIn();
  }

  signIn() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signOut() {
    localStorage.removeItem("jwt");
    this.setState({
      user: null
    });
  }

  isSignedIn() {
    return !!this.state.user;
  }

  render() {
    // console.log(this.state.quiz);
    return (
      <Router>
        <div>
          <NavBarUser user={this.state.user} onSignOut={this.signOut} />

          <Switch>
            <Route exact path="/" component={Homepage} />

            <Route
              exact
              path="/sign_up"
              render={props => <SignUpPage {...props} onSignUp={this.signIn} />}
            />

            <Route
              exact
              path="/reset_password"
              component={ResetPassword}
            />


            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              user={this.state.user}
              exact
              path="/quizzes"
              component={QuizIndex}
            />





          <AuthRoute
            isAuthenticated={this.isSignedIn()}
            exact
            path="/quizzes/:quizId"
            component={QuizEdit}
         />


            <Route
              exact
              path="/sign_in"
              render={props => <SignInPage {...props} onSignIn={this.signIn} />}
            />
            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              onSignIn={this.signIn}
              user={this.state.user}
              exact
              path="/quizzes/:quizId/take_quiz/:quizTakenId"
              component={QuestionShow}
            />

            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              exact
              path="/quizcreate"
              component={QuizCreate}
            />
            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              user={this.state.user}
              exact
              path="/leaderboard"
              component={Leaderboard}
            />
            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              exact
              path="/quizzes/:quizId/questions"
              component={QuizShow}
            />
            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              exact
              path="/dashboard"
              component={AdminDashboard}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
