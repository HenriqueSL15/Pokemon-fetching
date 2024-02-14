import { FireExtinguisher } from "lucide-react";
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { useState, useEffect, useRef } from "react";

function App() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');

  let wholeName = '';
  let firstCharacter = name.charAt(0).toUpperCase();
  let restOfName = name.slice(1);
  let [imageUrl, setImageUrl] = useState('');
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current +=1;
    console.log(imageUrl)
    console.log(firstCharacter + restOfName)
  })

  function fetchData(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.sprites.front_default)
        setName(data.name)
        setWeight(data.weight)
      })
      .catch(error => console.log(error));
  }

  return (
    <>
    <div className="p-6 space-y-6">
      <div className="flex justify-center">
        <div className="flex justify-between w-1/2">
          <Input id="pokemonInput" placeholder="Pokemon name" className="border rounded w-1/2" value={text} onChange={(e) => setText(e.target.value)}/>
          <Button onClick={fetchData}>Pesquisar</Button>
        </div>
      </div>

      <div className="flex justify-center">
        <img src={imageUrl}id="pokemonImage" className="border rounded min-w-64 min-h-64 max-w-64"/>
        <div className="pl-5">
          <h1>Name: {firstCharacter + restOfName}</h1>
          <h1>Weight: {weight}</h1>
        </div>
      </div>
    </div>
    <script type="module" src="./src/script.ts"></script>
    </>
  )
}

export default App
