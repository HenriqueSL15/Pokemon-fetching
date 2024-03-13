//Importa funcionalidades do React(useState e useEffect), componentes de alerta de diálogo, componente de botão e componente de input de texto
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogTrigger,AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from './components/ui/alert-dialog';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
  //Estados para armazenar o texto inserido, o nome, o peso e a imagem do pokemon, suas habilidades e as descrições das mesmas.
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [abilities, setAbilities] = useState(['']);
  const [abilityText, setAbilityText] = useState(['']);
  const [imageUrl, setImageUrl] = useState('');

  const url = `https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`; // URL para buscar informações do Pokémon com base no texto inserido
  const firstCharacter = name.charAt(0).toUpperCase(); // Obtém a primeira letra do nome do Pokémon em maiúsculo
  const restOfName = name.slice(1); // Obtém o restante do nome do Pokémon

  // Função assíncrona para buscar dados das habilidades do Pokémon
  async function fetchAbilityData(urlValue, index) {
    return fetch(urlValue)
      .then(response => response.json())
      .then(data => {

        // Filtra as descrições com base no idioma inglês e atribui a constante descriptions
        const descriptions = data.flavor_text_entries.filter(entry => entry.language.name === 'en');

        // Obtém a primeira descrição em inglês (se existir)
        const description = descriptions.length > 0 ? descriptions[0].flavor_text : ''; 

        // Atualiza o estado das descrições de habilidades
        setAbilityText(prevAbilityText => [...prevAbilityText, description]); 
      })
      .catch(error => console.log(error));
  }

  // Função assíncrona para buscar dados do Pokémon
  async function fetchData() {
    // Limpa o estado das descrições de habilidades e das habilidades em si
    setAbilityText([]);
    setAbilities([]);

    // Faz uma requisição para a URL do Pokémon
    fetch(url) 
      .then(response => response.json()) // Converte a resposta para JSON
      .then(info => {
        //Atualiza o estado da imagem, nome e peso do pokemon
        setImageUrl(info.sprites.front_default);
        setName(info.name);
        setWeight(info.weight);

        // Obtém as URLs das habilidades do Pokémon para posteriormente, fazer um fetch
        const abilityUrl = info.abilities.map(ability => ability.ability.url);

        // Realiza todas as chamadas para buscar dados das habilidades
        Promise.all(abilityUrl.map((url, index) => fetchAbilityData(url, index)))
          .then(() => {
            setAbilities(info.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1))); // Define as habilidades do Pokémon
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }


  return (
    <>
      <div className="p-6 space-y-6 gap-5">
        <div className='flex justify-center my-5'>
          <Input id="pokemonInput" placeholder="Nome do Pokémon" className="border rounded w-1/4" value={text} onChange={(e) => setText(e.target.value)}/> {/* Campo de entrada para inserir o nome do Pokémon */}
          <Button className='ml-12' onClick={fetchData}>Pesquisar</Button> {/* Botão para pesquisar informações do Pokémon */}
        </div>
        <div className="flex justify-center my-5">
          <img src={imageUrl} id="pokemonImage" className="border rounded min-w-64 min-h-64 max-w-64" /> {/* Imagem do Pokémon */}
          <div className="pl-5">
            <h1>Nome: {firstCharacter + restOfName}</h1> {/* Nome do Pokémon */}
            <h1>Peso: {weight}</h1> {/* Peso do Pokémon */}
            <div className="p-5 min-w-[250px]">
              {abilities.map((value, index) => (
                <div key={index}>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button className='m-1 min-w-[200px]'>{value}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{value}</AlertDialogTitle> {/* Título do diálogo de alerta */}
                        <AlertDialogDescription>
                          {abilityText[index]} {/* Texto da habilidade do Pokémon com base no index*/}
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
