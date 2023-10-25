import SheetReader from "g-sheets-api";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import characterList from "../consts/character-list";

export const ProgressContext = React.createContext();
const readerOptions = {
  sheetId: "1iTc6dyOQe-blqxITkqB58eSi1a65_Xb0YKFPCIO55as",
  returnAllResults: false
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
export const ProgressHook = () => {
  const [progress, setProgress] = useState(characterList);

  const getProgress = () => {
    // SheetReader({ ...readerOptions, sheetNumber: 1 }, sarahResults => {
    //   setCharacterProgress("sarah", trimResults(sarahResults));
    //   setProgress(new Map(characterList));
    // });
    // SheetReader({ ...readerOptions, sheetNumber: 2 }, lucyResults => {
    //   setCharacterProgress("lucy", trimResults(lucyResults));
    //   setProgress(new Map(characterList));
    // });
    setCharacterProgress("sarah", [{ steps: 118043, distance: 86.9, total: 300, remaining: 198 }]);
    setProgress(new Map(characterList));
    setCharacterProgress("lucy", [{ steps: 85439, distance: 65.1, total: 500, remaining: 220}]);
    setProgress(new Map(characterList));

  };

  useEffect(() => {
    getProgress();
  }, []);

  return { progress };
};

ProgressHook.propTypes = {
  children: PropTypes.any
};
