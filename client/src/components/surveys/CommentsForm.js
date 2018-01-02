import React, { Component } from "react";
import FormProps from "./commentsFormProps";

class CommentsForm extends Component {

    render() {
        return (
            <div>
                <FormProps id = {this.props.id} />
            </div>
        );
    };
}

export default CommentsForm