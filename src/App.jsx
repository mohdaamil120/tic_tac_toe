import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [arr, setArr] = useState(new Array(9).fill(""))
  const [xwin, setXwin] = useState(0)
  const [owin, setOwin] = useState(0)
  const [win, setwin] = useState("")
  const [turn, setTurn] = useState("O")

  useEffect(()=>{

    const checkwin = () =>{
      if((arr[0] == "O" && arr[1] == "O" && arr[2] == "O" )|| 
      (arr[3] == "O" && arr[4] == "O" && arr[5] == "O") || 
      (arr[6] == "O" && arr[7] == "O" && arr[8] == "O") || 
      (arr[0] == "O" && arr[4] == "O" && arr[8] == "O") || 
      (arr[2] == "O" && arr[4] == "O" && arr[6] == "O")){
        setwin("O")
        // alert("O is winner")
        setOwin(prev => prev+1)
      }
      else if((arr[0] == "X" && arr[1] == "X" && arr[2] == "X" ) ||
       (arr[3] == "X" && arr[4] == "X" && arr[5] == "X") || 
       (arr[6] == "X" && arr[7] == "X" && arr[8] == "X") || 
       (arr[0] == "X" && arr[4] == "X" && arr[8] == "X") || 
       (arr[2] == "X" && arr[4] == "X" && arr[6] == "X")){
        setwin("X")
        // alert("O is winner")
        setXwin(prev => prev+1)
      }
      else if (!arr.includes("")) {
        // Check for tie if the board is full
        setwin("Tie");
      }
    }

    checkwin()
  },[turn,arr])

  const handleTurn = (i)=>{
    if(arr[i] || win) return

    const newArray = [...arr]
    newArray[i] = turn=="O" ? "O" : "X"
    setArr(newArray)
    setTurn(turn === "O" ? "X" : "O"); // Toggle turn
  }

  const handleReset = () =>{
    setArr(new Array(9).fill(""))
    setTurn("O")
    setwin("")
  }

  return (
    <div className='main'>
      <h1>Tic tac toe</h1>
      <div className='game_cont'>
        <div className='win_cont'>
          <span>X win : {xwin}</span>
          <span>O win : {owin}</span>
        </div>
        <div className='game_options'>
          <h1>{win ? (win === "Tie" ? "🤝 It's a Tie!" : `${win} wins! 🎉`) : `${turn}'s Turn`}</h1>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className='game_board'>
          {
            arr.length && arr.map((el,i)=>{
              return <button  disabled={win} onClick={() => handleTurn(i)} className="box">
                {el}
              </button>
            })
          }
        </div>
      </div>

      <div className='result'>
      {win && win !== "Tie" && <h1>🎉 Congratulations {win} wins! 🎉</h1>}
      {win === "Tie" && <h1>🤝 It's a Tie!</h1>}
      </div>
    </div>
  )
}

export default App
