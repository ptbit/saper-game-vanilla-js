const WIDTH = 11
const HEIGHT = 11 
const MINES_COUNT = 11


// создаем матрицу из обьектов
function creatematrix (width, height)
{
    let mas = []
    let index = 1
    for (i = 0; i < width; i++) 
    {
        let row = []
        for (j = 0; j < height; j++) 
        {
            row.push({
                id: index++,
                mine: false,
                num: 0,
                flag: false,
                lClick: false,
                rClick: false,
                pod: false,
                show: false,
                boom: false,
            })
        }
        mas.push(row)
    }
    return mas
}

//функция для рендера матрицы
function renderGame (matrix) {
    const battlefield = document.createElement('div')// создаем элемент див
    battlefield.classList.add ('container') //добавляем ему класс
    
    for (let i = 0; i <matrix.length; i++)
        {
            const row = document.createElement('div') // создаем элемент див для ряда матрицы
            row.classList.add ('row') //добавляем ему класс
            

            for (let j = 0; j <matrix[i].length; j++)
            {   
                const cell = matrix[i][j]
                const img = document.createElement('img')
                img.draggable = false // убираем возможность перетаскивать картинку
                img.oncontextmenu = () => false // убираем стандартное всплывающее меню на ПКМ
                img.classList.add(`${cell.id}`) //каждой картинке добавляем класс id
                row.append(img) // добавляем эл в див "ряд"
                
                if (cell.pod == true) {
                    img.src="./img/pot.png"
                 continue
                }
                if(cell.mine === true && cell.show === true)//рисуем мину
                {
                    if (cell.boom === true) {
                        img.src="./img/red-mine.png"    
                    }
                    else
                    img.src="./img/mine.png"
                    gameOwer() //запуск функции конца игры
                    continue
                }
             
                if (cell.num==0  && cell.show === true&& cell.mine == false)//открываем пустую клетку
                {
                    img.src="./img/open.png"
                    continue
                }
                if (cell.num>0  && cell.show === true)//рисуем цифру если она есть
                {
                    img.src=`./img/num${matrix[i][j].num}.png`
                    continue
                }
                if (cell.flag)//рисуем флаг
                {   
                    console.log('ячейка с флагом:',cell.id)
                    img.src="./img/flag.png"
                    continue
                }
                else
                {   if (cell.flag === false)

                    {
                    img.src="./img/item.png"
                    img.classList.add(`${cell.id}`)
                    continue
                    }
                }
             }

             battlefield.append(row)
        }
        console.log('РЕНДЕР')
        return battlefield
}



//функция получающая матрицу и возвращающая случайный обьект без мины
function getRandomFreeCell (matrix){
  let freeCells = []
  for (let i = 0; i <WIDTH; i++)
  {
      for (let j = 0; j <HEIGHT; j++)
      {
          let cell = matrix[i][j];
          if (!cell.mine)
          {
              freeCells.push(cell)
          }
      }
  }
  
  //На этом моменте в массиве freeCells находятся все ОБЬЕКТЫ БЕЗ мин
  //теперь выбираем случайный из них и возвращаем его
  idFreeCell = Math.floor(Math.random()* freeCells.length)
  return freeCells[idFreeCell].id
}

//функция создаюцая в матрице мину в рандомном СВОБОДНОМ от мины месте
function createRandomeMine (matrix){
    let cellForMine = getRandomFreeCell(matrix)
    // console.log('Мина создана в ячейке №'+cellForMine)
    for (let i = 0; i <WIDTH; i++) //расставляем цифры вокруг созданной мины
  {
      for (let j = 0; j <HEIGHT; j++)
      {
        if(matrix[i][j].id == cellForMine)
            {
                if(matrix[i][j].mine == true){console.log('ОШИБКА!')}
                matrix[i][j].mine = true
                if (j<HEIGHT-1){matrix[i][j+1].num +=1} //справа
                if (j>0){matrix[i][j-1].num +=1} //слева
                if (i<WIDTH-1){matrix[i+1][j].num +=1} //внизу
                if (i>0){matrix[i-1][j].num +=1} //вверх
                if (i>0 && j>0){matrix[i-1][j-1].num +=1} //вверх - лево
                if (i>0 && j<HEIGHT-1){matrix[i-1][j+1].num +=1} //вверх - право
                if (i<WIDTH-1 && j>0){matrix[i+1][j-1].num +=1} //внизу - лево
                if (i<WIDTH-1 && j<HEIGHT-1){matrix[i+1][j+1].num +=1} //внизу - право
            }
      }
  }
}

//функция которая удаляет число мин на клетке с миной
function clearCount(matrix)
{
    for (let i = 0; i <WIDTH; i++) 
    {
        for (let j = 0; j <HEIGHT; j++)
        {
          if(matrix[i][j].mine == true)
              {matrix[i][j].num = 0}
        }
    }
}

//функция конца игры через проиграш
function gameOwer() {
    console.log('Game OWER! You LOSE!')
    btnSlot.innerHTML = newGame3
    let btnNG = document.querySelector("#btn_new_game")//находим кнопку по id
    btnNG.addEventListener("click",newGame) // вешаем слушатель события на клик 
    for (let i = 0; i <WIDTH; i++)
    {
      for (let j = 0; j <HEIGHT; j++)
      {
        const cell = matrix[i][j]
            cell.show = true
            
      }
    }
}

//функция проверки конца игры через ПОБЕДУ
function checWin(matrix) 
{
    let winCount = 0
    for (let i = 0; i <WIDTH; i++)
    {
      for (let j = 0; j <HEIGHT; j++)
      {
        const cell = matrix[i][j]
            if (cell.mine == true && cell.flag == true)
            {
                winCount ++
                console.log('count')
            }
      }
    }
    if (winCount == MINES_COUNT)
    {
        console.log('You Win The Game!')
        btnSlot.innerHTML = newGame2
        let btnNG = document.querySelector("#btn_new_game")//находим кнопку по id
        btnNG.addEventListener("click",newGame) // вешаем слушатель события на клик 
    }
}
