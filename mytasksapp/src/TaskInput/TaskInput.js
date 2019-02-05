import React, { Component } from "react";
import "./TaskInput.css";

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskContent: ""
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeTask = this.writeTask.bind(this);
  }

  //update newTaskContent when user input changes
  handleUserInput(e) {
    this.setState({
      newTaskContent: e.target.value
    });
  }

  writeTask() {
    this.props.addTask(this.state.newTaskContent);
    this.setState({
      newTaskContent: ""
    });
  }

  render(props) {
    return (
      <div className="formWrapper">
        <input
          className="taskInput"
          placeholder="Write a new task..."
          value={this.state.newTaskContent}
          onChange={this.handleUserInput}
        />
        <button className="taskButton" onClick={this.writeTask}>
          Add Task
        </button>
      </div>
    );
  }
}

export default TaskInput;
