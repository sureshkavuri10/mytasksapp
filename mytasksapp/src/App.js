import React, { Component } from "react";
import Task from "./Task/Task";
import TaskInput from "./TaskInput/TaskInput";
import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);

    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(DB_CONFIG);
    }

    this.database = this.app
      .database()
      .ref()
      .child("tasks");

    //react state of component
    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    const previousTasks = this.state.tasks;

    //DataSnapshot
    this.database.on("child_added", snap => {
      previousTasks.push({
        id: snap.key,
        taskContent: snap.val().taskContent
      });

      this.setState({
        tasks: previousTasks
      });
    });

    this.database.on("child_removed", snap => {
      for (var i = 0; i < previousTasks.length; i++)
        if (previousTasks[i].id === snap.key) {
          previousTasks.splice(i, 1);
        }

      this.setState({
        tasks: previousTasks
      });
    });
  }

  addTask(task) {
    this.database.push().set({
      taskContent: task
    });
  }

  removeTask(taskId) {
    this.database.child(taskId).remove();
  }

  render() {
    return (
      <div className="tasksWrapper">
        <div className="taskssHeader">
          <div className="heading">React and Firebase backend Demo - My Tasks App</div>
        </div>
        <div className="tasksBody">
          {this.state.tasks.map(task => {
            return (
              <Task
                taskContent={task.taskContent}
                taskId={task.id}
                key={task.id}
                removeTask={this.removeTask}
              />
            );
          })}
        </div>
        <div className="tasksFooter">
          <TaskInput addTask={this.addTask} />
        </div>
      </div>
    );
  }
}

export default App;
