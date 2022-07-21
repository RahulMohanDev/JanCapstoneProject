import React, { useEffect, useState } from "react";

function getDogList(dogsObject) {
  const dogs = [];
  for (let dog in dogsObject) {
    dogs.push(dog);
  }
  return dogs;
}

export default function Card() {
  const [dogs, setDogs] = useState([]);
  const [dogImage, setDogImage] = useState({
    src: null,
    alt: "notSelected",
  });
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    fetch(`https://dog.ceo/api/breeds/list/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setDogs(getDogList(response.message));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedDog) {
      fetch(`https://dog.ceo/api/breed/${selectedDog}/images/random`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setDogImage({ src: response.message, alt: selectedDog });
        })
        .catch((error) => console.log(error));
    }
  }, [selectedDog]);

  const onClickHandler = (event) => {
    setSelectedDog(event.target.value);
  };

  return (
    <div className="card">
      <h1>Paw Select</h1>
      <select onChange={onClickHandler}>
        {dogs.map((dog) => (
          <option value={dog} key={dog}>
            {dog}
          </option>
        ))}
      </select>
      <img src={dogImage.src} alt={dogImage.alt} className="dog-image"></img>
    </div>
  );
}
