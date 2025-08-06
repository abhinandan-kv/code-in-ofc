import React from "react";
class Child extends React.Component {
    // Function triggered when the form is submitted
    onTrigger = (event) => {
        // Call the parent callback function
        this.props.parentCallback(
            event.target.myname.value
        );
        event.preventDefault();
    };

    render() {
        return (
            <div>
                <h4>Enter your name :- </h4>
                <form onSubmit={this.onTrigger}>
                    <input
                        type="text"
                        name="myname"
                        placeholder="Enter Name"
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default Child;