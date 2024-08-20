import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean
}

class App extends Component<{}, IState> {
  private intervalId: NodeJS.Timeout | undefined; // Added property for interval ID

  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data} />);
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    this.intervalId = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState((prevState) => ({
          data: [...prevState.data, ...serverResponds], // Accumulate new data
          showGraph: true,
        }));
      });
    }, 100);
  }

  /**
   * Clean up the interval when the component unmounts
   */
  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button 
            className="btn btn-primary Stream-button"
            onClick={() => this.getDataFromServer()}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
