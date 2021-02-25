import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Mainboard from "./components/Mainboard";
import unspalsh from './api/unsplash'

function App() {
  const [pins, setNewPins] = useState([]);


  const getImages = (term) => {
    return unspalsh.get("https://api.unsplash.com/search/photos", {
      params: {
        query: term
      }
    });
  };

  const onSearchSubmit = (term) => {
    getImages(term).then((res) => { 
      let results = res.data.results;

      let newPins = [
        ...results,
        ...pins,
      ]

      newPins.sort(function (a, b) {
        return 0.5 - Math.random();
      });

      setNewPins(newPins);
    })
  }
  
  useEffect(() => {
      const getNewPins = () => {
        let promises = [];
        let pinData = [];

        let pins = ["ocean", "Tokyo", "Dogs", "Cats"];

        pins.forEach((pinTerm) => {
          promises.push(
            getImages(pinTerm).then((res) => {
              let results = res.data.results;
              pinData = pinData.concat(results);
              pinData.sort(function (a, b) {
                return 0.5 - Math.random();
              });
            })
          );
        });
        Promise.all(promises).then(() => {
          setNewPins(pinData);
        });
      };
    getNewPins();
  },[]);

  return (
    <div className="app">
      <Header onSubmit={onSearchSubmit}/>
      <Mainboard pins={pins}/>
    </div>
  );
}

export default App;
