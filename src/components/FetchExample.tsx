import { Fragment, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { capitalize } from "../utils/string";
import { getPokemon, getPokemonList } from "../services/Pokemon";

export default function FetchExample() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonName, setPokemonName] = useState("bulbasaur");
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    getPokemonList((data) => setPokemonList(data));
  }, []);

  useEffect(() => {
    if (pokemonName) {
      getPokemon(pokemonName, (data) => setPokemonData(data));
    }
  }, [pokemonName]);

  return (
    <>
      <Stack direction="horizontal" gap={1}>
        Select a Pokemon:
        {pokemonList.length > 0 && (
          <DropdownButton
            title={capitalize(pokemonName)}
            onSelect={setPokemonName}
          >
            {pokemonList.map((pokemon) => (
              <Dropdown.Item
                key={pokemon}
                eventKey={pokemon}
                active={pokemon === pokemonName}
              >
                {capitalize(pokemon)}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        )}
        {pokemonData && (
          <>
            <Image src={pokemonData.sprites.front_default} />
            <Image src={pokemonData.sprites.back_default} />
          </>
        )}
      </Stack>
      {pokemonData && (
        <Table>
          <tbody>
            <tr>
              <td>Types:</td>
              <td>
                {pokemonData.types.map((x: any, index: number) => (
                  <Fragment key={index}>
                    {index > 0 && ", "}
                    <a href={x.type.url}>{capitalize(x.type.name)}</a>
                  </Fragment>
                ))}
              </td>
            </tr>
            <tr>
              <td>Abilities:</td>
              <td>
                {pokemonData.abilities.map((x: any, index: number) => (
                  <Fragment key={index}>
                    {index > 0 && ", "}
                    <a href={x.ability.url}>{capitalize(x.ability.name)}</a>
                  </Fragment>
                ))}
              </td>
            </tr>
            <tr>
              <td>Stats:</td>
              <td>
                <Table>
                  <tbody>
                    {pokemonData.stats.map((x: any) => (
                      <tr key={x.stat.name}>
                        <td>
                          <a href={x.stat.url}>{capitalize(x.stat.name)}</a>
                        </td>
                        <td>{x.base_stat}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
            </tr>
            <tr>
              <td>Height / Weight:</td>
              <td>
                {pokemonData.height / 10} m / {pokemonData.weight / 10} kg
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
}
