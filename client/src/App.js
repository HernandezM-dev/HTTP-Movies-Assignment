import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from './Movies/UpdateMovie'
import NewMovie from './Movies/NewMovie';
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, );

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/update/:id" component={UpdateMovie} />
      <Route exact path="/new" component={NewMovie} />
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route exact path="/movies/:id">
        <Movie addToSavedList={addToSavedList}/>
      </Route>
     
    </div>
  );
};

export default App;
