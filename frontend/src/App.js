import Axios from 'axios';
import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const [genreName, setGenreName] =  useState('');
  const [genreList, setGenreList] = useState([]);
  const [artistName, setArtistName] =  useState('');
  const [queriedGenreName, setQueriedGenreName] =  useState([]);
  const [srutiQueryName, setSrutiQueryName] =  useState([]);
  const [newGenre, setNewGenre] = useState("");
  

  const findArtistGenre = () => {
  Axios
    .post('http://localhost:3005/api/findArtistGenre', {artistName: artistName})
    .then(res => {
      console.log(res.data)
      setQueriedGenreName([
        ...queriedGenreName,
        {artistName: artistName, genres: res.data}
      ]);
    }).catch(err => console.log(err));
  };

  const displaySrutiQueryy = () => {
    Axios.get(`http://localhost:3005/api/getsrutiquery`).then(res => {
      console.log(res.data)
      setSrutiQueryName([
        ...srutiQueryName,
        {datas: res.data}
      ]);
    }).catch(err => console.log(err));
  };

  const submitGenre = () => { 
    Axios.post('http://localhost:3005/api/insert', {
      genreName: genreName
    });
    
    setGenreList([
      ...genreList,
      {
        genreName: genreName
      },
    ]);
  };

  const deleteGenre = (genreName) => {
    Axios.delete(`http://localhost:3005/api/delete/${genreName}`);
  };

  const updateGenre = (genreName) => {
    Axios.put(`http://localhost:3005/api/update`, {
      genreName: genreName,
      newGenre: newGenre
    });
    setNewGenre("")
  };

 

  return (

    <div className="App">
      <h1>Around the World - MUSICALLY</h1>
      <h2>Discover music by searching for your favorite song, and we we'll return some diverse new songs that match your preferences.</h2>

    <div className="form">
      <label> Add Genre Name:</label>

      <input type="text" name="genreName" onChange={(e) => {
        setGenreName(e.target.value)
      } }/>
      
      <button onClick={submitGenre}> Submit New Genre Name</button>

      <label>Find Genre Associated With Artist:</label>

      <input type="text" name="artistName" onChange={(e) => {
        setArtistName(e.target.value)
      } }/>

      <button onClick={findArtistGenre}> Submit Artist Name</button>

      {genreList.map((val) => {
        return (
          <div className = "card">
            <h1> GenreName: {val.genreName} </h1>
            <button onClick={() => { deleteGenre(val.genreName) }}> Delete</button>
            <input type="text" id="updateInput" onChange={(e) => {
                setNewGenre(e.target.value)
              } }/>
              <button onClick={() => {
                updateGenre(val.genreName)
              }}> Update</button>
            </div>
        );
        
      })}

      <button onClick={() => {displaySrutiQueryy()}}> Run Sruti's Query</button>


      {queriedGenreName.map((val) => {
        return (
          <div className = "card">
            <h1> {val.artistName} genres: </h1>
            { val.genres.map(genre => <h2> { genre.Genre_name } </h2> ) }
            <button onClick={() => {setQueriedGenreName(queriedGenreName.filter((value, i, arr) => {return value !== val} ))} }>Delete Query</button>
          </div>
        );
        
      })}

      {srutiQueryName.map((val) => {
        return (
          <div className = "card">
            { val.datas.map(data => <h3> Energy: { data.Energy }    |    Num Songs: {data.num_songs_with_high_energy_and_valance} </h3> ) }
          </div>
        );
        
      })}
      

    </div>
    
  </div>
  );
}

export default App;