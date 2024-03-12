import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from './components/ui/alert-dialog';
import { AlertDialogHeader, AlertDialogFooter } from './components/ui/alert-dialog';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [abilities, setAbilities] = useState(['']);
  const [abilityText, setAbilityText] = useState(['']);
  const [imageUrl, setImageUrl] = useState('');

  const url = `https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`;
  const firstCharacter = name.charAt(0).toUpperCase();
  const restOfName = name.slice(1);

  async function fetchAbilityData(urlValue, index) {
    return fetch(urlValue)
      .then(response => response.json())
      .then(data => {
        const descriptions = data.flavor_text_entries.filter(entry => entry.language.name === 'en');
        const description = descriptions.length > 0 ? descriptions[0].flavor_text : '';
        setAbilityText(prevAbilityText => [...prevAbilityText, description]);
      })
      .catch(error => console.log(error));
  }

  async function fetchData() {
    setAbilityText([]);
    fetch(url)
      .then(response => response.json())
      .then(info => {
        setImageUrl(info.sprites.front_default);
        setName(info.name);
        setWeight(info.weight);

        if (abilities[0] !== '') {
          setAbilities(['']);
        }

        const abilityUrl = info.abilities.map(ability => ability.ability.url);

        Promise.all(abilityUrl.map((url, index) => fetchAbilityData(url, index)))
          .then(() => {
            setAbilities(info.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)));
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  return (
    <>
      <div className="p-6 space-y-6 gap-5">
        <div className='flex justify-center my-5'>
          <Input id="pokemonInput" placeholder="Pokemon name" className="border rounded w-1/4" value={text} onChange={(e) => setText(e.target.value)}/>
          <Button className='ml-12' onClick={fetchData}>Pesquisar</Button>
        </div>
        <div className="flex justify-center my-5">
          <img src={imageUrl} id="pokemonImage" className="border rounded min-w-64 min-h-64 max-w-64" />
          <div className="pl-5">
            <h1>Name: {firstCharacter + restOfName}</h1>
            <h1>Weight: {weight}</h1>
            <div className="p-5 min-w-[250px]">
              {abilities.map((value, index) => (
                <div key={index}>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className='m-1 min-w-[200px]'>{value}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{value}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {abilityText[index]}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
