import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import {VscDebugRestart} from 'react-icons/vsc'
import {MdOutlineScreenshotMonitor} from 'react-icons/md'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';


const Board = (props) => {

  let setscore = props.setscore;
  let score = props.score;
  let highscore = props.highscore;
  let sethighscore = props.sethighscore;
  let restart = props.restart;
  let setrestart = props.setrestart;

  

  const rows = 5;
  const cols = 5;

  const [board, setBoard] = useState([]);

  // Function for displaying and initializing an empty board
  function emptyBoard() {
    const newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = 0;
      }
    }
    newBoard[4][4] = 2;
    // o
    setBoard(newBoard);

  }

  //fuction to check whether game is over or not
  function gameover(){

    for(let i = 0;i<=4;i++){
      for(let j = 0;j<5;j++){
        if(board[i][j]===0){
          return true;
        }
      }
    }
    
    emptyBoard();
    return false;

  }

  useEffect(() => {
    emptyBoard();
  },[]);

  //fuction and handlers to handle left and right arrow movements also up and down

  function spanNo(){
    let span = [];
    span[0]=2;
    span[1]=4;
    
    const ind = Math.floor(Math.random() * 2);

    const no = span[ind];

    return no;

  }

  function go(str,board){

    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = 0;
      }
    }

    if(str==="left"){
      
      for(let i = 0;i<5;i++ ){
        let k = 0;
        for(let j=0;j<5;j++){
            if( board.length > i && board[i].length > j && board[i][j]===0){
              continue
            } 
            else{
              newBoard[i][k++]=board[i][j];
            }  
        }
      }
     
      //setBoard(newBoard);

    }

    else if(str==="right"){

      for(let i = 0;i<5;i++ ){
        let k = 4;
        for(let j=4;j>=0;j--){
            if( board.length > i && board[i].length > j && board[i][j]===0){
              continue
            } 
            else{
              newBoard[i][k--]=board[i][j];
            }  
        }
      }
      //setBoard(newBoard);

    }

    else if(str==="up"){

      for(let i = 0;i<5;i++ ){
        let k = 0;
        for(let j=0;j<5;j++){
            if( board.length > j && board[j].length > i && board[j][i]===0){
              continue
            } 
            else{
              newBoard[k++][i]=board[j][i];
            }  
        }
      }
      //setBoard(newBoard);

    }

    else if(str==="down"){

      for(let i = 4;i>=0;i-- ){
        let k = 4;
        for(let j=4;j>=0;j--){
            if( board.length > j && board[j].length > i && board[j][i]===0){
              continue
            } 
            else{
              newBoard[k--][i]=board[j][i];
            }  
        }
      }
      //setBoard(newBoard);

    }
      
    return newBoard;
  }

  function adjest(str,board,done){

    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = 0;
      }
    }

    for(let i = 0;i<5;i++){
      for(let j = 0;j<5;j++){
        newBoard[i][j]=board[i][j];
      }
    }

    if(str==="left"){
      for(let i = 0;i<5;i++){
        for(let j = 0;j<4;j++){
          if(newBoard[i][j]===0 && !done){
            newBoard[i][j] = spanNo();
            done = true;
          }
          if(newBoard[i][j]===newBoard[i][j+1] && newBoard[i][j]!==0){
            score = score + newBoard[i][j];
            setscore(score);
            newBoard[i][j] = newBoard[i][j]*2;
            newBoard[i][j+1]= 0;
            
            newBoard = go("left",newBoard);
            // if(done===true){
            //   newBoard = adjest("left",newBoard,true);
            // }
            // else{
            //   newBoard = adjest("left",newBoard,false);
            // }
            
          }

        }
      }

      if(!done){
        let j = 4;
        for(let i = 0;i<5;i++){
          if(newBoard[i][j]===0){
            newBoard[i][j] = spanNo();
            done = true;
            break
          }
        }
      }

      setBoard(newBoard);
      return newBoard

    
    }

    else if(str==="right"){

      for(let i = 0;i<5;i++){
        for(let j = 0;j<4;j++){

          if(newBoard[i][j]===0 && !done){
            newBoard[i][j]=spanNo();
            done = true;
          } 

          if(newBoard[i][j]===newBoard[i][j+1] && newBoard[i][j]!==0){
            score = score + newBoard[i][j];
            setscore(score);
            newBoard[i][j+1] = newBoard[i][j]*2;
            newBoard[i][j]= 0;
            newBoard = go("right",newBoard);
            // if(done===true){
            //   newBoard = adjest("right",newBoard,true);
            // }
            // else{
            //   newBoard = adjest("right",newBoard,false);
            // }
            
          }

        }
      }

      if(!done){
        let j = 4;
        for(let i = 0;i<5;i++){
          if(newBoard[i][j]===0){
            newBoard[i][j] = spanNo();
            done = true;
            break;
          }
        }
      }

      setBoard(newBoard);
      console.log(board);
      return newBoard

    }

    else if(str==="up"){
      for(let i = 4;i>=1;i--){
        for(let j = 0;j<5;j++){

          if(newBoard[i][j]===0 && !done){
            newBoard[i][j] = spanNo();
            done = true;
          }

          if(newBoard[i][j]===newBoard[i-1][j] && newBoard[i][j]!==0){
            score = score + newBoard[i][j];
            setscore(score);
            newBoard[i][j] = newBoard[i][j]*2;
            newBoard[i-1][j]= 0;
            newBoard = go("up",newBoard);

            // if(done===true){
            //   newBoard = adjest("up",newBoard,true);
            // }
            // else{
            //   newBoard = adjest("up",newBoard,false);
            // }
          }

        }
      }
      setBoard(newBoard);
      console.log(board);
      return newBoard
    }

    else if(str==="down"){
      for(let i = 4;i>=1;i--){
        for(let j = 0;j<5;j++){

          if(newBoard[i][j]===0 && !done){
            newBoard[i][j] = spanNo();
            done = true;
          }

          if(newBoard[i][j]===newBoard[i-1][j] && newBoard[i][j]!==0){
            score = score + newBoard[i][j];
            setscore(score);
            newBoard[i][j] = newBoard[i][j]*2;
            newBoard[i-1][j]= 0;
            newBoard = go("down",newBoard);

            // if(done===true){
            //   newBoard = adjest("down",newBoard,true);
            // }
            // else{
            //   newBoard = adjest("down",newBoard,false);
            // }

            
          }

        }
      }

      if(!done){
        let i = 0;
        for(let j = 0;j<5;j++){
          if(newBoard[i][j]===0){
            newBoard[i][j] = spanNo();
            done = true;
            break;
          }
        }
      }

      setBoard(newBoard);
      console.log(board);
      return newBoard
    }

  }

  function shiftMatrix( str ){
    
    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = 0;
      }
    }

    if(str==="left"){
      
      for(let i = 0;i<5;i++ ){
        let k = 0;
        for(let j=0;j<5;j++){
            if( board.length > i && board[i].length > j && board[i][j]===0){
              continue
            } 
            else{
              newBoard[i][k++]=board[i][j];
            }  
        }
      }
      adjest("left",newBoard,false);
      //setBoard(newBoard);
      
    }

    else if(str==="right"){

      for(let i = 0;i<5;i++ ){
        let k = 4;
        for(let j=4;j>=0;j--){
            if( board.length > i && board[i].length > j && board[i][j]===0){
              continue
            } 
            else{
              newBoard[i][k--]=board[i][j];
            }  
        }
      }
      adjest("right",newBoard,false);
      //setBoard(newBoard);

    }

    else if(str==="up"){

      for(let i = 0;i<5;i++ ){
        let k = 0;
        for(let j=0;j<5;j++){
            if( board.length > j && board[j].length > i && board[j][i]===0){
              continue
            } 
            else{
              newBoard[k++][i]=board[j][i];
            }  
        }
      }
      // setBoard(newBoard);
      adjest("up",newBoard,false);
    }

    else if(str==="down"){

      for(let i = 4;i>=0;i-- ){
        let k = 4;
        for(let j=4;j>=0;j--){
            if( board.length > j && board[j].length > i && board[j][i]===0){
              continue
            } 
            else{
              newBoard[k--][i]=board[j][i];
            }  
        }
      }
      //setBoard(newBoard);
      adjest("down",newBoard,false);
    }

    if(gameover()){
      console.log("Not over yet");
    }
    else{
      if(score>highscore){
        console.log("hell yah");
        sethighscore(score);
        localStorage.setItem('highscore', JSON.stringify(highscore));
      }
      setscore(0);
      console.log("game over")
    }

  }

  // function addnewone(str,board){

  //   let newBoard = [];
  //   for (let i = 0; i < rows; i++) {
  //     newBoard[i] = [];
  //     for (let j = 0; j < cols; j++) {
  //       newBoard[i][j] = 0;
  //     }
  //   }

  //   for(let i = 0;i<5;i++){
  //     for(let j = 0;j<5;j++){
  //       newBoard[i][j]=board[i][j];
  //       console.log(board[i][j]);
  //     }
  //   }

  //   if(str==="left"){
  //     for(let i = 0;i<5;i++){
  //       let flag = 0;
  //       for(let j = 0;j<5;j++){
  //         if(newBoard[i][j]===0){
  //           let no = spanNo();
  //           newBoard[i][j]=no;
  //           flag = 1;
  //           break;
  //         }
          
  //       }
  //       if(flag===1){
  //         break;
  //       }
  //     }
  
  //     setBoard(newBoard);
  //   }
    


  // }

  function arrowHandler(event){
    if (event.keyCode === 37) {
        shiftMatrix("left");
      } else if (event.keyCode === 38) {
        shiftMatrix("up")
      } else if (event.keyCode === 39) {
        shiftMatrix("right");
      } else if (event.keyCode === 40) {
        shiftMatrix("down");
      }
  }

  useEffect(() => {
    window.addEventListener('keydown', arrowHandler);

    return () => {
      window.removeEventListener('keydown', arrowHandler);
    };
  },[board]);

  function restartHandler(){
    emptyBoard();
    setscore(0);
  }

  //fuction to handle screenshots and save in user computer
  const screenshotHandler = () => {
      const element = document.getElementById('capture'); // ID of the element you want to capture
    
      html2canvas(element).then(canvas => {
        canvas.toBlob(blob => {
          saveAs(blob, 'screenshot.png'); // File name for the screenshot
        });
      });
    };
    

  return (
    <div className='board'>

          <div className='buttons'>
            <VscDebugRestart onClick={restartHandler}></VscDebugRestart>
            <MdOutlineScreenshotMonitor onClick={screenshotHandler}></MdOutlineScreenshotMonitor>
          </div>

      {
        board.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {
            row.map((col, colIndex) => (
            <Cell key={colIndex} value={col} />

          ))}

        </div>
      ))}

    </div>

  );
};

export default Board;
