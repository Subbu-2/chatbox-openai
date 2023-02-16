import { useRef, useState } from 'react';
import { Completion_Service_End_Point, } from './Api';
import './App.css';

const App = () => {
  const [data,setData] = useState(null);
  const [load,setLoad] = useState(false);
  const inputRef = useRef(null);
  async function handleClick() {
    setLoad(false)
    if(!inputRef.current.value){
       return console.log("enter text")
      }
    const text = inputRef.current.value
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    };
    await fetch(`${Completion_Service_End_Point}`,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ model: "text-davinci-003",    prompt: text,    temperature: 0,    max_tokens: 30 })
  })
    .then(response => response.json())
    .then((response)=>{
      setData(response)
      setLoad(true)
    })
   }

  return (
    <div className="App">
      <div className="top">
        <input type="text" ref={inputRef}></input>
        <button onClick={handleClick}>Send</button>
      </div>
      {load && <p>{data.choices[0].text}</p>}
    </div>
  );
}

export default App;
