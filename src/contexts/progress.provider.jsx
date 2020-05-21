import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import SheetReader from "g-sheets-api";
import characterList from "../consts/character-list";

export const ProgressContext = React.createContext();
const readerOptions = {
  sheetId: "198_edN0tHz5f7SZThERe-h0X3yN3j4aGTwNBuTIjIHw",
  returnAllResults: false,
  sheetNumber: 1
};

const trimResults = ([...resultSet]) => {
  return resultSet.filter(
    result =>
      result.steps !== undefined &&
      result.distance !== undefined &&
      result.total !== undefined
  );
};

const setCharacterProgress = (characterName, progress) => {
  const character = characterList.get(characterName);
  character.setProgress(progress);
  return character;
};

/**
 * Gives the current progress as accessed by the above Google Sheets
 * Sarah on Sheet 1
 * Lucy on Sheet 2
 */
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(characterList);

  const getProgress = () => {
    SheetReader(readerOptions, sarahResults => {
      setCharacterProgress("sarah", trimResults(sarahResults));
      setProgress(new Map(characterList));
    });
    SheetReader({ ...readerOptions, sheetNumber: 2 }, lucyResults => {
      setCharacterProgress("lucy", trimResults(lucyResults));
      setProgress(new Map(characterList));
    });
  };

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <ProgressContext.Provider value={{ progress }}>
      {children}
    </ProgressContext.Provider>
  );
};

ProgressProvider.propTypes = {
  children: PropTypes.any
};
