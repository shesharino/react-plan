import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';

const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

export default function AxiosExample() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonName, setPokemonName] = useState('bulbasaur');
  const [pokemonData, setPokemonData] = useState(null);

  const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    fetch(baseURL, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setPokemonList(data.results.map((x: any) => x.name)))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (pokemonName) {
      fetch(baseURL + pokemonName, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => setPokemonData(data))
        .catch((error) => console.log(error));
    }
  }, [pokemonName]);

  return (
    <>
      <Stack direction="horizontal" gap={1}>
        Select a Pokemon:
        {pokemonList.length > 0 &&
          <DropdownButton title={capitalize(pokemonName)} onSelect={eventKey => setPokemonName(eventKey)}>
            {pokemonList.map(pokemon =>
              <Dropdown.Item key={pokemon} eventKey={pokemon} active={pokemon === pokemonName}>
                {capitalize(pokemon)}
              </Dropdown.Item>
            )}
          </DropdownButton>
        }
        {pokemonData && <>
          <Image src={pokemonData.sprites.front_default} />
          <Image src={pokemonData.sprites.back_default} />
        </>}
      </Stack>
      {pokemonData &&
        <Table>
          <tbody>
            <tr>
              <td>Types:</td>
              <td>{pokemonData.types.map((x: any, index: number) => <>
                {index > 0 && ', '}
                <a href={x.type.url}>{capitalize(x.type.name)}</a>
              </>)}</td>
            </tr>
            <tr>
              <td>Abilities:</td>
              <td>{pokemonData.abilities.map((x: any, index: number) => <>
                {index > 0 && ', '}
                <a href={x.ability.url}>{capitalize(x.ability.name)}</a>
              </>)}</td>
            </tr>
            <tr>
              <td>Stats:</td>
              <td>
                <Table>
                  <tbody>
                    {pokemonData.stats.map((x: any, index: number) =>
                      <tr>
                        <td>
                          <a href={x.stat.url}>{capitalize(x.stat.name)}</a>
                        </td>
                        <td>{x.base_stat}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td>Height / Weight:</td>
              <td>{pokemonData.height / 10} m / {pokemonData.weight / 10} kg</td>
            </tr>
          </tbody>
        </Table>
      }
    </>
  );
}
