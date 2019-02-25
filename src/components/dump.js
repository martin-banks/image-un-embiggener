import React from 'react'
import PropTypes from 'prop-types'

class Dump extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <p>{ this.props.title }</p>
        <pre>
          { JSON.stringify(this.props.data, 'utf8', 2) }
        </pre>
      </div>
    )
  }
}

Dump.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object
}

export default Dump
