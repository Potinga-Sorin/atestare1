import { useState, useEffect } from "react";
import imagesData from "../../data/images.json";
import Image from "../Image/Image";
import styles from "./App.module.css";

const dublamAmestecam = () => {
  const duplicateImages = [...imagesData, ...imagesData];
  return duplicateImages
    .sort(() => Math.random() - 0.5)
    .map((image, id) => ({
      id: id,
      url: image.url,
      isFlipped: false,
      isMatched: false,
    }));
};

export default function App() {
  const [carti, setCarti] = useState([]);
  const [cartiSelectate, setCartiSelectate] = useState([]);
  const [mutari, setMutari] = useState(0);

  useEffect(() => {
    setCarti(dublamAmestecam());
  }, []);

  useEffect(() => {
    if (cartiSelectate.length === 2) {
      setMutari(mutari + 1);
      const [prima, aDoua] = cartiSelectate;
      if (prima.url === aDoua.url) {
        setCarti((prev) =>
          prev.map((carte) =>
            carte.url === prima.url ? { ...carte, isMatched: true } : carte
          )
        );
      } else {
        setTimeout(() => {
          setCarti((prev) =>
            prev.map((carte) =>
              carte.id === prima.id || carte.id === aDoua.id
                ? { ...carte, isFlipped: false }
                : carte
            )
          );
        }, 1000);
      }
      setCartiSelectate([]);
    }
  }, [cartiSelectate]);

  const handleCardClick = (id) => {
    if (cartiSelectate.length < 2) {
      setCarti((prev) =>
        prev.map((carte) =>
          carte.id === id && !carte.isFlipped && !carte.isMatched
            ? { ...carte, isFlipped: true }
            : carte
        )
      );
      setCartiSelectate((prev) =>
        [...prev, carti.find((carte) => carte.id === id)].filter(Boolean)
      );
    }
  };

  const resetGame = () => {
    setCarti(dublamAmestecam());
    setCartiSelectate([]);
    setMutari(0);
  };

  return (
    <div className={styles.container}>
      <button className={styles.resetButton} onClick={resetGame}>
        Restart
      </button>
      <p>Mutări: {mutari}</p>
      <div className={styles.imageList}>
        {carti.map((carte) => (
          <div
            key={carte.id}
            className={`${styles.card} ${
              carte.isFlipped ? styles.flipped : ""
            }`}
            onClick={() => handleCardClick(carte.id)}
          >
            {carte.isFlipped || carte.isMatched ? (
              <img src={carte.url} alt="card" />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
