import React, { useState, useEffect } from 'react';
import style from './QuestionCard.module.css';
const prop = { milk: 0, sirop: 200 };

function Todo() {
  // количесто загрузок молочной базы
  const [milks, setmilk] = useState(0);
  // количесто загрузок сиропа
  const [sirops, setSirop] = useState(0);
  /// модальное окно
  const [isModalMilk, setisModalMilk] = useState(false);
  const [isModalSirop, setisModalSirop] = useState(false);
  const [milkBase, setmilkBase] = useState();
  const [siropBase, setsiropBase] = useState();

  console.log(isModalMilk);

  function plan(num) {
    if (num === 0) return 0;
    //считаем колличество раз загрузки фризера. К примеру 1,5 раза
    const coefficient = num / 60;
    /// считаем целые загрузки. К примеру 1
    var integer = Math.trunc(coefficient);
    /// считаем не целые загрузки. К примеру 0,5
    var fraction = coefficient - integer;
    /// результирующий массив
    var result = [];
    /// проверка на целое число
    if (integer > 0) {
      /// если дробное чило меньше 0.58
      if (fraction !== 0) {
        if (fraction < 0.58) {
          integer = integer - 1;

          for (let index = 0; index < integer; index++) {
            result.push(60);
          }
          var intermediateValue = (fraction + 1) / 2;
          for (let index = 0; index <= 1; index++) {
            var rounding = Math.round(intermediateValue * 60);
            result.push(rounding);
          }
          return result;
        }
      }
      /// если дробное чило больше 0.58
      for (let index = 0; index < integer; index++) {
        result.push(60);
      }

      for (let index = 0; index < 1; index++) {
        var rounding = Math.round(fraction * 60);
        result.push(rounding);
      }
      return result;
    }
    /// если загрузка меньше 1.00 но больше 0.58

    if (coefficient > 0.58) {
      var rounding = Math.round(coefficient * 60);
      result.push(rounding);
      return result;
    }
    result.push(35);
    return result;
  }

  function deleteMilk() {
    setmilk((state) => state.filter((el, i) => i !== 0));
    setisModalMilk(false);
  }

  function deleteSirop() {
    setSirop((state) => state.filter((el, i) => i !== 0));
    setisModalSirop(false);
  }

  function openModalMilk() {
    setisModalMilk(true);
  }

  function openModalSirop() {
    setisModalSirop(true);
  }

  useEffect(() => {
    const resultMilk = plan(prop.milk);
    const resultSirop = plan(prop.sirop);
    setmilk(resultMilk);
    setSirop(resultSirop);
    fetch('/bases')
      .then((result) => result.json())
      .then((bases) => {
        var milkk = bases.filter((el) => el.base_id === 1);
        setmilkBase(milkk);
        var sirop = bases.filter((el) => el.base_id === 2);
        setsiropBase(sirop);
      });
  }, []);

  return (
    <div>
      <h1>План производства</h1>

      <h4>Молочная база:</h4>
      {milks && (
        <>
          {milks.map((el, i) => (
            <button onClick={openModalMilk} key={i}>
              {el}
            </button>
          ))}
        </>
      )}

      <h4>Сироп:</h4>
      {sirops && (
        <>
          {sirops.map((el, i) => (
            <button onClick={openModalSirop} key={i}>
              {el}
            </button>
          ))}
        </>
      )}

      {isModalMilk && (
        <>
          <div className={style.modal}>
            <div className={style.modalDialog}>
              <h2 className={style.modalHeader}>
                Молочная смесь
                <span className={style.modalTimer}> Вес {milks[0]} кг</span>
              </h2>
              <div className={style.modalDialog}>
                Молоко {((milkBase[0].weight / 10) * milks[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Сливки {((milkBase[1].weight / 10) * milks[0]).toFixed(3)}{' '}
              </div>
              <div className={style.modalDialog}>
                Сахар {((milkBase[2].weight / 10) * milks[0]).toFixed(3)}{' '}
              </div>
              <div className={style.modalDialog}>
                Декстроза {((milkBase[3].weight / 10) * milks[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Глюкоза {((milkBase[4].weight / 10) * milks[0]).toFixed(3)}{' '}
              </div>
              <div className={style.modalDialog}>
                Стабилизатор {((milkBase[5].weight / 10) * milks[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Улучшитель {((milkBase[6].weight / 10) * milks[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Сухое молоко {((milkBase[7].weight / 10) * milks[0]).toFixed(3)}
              </div>
              <button onClick={deleteMilk} className={style.modalButton}>
                Готово
              </button>
            </div>
          </div>
        </>
      )}
      <div>-----------------</div>
      {isModalSirop && (
        <>
          <div className={style.modal}>
            <div className={style.modalDialog}>
              <h2 className={style.modalHeader}>
                Сироп
                <span className={style.modalTimer}> Вес {sirops[0]} кг</span>
              </h2>
              <div className={style.modalDialog}>
                Вода {((siropBase[0].weight / 10) * sirops[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Сахар {((siropBase[1].weight / 10) * sirops[0]).toFixed(3)}{' '}
              </div>
              <div className={style.modalDialog}>
                Декстроза {((siropBase[2].weight / 10) * sirops[0]).toFixed(3)}{' '}
              </div>
              <div className={style.modalDialog}>
                Глюкоза {((siropBase[3].weight / 10) * sirops[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Стабилизатор {((siropBase[4].weight / 10) * sirops[0]).toFixed(3)}{' '}
              </div>
              <div className={style.modalDialog}>
                Лимонная кислота {((siropBase[5].weight / 10) * sirops[0]).toFixed(3)}
              </div>
              <div className={style.modalDialog}>
                Улучшитель {((siropBase[6].weight / 10) * sirops[0]).toFixed(3)}
              </div>
              <button className={style.modalButton} onClick={deleteSirop}>
                Готово
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Todo;
