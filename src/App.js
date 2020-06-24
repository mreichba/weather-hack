import React from 'react';
import config from './config'
import Search from './Components/search'
// import Main from './Components/main'
import './App.css';


class App extends React.Component {
  state = {
    city: ''
  }

  //  const BASE_URL = 'http://api.weatherstack.com/';

  apiCall = (city) => {
    fetch(`http://api.weatherstack.com/current?access_key=${config.REACT_APP_API_KEY}&query=${city}&units=f`)
      .then((res) => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then((data) => {
        this.setState({ city: data.current })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleSearchSubmit = (city) => {
    this.apiCall(city);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather Hack</h1>
        </header>

        <section className="weather-box">
          <div>
            <h2>Search Weather by City</h2>
            <Search
              search={this.handleSearchSubmit}
            />
            {/* <Main /> */}
          </div>
          <div>
            <h3>Temperature: {this.state.city.temperature + 'F'}</h3>
            <h3>Feels Like: {this.state.city.feelslike + 'F'}</h3>
            <h3>Humidity: {this.state.city.humidity + '%'}</h3>
            <h3>UV Index: {this.state.city.uv_index}</h3>
            <h3>Visibility: {this.state.city.visibility}</h3>
          </div>

        </section>

      </div>
    );
  }
}

export default App;
