import React, { useEffect, useState } from "react";
import {
  getCharacter,
  getImgCharacter,
  getPeople,
  getSerchPeople,
} from "./api/people";
import { Form } from "./components/Form";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [showPeople, setShowPeople] = useState("");
  const [formSearchPeople, setFormSearchPeople] = useState({});

  const [pagination, setPagination] = useState(1);

  //obtenemos id para cosultar api y obtener la imagen
  const [idImg, setIdimg] = useState(1);
  //guardamos la imagen
  const [imgCharacter, setimgCharacter] = useState("");

  const [errorState, setErrorState] = useState({ hasError: true });

  const handelError = () => setErrorState({ hasError: false });

  //llamamos
  useEffect(() => {
    getPeople(pagination)
      .then((data) => {
        // console.log(data.results);
        setPeople(data);
      })
      .catch(handelError);
  }, [pagination]);

  useEffect(() => {
    getCharacter(currentCharacter)
      .then((data) => setShowPeople(data))
      .catch((err) => console.log(err));
  }, [currentCharacter]);

  //OBTENER IMG POR ID y la pasamos a el end point
  useEffect(() => {
    getImgCharacter(idImg)
      .then((data) => setimgCharacter(data.image))
      .catch((err) => console.log(err));
  }, [idImg]);

  // obtenemos el id de la ruta url
  const showDetails = (character) => {
    // console.log(character.url.split("/").slice(-2)[0]);
    const id = Number(character.url.split("/").slice(-2)[0]);
    setCurrentCharacter(id);
    setIdimg(id);
    // console.log(showPeople);
  };

  //funcion buscador de personaje
  const searchPeople = (form) => {
    if (form.length - 1 === 0) {
      getPeople(pagination).then((data) => {
        // console.log(data.results);
        setPeople(data);
      });
    }
    setFormSearchPeople(form);

    getSerchPeople(formSearchPeople).then((data) => {
      // console.log(data);
      setPeople(data);
    });
  };

  //funcion para hacer el paginado de la App
  const handelNexAndPrevius = (nextAndPrv) => {
    // console.log(pagination);
    if (!people.previus && pagination + nextAndPrv <= 0) return;
    if (!people.previus && pagination + nextAndPrv >= 9) return;

    setPagination(pagination + nextAndPrv);
  };

  return (
    <section className="section">
      <Form searchPeople={searchPeople} />

      <ul className="list">
        {people.results &&
          people?.results?.map((character) => (
            <li
              style={{ cursor: "pointer" }}
              className="list__details"
              key={character.name}
              onClick={() => showDetails(character)}
            >
              {character.name}
            </li>
          ))}
      </ul>

      <div className="section__details">
        {showPeople && (
          <aside className="aside">
            <h2>{showPeople.name}</h2>
            <ul className="list lsit_details">
              <li className="list__item list_item--img">
                <img width={""} src={`${imgCharacter}`} />
              </li>
              <li className="list__item">masa: {showPeople.mass}</li>
              <li className="list__item">altura: {showPeople.height}</li>
              <li className="list__item">
                edad-nacimiento: {showPeople.birth_year}
              </li>
            </ul>
          </aside>
        )}
      </div>

      <div className="button-container">
        <button className="button" onClick={() => handelNexAndPrevius(-1)}>
          prev
        </button>
        <button className="button" onClick={() => handelNexAndPrevius(+1)}>
          next
        </button>
      </div>
    </section>
  );
}

export default App;
