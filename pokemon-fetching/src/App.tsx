import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from './components/ui/navigation-menu';
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/ui/alert-dialog'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { useState, useEffect, useRef } from "react";

function App() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  let [abilities, setAbilities] = useState(['']);
  const [imageUrl, setImageUrl] = useState('');

  const url = `https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`;
  let firstCharacter = name.charAt(0).toUpperCase();
  let restOfName = name.slice(1);
  
  let numberOfAbilities = 0;
  let i = 0;
  let j = 0;
  let id = [''];
  id.shift();
  
  async function fetchData(){
    fetch(url)
      .then(response => response.json())
      .then(info => {
        setImageUrl(info.sprites.front_default)
        setName(info.name)
        setWeight(info.weight)
        numberOfAbilities = info.abilities.length;
        if(abilities[0] != ''){
          for(j = 0;j < abilities.length; j++){
            abilities[j] = '';
          }
          abilities.shift();
        }
        for(i = 0; i < numberOfAbilities;i++){
          const abilityName = info.abilities[i].ability.name;
          const fullName = abilityName[0].toUpperCase() + abilityName.slice(1);
          if(i == 0 && abilities[0] != ''){
            abilities.push(fullName);
          }else{
            abilities.push(fullName);
          }
          console.log(fullName)
        }
        abilities.shift();
      })
      .catch(error => console.log(error));
  }


  return (
    <>
    <div className="p-6 space-y-6 gap-5">
      <div className='flex justify-center my-5'>
          <Input id="pokemonInput" placeholder="Pokemon name" className="border rounded w-1/4" value={text} onChange={(e) => setText(e.target.value)}/>
          <Button className='ml-12' onClick={fetchData}>Pesquisar</Button>
      </div>
      <div className="flex justify-center my-5">
        <img src={imageUrl}id="pokemonImage" className="border rounded min-w-64 min-h-64 max-w-64"/>
        <div className="pl-5">
          <h1>Name: {firstCharacter + restOfName}</h1>
          <h1>Weight: {weight}</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Habilidades:</NavigationMenuTrigger>
                <NavigationMenuContent>
                <div className="p-5 min-w-[250px]">
                  {
                    abilities.map((value) => {
                        return <>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button className='m-1 min-w-[200px]'>{value}</Button><br />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{value}</AlertDialogTitle>
                              <AlertDialogDescription>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa aliquid iste ea itaque, dolore unde est. Aspernatur dignissimos ducimus libero blanditiis dolore eos itaque, debitis ex maiores quidem, odit in!
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Voltar</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    })
                  }
                </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
    <script type="module" src="./src/script.ts"></script>
    </>
  )
}

export default App
