import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [length, setlength] = useState(8);
  const [num, numallow] = useState(false);
  const [char, charallow] = useState(false);
  const [password, setpassword] = useState("");

const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numallow) str = str + "0123456789"
    if (charallow) str += "!@#$%^&*()_-+"
   
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, num, char, setpassword])

  const copyPasstoclip = useCallback(()=>{
    passwordRef.current?.select(); 
    passwordRef.current.setSelectionRange(0 ,17);
    window.navigator.clipboard.writeText(password)
  },[password])
   
  // passwordGenerator( )
  useEffect(()=> {
    passwordGenerator ()
  },[length,num,char,passwordGenerator]) 

  return (
    <>
      <div className='w-max max-w-max mx-auto shadow-md rounded-lg
     px-4 my-8 text-white bg-gray-700 text-3xl'>
        <h1 className='text-white text-center my-4'> PasswordGenerator</h1>
        <div className='flex shadow rounded-lg overflow-hidden text-gray-600
     mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasstoclip}
           className='outline-none bg-blue-700 text-white px-4 py-1 shrink-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label className='text-white text-2xl'>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1  p-3'>
            <input className='h-4 w-4'
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                numallow((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' className='text-2xl'>Number</label>
          </div>
          <div className='flex items-center gap-x-1 p-3'>
            <input className='h-4 w-4'
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={() => {
                charallow((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput' className='text-2xl'>Charaters</label>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
