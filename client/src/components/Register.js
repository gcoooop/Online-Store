import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../graphql/mutations";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput(field) {
    return event => {
      this.setState({ [field]: event.target.value });
    };
  }

  handleSubmit(event, registerUser) {
    event.preventDefault();
    registerUser({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }
    });
  }

  render() {
    return (
      <Mutation 
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        >
        {registerUser => {
          return (
            <div>
              <form onSubmit={event => this.handleSubmit(event, registerUser)}>
                <input type="text" value={this.state.name} onChange={this.updateInput("name")} placeholder="Name"></input>
                <input type="text" value={this.state.email} onChange={this.updateInput("email")} placeholder="Email"></input>
                <input type="password" value={this.state.password} onChange={this.updateInput("password")} placeholder="Password"></input>
                <button>Register</button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(Register);