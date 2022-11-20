import './App.css';
import React from 'react';
import axios from 'axios';

// base url of the API endpoint
const BASE_URL = 'http://localhost:3000/db/data.json';


class App extends React.Component {

  // state that will be used in this component
  state = {
    data: [], // json data
    loading: true,
    genre: '', // genre to be used in the slection dropdown
    error: null
}

  // invoke immediately when the component is mounted
  componentDidMount() {
    // console.log('componentDidMount()');
    this.fetchData();
    
  } // componentidMount()

  // the main function go submit HTTP API request
  fetchData = async () => {
    
    try {
      const res = await axios.get(BASE_URL);
      console.log('response:', res.data);
      this.setState({
        data: res.data,
        loading: false,  
      })

    } catch (err) {
      this.setState({
        loading: false,
        error: err 
      })
    } // catch()
    
  } // fetchData()
  
  // generate the genre list after duplicates removed
  fetchGenre = () => {
    // firstly create a helper function to remove duplicate genres
    const onlyUnique = function(value, index, self) {
      return self.indexOf(value) === index;
    };

    // get all genres with duplicates
    const GenreList = this.state.data.map(g => g.genre);

    // use .filter and the hepler function to get the unique genres
    const uniqueGenre = GenreList.filter(onlyUnique);
    // console.log(uniqueGenre);
    
    return uniqueGenre

  } // fetchGenre

  // track the selection dropdown list change
  handleChange = (e) => {
    e.preventDefault();
    this.setState({genre: e.target.value});  
  } // handleChange()

  // display the tunelist when selection is made, the selected genre is passed to this function as an arguement
  handleListDisplay(selection){

    // use .filter to find the tune list match the selection genre
    const tunes = this.state.data.filter(t => t.genre === selection);

    // use .map to loop through the list
    const tuneList = tunes.map(artist => artist.name);
    // console.log(tuneList);
    
    return tuneList
  } // handleListDisplay()



  render() {

    return(
      <div class="App">
        <h1>Welcome to Rad Tunes</h1>
          <h3>Please select a genre to explore</h3>
            <div class="wrapper">
              <select onChange={this.handleChange} class="selection">
                  <option disabled selected value>---Select---</option>
                  {this.fetchGenre().map(optn => (
                        <option value={optn}>{optn}</option>
                  ))}
              </select>
            </div>
            <div class="list">
              {
                this.state.loading
                ?
                <p>Loading list</p>
                :
                <ol>
                {this.handleListDisplay(this.state.genre).map(l => <li>{l}</li>)}
                </ol>
              }
            </div>

      </div>

    ) // return()

  } // render()

} // class App

export default App;
