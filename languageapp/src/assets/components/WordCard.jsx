import React, { useState } from 'react';
import './WordCard.scss';
import ButtonCheck from './Buttons/Button_check.jsx';

const WordCard = props => {
  const [clicked, showTranslate] = useState(false); //Состояние, которое хранит индекс выделенной карточки

  const handleClick = () => {
    showTranslate(!clicked);
  };

  return (
    <div className="wordCard">
      <div className="englishWord">{props.english}</div>
      <div className="englishTranscription">{props.transcription}</div>
      {/* <div className="russianWord">{props.russian}</div> */}
      {/* условный рендеринг: кликнули на кнопку - появился перевод */}
      <div className="checking">
        {clicked ? (
          <div className="russianWord">{props.russian}</div>
        ) : (
          <ButtonCheck onClick={handleClick} />
        )}
      </div>
    </div>
  );
};

export default WordCard;