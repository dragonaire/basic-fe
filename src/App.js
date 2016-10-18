import React, { Component } from 'react'
import $ from 'jquery'
window.$ = $

const API_SERVER = 'http://localhost:5000'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      name: '',
      skills: '',
      wants: '',
      submitted: false
    }
  }

  handleInputChange(input, value) {
    this.setState({[input]: value})
  }

  submit() {
    console.log('submitting', this.state)
    const signup_data = {
        'email': this.state.email, 
        'name': this.state.name, 
        'skills': this.state.skills, 
        'wants': this.state.wants
    }
    $.post(`${API_SERVER}/signup`, signup_data, (result) => {
        console.log('result', result)
        this.setState({submitted: true})
    })
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
        {
            this.state.submitted ? 'Thanks for submitting!' : ''
        }

      </div>
    )
  }
}

