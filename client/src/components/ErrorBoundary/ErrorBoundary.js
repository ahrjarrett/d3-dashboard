import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.displayName = this.props.name
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('errorInfo', errorInfo)
    console.error('error', error)
  }

  render() {
    if (this.state.hasError) {
      console.log('hasError', this.state.hasError)

      return this.props.render ? this.props.render(this.state) : <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
