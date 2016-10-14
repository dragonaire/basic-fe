import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      skills: '',
      wants: ''
    };
  }

  handleInputChange(input, value) {
    this.setState({[input]: value}); 
  }

  submit() {
    console.log('submitting', this.state)
  }

  render() {
    return (
      <div>
        <h1>Hello, world.</h1>
        Email: {" "}
        <input type='text' value={this.state.email} 
            onChange={(ev) => this.handleInputChange('email', ev.target.value)}
        />
        <br/>
        Name: {" "}
        <input type='text' value={this.state.name} 
            onChange={(ev) => this.handleInputChange('name', ev.target.value)}
        />
        <br/>
        Skills: {" "}
        <input type='text' value={this.state.skills} 
            onChange={(ev) => this.handleInputChange('skills', ev.target.value)}
        />
        <br/>
        Wants: {" "}
        <input type='text' value={this.state.wants} 
            onChange={(ev) => this.handleInputChange('wants', ev.target.value)}
        />
        <br/>
        <br/>
        <button onClick={() => this.submit()}>
          Sign Up
        </button>
      </div>
    );
  }
}

