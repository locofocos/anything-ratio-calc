'use strict'

const App = () => {
  return <div>
    <ExampleComponent title="example component title"/>
    <p>It's working</p>
  </div>
}

class ExampleComponent extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    return <h1>{this.props.title}</h1>
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App/>)