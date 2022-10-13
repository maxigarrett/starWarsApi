export const getPeople = async (pagination) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?page=${pagination}`
    );
    if (!response.ok) {
      throw console.error("failed to load api");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
export const getCharacter = async (id = 1) => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSerchPeople = async (text) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${text}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getImgCharacter = async (id) => {
  try {
    const response = await fetch(
      `https://akabab.github.io/starwars-api/api/id/${id}.json`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
