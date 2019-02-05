import React, { Component } from "react";
import "./Task.css";
import PropTypes from "prop-types";

class Task extends Component {
  constructor(props) {
    super(props);
    this.taskContent = props.taskContent;
    this.taskId = props.taskId;
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
  }

  handleRemoveTask(id) {
    this.props.removeTask(id);
  }

  render(props) {
    return (
      <div className="task fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveTask(this.taskId)}
        >
          X
        </span>
        <p className="taskContent">{this.taskContent} </p>
      </div>
    );
  }
}

Task.propTypes = {
  taskContent: PropTypes.string
};

export default Task;
