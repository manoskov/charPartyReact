import React, { useState } from "react";
import './App.css';
import Clicker from './Clicker';

const characters = [
  { name: 'Khaleed', picUrl: '/pics/01.jpg' },
  { name: 'Jaheira', picUrl: '/pics/02.jpg' },
  { name: 'Faldorn', picUrl: '/pics/03.jpg' },
  { name: 'Neera', picUrl: '/pics/04.jpg' },
  { name: 'Dynaheir', picUrl: '/pics/05.jpg' },
  { name: 'Minsk', picUrl: '/pics/06.jpg' },
  { name: 'Kivan', picUrl: '/pics/07.jpg' }
];

export default function App() {
  const [userPic, setUserPic] = useState(3);
  const [userName, setUserName] = useState(characters[3].name);
  const [party, setParty] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userPicRange') {
      setUserPic(value);
      setUserName(characters[value].name);
    } else if (name === 'username') {
      const lettersOnlyRegex = /^[a-zA-Z]+$/;
      if (lettersOnlyRegex.test(value) || value === '') {
        setUserName(value);
      }
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName === '') {
      alert("Name can't be an empty line!");
    } else if (!party.includes(userName)) {
      setParty((prev) => [...prev, userName]);
    } else {
      alert("This character is already in your party!");
    }
  };
  

const removeFromParty = (member) => {
    setParty((prev) => prev.filter(item => item !== member));
  };

  return (
    <div className="App">
      <header>
        <img src='./pics/logo.png' className="logo" />
        <h1>Party Generator</h1>
        <img src='./pics/logo.png' className="logo" />
      </header>
      <main className="main">
        <form>
          <label htmlFor="userPicRange">Chose a picture</label>
          <input id="userPicRange" name="userPicRange" type="range" min="0" max={characters.length - 1} step="1" value={userPic} onChange={handleChange}></input>
          <br />
          <br />
          <label htmlFor="username">Name: </label>
          <input type="text" name="username" value={userName} className="input" id="username" onChange={handleChange}></input>
          <button type="submit" className="input" id="submitButton" onClick={handleSubmit}>Add to Party</button>
          <br />
        </form>
        <h2>{userName}</h2>
        <img src={characters[userPic].picUrl} alt="Your Character Picture" />

        {party.length > 0 ? (
          <p id="partyTwo">Your party consists of {party.map (member => (<span onClick={() => removeFromParty(member)}  className="charInParty" id={member}>{member}</span>))}</p>
        ) : null}

        <Clicker />
          
      </main>
    
    </div>
  );
};
