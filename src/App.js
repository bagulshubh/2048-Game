import './App.css';
import Board from './components/board';
import { useState,useEffect } from 'react';


function App() {

  let [score,setscore] = useState(0);
  let [highscore,sethighscore] = useState(JSON.parse(localStorage.getItem('highscore')));
  let [restart,setrestart] = useState(false);

   useEffect(() => {
     localStorage.setItem('highscore', JSON.stringify(highscore));
     }, [highscore]);

  


  return (
    <div className="App" id='capture'>
      
      <div className='score'>Score:- {score}</div>

    
      <Board  setscore = {setscore} score = {score} highscore={highscore} sethighscore = {sethighscore} restart = {restart} setrestart={setrestart}></Board>

      <div className='high'>HighScore:- {highscore}</div>

    </div>
  );
}

export default App;
