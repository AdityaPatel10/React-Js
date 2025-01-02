import { useState } from "react"


function App() {
  const [color, setColor] = useState<string>('bg-black')
  return (
      <div className={`w-full h-screen ${color} flex justify-center`}>
        <div className={`fixed flex flex-wrap justify-center px-5 py-3 bottom-12 rounded-lg gap-3 font-serif text-2xl bg-white`}>
          <button className="bg-red-700 px-4 py-2 rounded-lg text-white"
          onClick={() => {setColor('bg-red-700')}}>Red</button>
          <button className="bg-green-700 px-4 py-2 rounded-lg text-white"
          onClick={() => {setColor('bg-green-700')}}>Green</button>
          <button className="bg-yellow-600 px-4 py-2 rounded-lg text-white"
          onClick={() =>{setColor('bg-yellow-600')}}>Yellow</button>
          <button className="bg-blue-700 px-4 py-2 rounded-lg text-white"
          onClick={()=>{setColor('bg-blue-700')}}>Blue</button>
          <button className="bg-violet-950 px-4 py-2 rounded-lg text-white"
          onClick={()=>{setColor('bg-violet-950')}}>Violet</button>
          <button className="bg-pink-500 px-4 py-2 rounded-lg text-white"
          onClick={()=>{setColor('bg-pink-500')}}>Pink</button>
        </div>
      </div>
  )
}

export default App
