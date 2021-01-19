import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

class Bandname extends React.Component {

    constructor(props) {
	super(props)
	this.state = {
	    bandName: "Party Punch"
	};
    }
    render() {
	return (
	    <h1>{this.state.bandName}</h1>
	)

    }
}

export default Bandname