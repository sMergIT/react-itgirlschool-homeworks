import React, { useState, useMemo, useContext } from 'react';
import './TableRow.scss';
import ButtonEdit from './Buttons/Button_edit';
import ButtonDelete from './Buttons/Button_delete';
import ButtonSave from './Buttons/Button_save';
import ButtonCancel from './Buttons/Button_cancel';
import classnames from 'classnames';
import WordsContex from './context/WordsContex';

// console.log(rowData.english); //вот так обращаемся к value inputов

//условия валидации полей input
const englishFormat = /^[a-zA-Z-\s]+$/; //поле english должно содержать только слова англ буквами, включая дефис (можно прописывать отдельно и заглавные и строчные)
const russianFormat = /^[а-яё-\s]+$/i; //поле english должно содержать только слова русскими буквами, включая дефис (а можно использовать флаг /i)

const TableRow = function (props) {
  const [editMode, setEditMode] = useState(false); // режим редактирования строчки таблицы (самого компонента TableRow) изначально не редактируема (false)

  //если данные берутся из пропсов (из файла dataWords)
  // const [rowData, setRowData] = useState({
  //   //первоначальные состояния (текст) полей input (из пропсов)
  //   english: props.english,
  //   transcription: props.transcription,
  //   russian: props.russian,
  // });

  const [rowData, setRowData] = useContext(WordsContex);

  //валидация

  const isRowInValid = useMemo(() => {
    // console.log(russianFormat.test(rowData.russian));
    return (
      rowData.english.search(englishFormat) === -1 ||
      russianFormat.test(rowData.russian) !== true ||
      rowData.english === '' ||
      rowData.transcription === '' ||
      rowData.russian === ''
    );
  }, [rowData.russian, rowData.english, rowData.transcription]);

  // стили для полей input (inputTableRow и если поле пустое/есть неправильные символы - redInputTableRow)
  const classNameInputEnglish = classnames('', {
    redInputTableRow: isRowInValid,
    // redInputTableRow:
    //   rowData.english === '' || englishFormat.test(rowData.english) !== true,
  });
  const classNameInputTranscription = classnames('', {
    redInputTableRow: rowData.transcription === '',
  });
  const classNameInputRussian = classnames('', {
    redInputTableRow:
      rowData.russian === '' || russianFormat.test(rowData.russian) !== true,
  });

  const handleClick = () => setEditMode(!editMode); //по клику у строки появляется состояние редактируема

  //изменение состояния полей
  const handleChange = e => {
    setRowData({
      ...rowData, //копируем объект с полями rowData
      [e.target.name]: e.target.value.toLowerCase(), //изменяем value inputов на вводимые значения в зависимости от ключа name и маленькими буквами (toLowerCase)
    });
  };

  //кнопка сохранить
  const handleClickSave = () => {
    if (!isRowInValid) {
      console.log(rowData);
      setEditMode(!editMode); //снова убирается режим редактирования
    } else {
      alert(
        //срабатывает, если закоменнить в конпке // disabled={isRowInValid}
        'Остались незаполненные поля или поля содержат недопустимые знаки!',
      );
    }
  };

  return (
    <tr className="tableRow">
      <td>
        {editMode ? (
          <input
            // className={classNameInputEnglish} тогда в classNameInputEnglish надо заменить ' ' на 'inputTableRow'
            //или вариант:
            className={`inputTableRow ${classNameInputEnglish}`}
            value={rowData.english}
            name="english"
            onChange={handleChange}
          />
        ) : (
          rowData.english
        )}
      </td>
      <td>
        {editMode ? (
          <input
            className={`inputTableRow ${classNameInputTranscription}`}
            value={rowData.transcription}
            name="transcription"
            onChange={handleChange}
          />
        ) : (
          rowData.transcription
        )}
      </td>
      <td>
        {editMode ? (
          <input
            className={`inputTableRow ${classNameInputRussian}`}
            value={rowData.russian}
            name="russian"
            onChange={handleChange}
          />
        ) : (
          rowData.russian
        )}
      </td>

      {editMode ? (
        <td className="tableRow_actions">
          <ButtonSave
            onClick={handleClickSave}
            // disabled={isRowInValid} //надо закомментить это, чтобы срабатывал alert
          />
          <ButtonCancel onClick={handleClick} />
        </td>
      ) : (
        <td className="tableRow_actions">
          <ButtonEdit onClick={handleClick} />
          <ButtonDelete />
        </td>
      )}
    </tr>
  );
};

export default TableRow;

//от Вари, но не включена проверка на символы
// const getClassName = value =>
//   `inputTableRow ${!value.length ? 'redInputTableRow' : ''}`;

// вариант для написания классов для инпутов:
// сделать отдельный метод для проверки на длину:
// const isValidLength = value =>!!value.length;
// И отдельный метод для проверки регулярки:
// const areAllCharactersValid = (value, regExp) => rvalue.search(regExp) !== -1
// И потом по ним получать класс:
// `inputTableRow ${!isValidLength(rowData.english) || !areAllCharactersValid(rowData.english, englishFormat) ? 'redInputTableRow' : ''}`
