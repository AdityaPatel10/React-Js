import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState<number>(8);
  const [password, setPassword] = useState<string>("");
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  
  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {

    
    let pass: string = "";
    let str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$&*-_.";

    for (let i = 0; i <= length; i++) {
      let charIndex : number = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);

    }
    setPassword(pass);
    console.log(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
    
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  const clickToCopy = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="bg-zinc-700 max-w-md w-full py-2 px-5 my-7 mx-auto  rounded-md">
        <h1 className="text-4xl text-white text-center">Password Generator</h1>
        <input
          type="text"
          placeholder="password"
          value={password}
          className="my-5 rounded-l-md px-2 py-3 w-[85%] text-xl outline-none"
          readOnly
          ref={passwordRef}
        />
        <button
          className="py-3 px-2 text-xl bg-blue-700 rounded-r-md"
          onClick={clickToCopy}
        >
          Copy
        </button>
        <div className="flex text-s gap-x-2">
          <div className="flex text-s gap-x-2">
            <input
              type="range"
              min={6}
              max={99}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label className="text-orange-400">Length: {length}</label>
          </div>
          <div className="flex text-s gap-x-2">
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=> !(prev))
            }}
            />
          </div>

          <label className="text-orange-400">Number</label>

          <div className="flex text-s gap-x-2">
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!(prev))
            }}
            className=""
            />
          </div>

          <label className="text-orange-400">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
