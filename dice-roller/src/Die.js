import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceTwo } from '@fortawesome/free-solid-svg-icons'

class Die extends Component {
  constructor(props) {
    super(props);
    this.props.face = this.props.face.bind(this);
  }
  render() {
    return <FontAwesomeIcon icon={`faDiceTwo${this.props.face}`} />
  }
}

export default Die;