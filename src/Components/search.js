import React from 'react';
// import './Search.css';

class Search extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.search(e.target.citySearch.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='search'>
            <label htmlFor='citySearch' className='city'>
              Look-up Your City!
            </label><br />
            <input type='text' id='citySearch' placeholder='Tampa'></input>
          </div>
          <button className='searchButton' type='submit'>
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;