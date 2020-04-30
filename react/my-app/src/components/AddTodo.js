import React from "react";

import { connect } from "react-redux";
import { addTodo } from "../redux/actions";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    // 分发action以增加todo项
    this.props.addTodo(this.state.input);
    // 将state的input置为空字符串
    this.setState({ input: "" });
  };

  render() {
    return (
      <div>
        <input onChange={e => this.updateInput(e.target.value)} value={this.state.input} />
        <button className="add-todo" onClick={this.handleAddTodo}>Add Todo</button>
      </div>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(AddTodo);
