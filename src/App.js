import React from 'react';
import config from './config'
import Search from './Components/search'
import './App.css';


class App extends React.Component {
  state = {
    city: '',
    weather: '',
    desc: ''
  }

  apiCall = (city) => {
    // fetch(`http://api.weatherstack.com/current?access_key=${config.REACT_APP_API_KEY}&query=${city}&units=f`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${config.REACT_APP_API_KEY}`)
      .then((res) => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then((data) => {
        this.setState({
          city: data,
          weather: data.main,
          desc: data.weather[0].description
        })
        console.log(this.state.desc)
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
          <h1>U.S. Weather Hack</h1>
        </header>

        <section className="weather-box">
          <div>
            <h2>Search Weather by City</h2>
            <Search
              search={this.handleSearchSubmit}
            />
          </div>
          <div>
            <h3>Your {this.state.city.name} weather forcast!</h3>
            <h3>Low-Temperature: {this.state.weather.temp_min + 'F'}</h3>
            <h3>High-Temperature: {this.state.weather.temp_max + 'F'}</h3>
            <h3>Temperature: {this.state.weather.temp}F</h3>
            <h3>Feels Like: {this.state.weather.feels_like + 'F'}</h3>
            <h3>Humidity: {this.state.weather.humidity + '%'}</h3>
            <h3>Description: {this.state.desc}</h3>
            <h3>Visibility: {this.state.city.visibility}</h3>
          </div>

        </section>

      </div>
    );
  }
}

export default App;
