import React from 'react';
import config from './config'
import Search from './Components/search'
import './App.css';
import { Sunny, Cloudy, Rain, Snow } from 'weather-styled-icon'


class App extends React.Component {
  state = {
    city: '',
    weather: '',
    desc: '',
    anima: ''
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
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleSearchSubmit = (city) => {
    this.apiCall(city);
  }

  componentDidMount() {
    this.apiCall('Tampa')
  }

  imgDecider = () => {
    const weather = ['sunny', 'cloud', 'rain', 'snow'];
    const description = this.state.desc;
    if (description.includes('cloud')) {
      return <Cloudy />;
    } else if (description.includes('sunny') || description.includes('clear')) {
      return <Sunny />;
    } else if (description.includes('rain')) {
      return <Rain />;
    } else if (description.includes('snow')) {
      return <Snow />;
    }
  }

  // imgDecider = () => {
  //   const weather = ['cloud', 'sunny', 'snow', 'rain'];
  //   const description = this.state.desc;
  //   weather.forEach(item => {
  //     console.log(item)
  //     console.log(description.includes(item))
  //     if (description.includes(item) === true) {
  //       return <Cloudy />;
  //     } else {
  //       return <Sunny />
  //     }
  //   })
  // }

  // imgDecider = () => {
  //   const weather = [Sunny, Cloudy, Rain, Snow];
  //   const description = this.state.desc;

  //   weather.forEach(item => {
  //     if (description.includes(item)) {
  //       return <item />
  //     }

  //   })
  // }




  render() {

    return (
      <div className="App">
        <header className="App-header">
          {/* <h1>U.S. Weather Hack</h1> */}
        </header>

        <section className="weather-box">
          <div>
            <h1>Search Weather by City</h1>
            <Search
              search={this.handleSearchSubmit}
            />
          </div>
          <div>
            <h3>Your <span>{this.state.city.name}</span> weather forcast!</h3>
          </div>
          <div>
            {/* <Img /> */}

            {this.imgDecider()}
            <h3>Description: <span>{this.state.desc}</span></h3>
          </div>
          <div className='currentWeather'>
            <div>
              <h3>Current Temp: <span>{this.state.weather.temp}F</span></h3>
            </div>
            <div>
              <h3>Feels Like: <span>{this.state.weather.feels_like + 'F'}</span></h3>
            </div>
            <div>
              <h3>Low-Temp: <span>{this.state.weather.temp_min + 'F'}</span></h3>
            </div>
            <div>
              <h3>High-Temp: <span>{this.state.weather.temp_max + 'F'}</span></h3>
            </div>
            <div>
              <h3>Humidity: <span>{this.state.weather.humidity + '%'}</span></h3>
            </div>
            <div>
              <h3>Visibility: <span>{this.state.city.visibility}</span></h3>
            </div>
          </div>

        </section>

      </div>
    );
  }
}

export default App;
