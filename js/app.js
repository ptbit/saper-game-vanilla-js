let matrix = creatematrix(WIDTH,HEIGHT)
console.log(matrix)

//добавляем необходимое число мин
for(i = 0; i<MINES_COUNT; i++)
{
    createRandomeMine(matrix)
    clearCount(matrix)
}


//Добавляем кнопку старта новой игры (смайлик)
const newGame1 = '<button class="btn_new_game" id="btn_new_game"></button>' // фон кнопки пока игра не выиграна
const newGame2 = '<button class="btn_new_game2" id="btn_new_game"></button>'// фон кнопки после победы
const newGame3 = '<button class="btn_new_game3" id="btn_new_game"></button>'// фон кнопки после проиграша
const flagLeftCounter = 'Осталось <button disabled="true" class="flagLeftCounter" id="flagLeftCounter"></button>' //картинка флага

let btnSlot = document.querySelector("#buttons") // находим  DIV для кнопок по id
let flagSlot = document.querySelector("#flag") // находим  DIV для флага по id

// btnSlot.innerHTML = '' //чистим внутрянку
btnSlot.innerHTML = newGame1 // делаем стартовый вид у кнопки
// flagSlot.innerHTML = '' //чистим внутрянку
// flagSlot.innerHTML = flagLeftCounter + flagCount

let btnNG = document.querySelector("#btn_new_game")//находим кнопку по id
btnNG.addEventListener("click",newGame) // вешаем слушатель события на клик 

//функция аналогичная кнопке F5 с клавиатуры
function newGame (){
    window.location.reload();
}


function update(matrix) {
const rMatrix = renderGame(matrix) //запускаем рендер матрицы
const ggame = document.querySelector("#container")
ggame.innerHTML = ''
ggame.append(rMatrix)

const allImg = document.querySelectorAll("img")

//----------------------------------------------------------------
checWin(matrix)
// console.log('Осталось флагов:',flagCount)
// flagSlot.innerHTML = flagLeftCounter + flagCount
// console.log(closetCells)
//проверка на  победу
let winCount = 0
    for (let i = 0; i <WIDTH; i++)
    {
      for (let j = 0; j <HEIGHT; j++)
      {
        const cell = matrix[i][j]
            if (cell.mine == true && cell.flag == true)
            {
                winCount ++
            }
      }
    }
    //если не победа вешаем на все картинки слушатель события
if (winCount != MINES_COUNT) {
for (let i = 0; i < allImg.length; i++) 
{
    allImg[i].addEventListener("mousedown", imgClickD)
    allImg[i].addEventListener("mouseup", imgClickU)
    if(allImg[i].id ==='settup') {
        // console.log('нужно удалить eventListener с этой картинки', allImg[i])
        allImg[i].removeEventListener("mousedown", imgClickD)
        allImg[i].removeEventListener("mouseup", imgClickU)
    }
}
}

}

update(matrix)

const allImg = document.querySelectorAll("img")


//обьект для мышки со статусами состояния кнопок
let mouse = {
    leftButtonDown: false,
    rightButtonDown: false,
    leftButtonUp: false,
    rightButtonUp: false
}


//функция отслеживающая клик мышки по картинке, определяющая какой кнопкой сделан клик 
// и запускающая либо фун. установки флага либо фун. открытия ячейки
function imgClickD (e)
{   
    let buttonD = e.which
    let cellIdDown = e.target.className
    // console.log('buttonDown:',buttonD)
    // console.log('cellIdDown:',cellIdDown)
    if (buttonD == 3)
    {
        mouse.rightButtonDown = true
        mouse.rightButtonUp = false
        putFlag(matrix, cellIdDown)
        update(matrix)
    }
    if (buttonD == 1){
        mouse.leftButtonDown = true
        mouse.leftButtonUp = false
        openCell(matrix,cellIdDown)
        update(matrix)
    }
    checkButton(cellIdDown)
}

function imgClickU (e)
{   
    let buttonU = e.which
    if (buttonU == 1) 
    {
        console.log('Отпущена кнопка', buttonU)
        mouse.leftButtonUp = true
        mouse.leftButtonDown = false
        antiPod(matrix)
    }
    if (buttonU == 3) 
    {
        console.log('Отпущена кнопка', buttonU)
        mouse.rightButtonUp = true
        mouse.rightButtonDown = false
        antiPod(matrix)
    }
}

//функция проверки случая зажатия 2-х кнопок мышки
function checkButton(id){
    
    if (mouse.leftButtonDown && mouse.rightButtonDown)
    {
        console.log('----------------ДАБЛ-----------')
        for (let i = 0; i <WIDTH; i++)
        {
            for (let j = 0; j <HEIGHT; j++)
            {
                const cell = matrix[i][j]
                if (cell.id == id) {
                    if (cell.show && cell.num>0){
                        console.log('РАБОТАЕМ')      
                        console.log('нашли ячейку', cell)
                        console.log('цифра в ячейке: ', cell.num)
                        let countFlag = 0
                        //считаем количество флагов вокруг этой ячейки
                        if(j-1>-1){if (matrix[i][j-1].flag)countFlag++}//лево
                        if(j+1<HEIGHT){if (matrix[i][j+1].flag)countFlag++}//право
                        if(i+1<WIDTH){if (matrix[i+1][j].flag)countFlag++}//ввниз
                        if(i-1>-1){if (matrix[i-1][j].flag)countFlag++}//вверх
                        if(j-1>-1 && i+1<WIDTH){if (matrix[i+1][j-1].flag)countFlag++}//лево и низ
                        if(j-1>-1 && i-1>-1){if (matrix[i-1][j-1].flag)countFlag++}//лево и вверх
                        if(j+1<HEIGHT && i+1<WIDTH){if (matrix[i+1][j+1].flag)countFlag++}//право и низ
                        if(j+1<HEIGHT && i-1>-1){if (matrix[i-1][j+1].flag)countFlag++}//право и вверх
                        console.log('флагов по периметру', countFlag)
                         //когда цифра БОЛЬШЕ количество флагов по периметру
                        if (cell.num > countFlag) {
                            console.log('нужна подсказка')
                            // всем ячейкам по периметру меняем картинку
                            if(j-1>-1){if (!matrix[i][j-1].show && !matrix[i][j-1].flag)matrix[i][j-1].pod = true}//лево
                            if(j+1<HEIGHT){if (!matrix[i][j+1].show && !matrix[i][j+1].flag)matrix[i][j+1].pod = true}//право
                            if(i+1<WIDTH){if (!matrix[i+1][j].show && !matrix[i+1][j].flag)matrix[i+1][j].pod = true}//ввниз
                            if(i-1>-1){if (!matrix[i-1][j].show && !matrix[i-1][j].flag)matrix[i-1][j].pod = true}//вверх
                            if(j-1>-1 && i+1<WIDTH){if (!matrix[i+1][j-1].show && !matrix[i+1][j-1].flag)matrix[i+1][j-1].pod = true}//лево и низ
                            if(j-1>-1 && i-1>-1){if (!matrix[i-1][j-1].show && !matrix[i-1][j-1].flag)matrix[i-1][j-1].pod = true}//лево и вверх
                            if(j+1<HEIGHT && i+1<WIDTH){if (!matrix[i+1][j+1].show && !matrix[i+1][j+1].flag)matrix[i+1][j+1].pod = true}//право и низ
                            if(j+1<HEIGHT && i-1>-1){if (!matrix[i-1][j+1].show && !matrix[i-1][j+1].flag)matrix[i-1][j+1].pod = true}//право и вверх
                            update(matrix)
                        }
                        //когда цифра и количество флагов по периметру ОДИНАКОВЫЕ
                        if (cell.num == countFlag)
                        {
                            console.log('ЦЫФРЫ РАВНЫ')
                            //Берем все ячейки по периметру и меняем им статус show на true
                            if(j-1>-1)
                                {if (!matrix[i][j-1].show && !matrix[i][j-1].flag && matrix[i][j-1].num == 0) 
                                {openCell(matrix, matrix[i][j-1].id) }
                                else if (!matrix[i][j-1].show && !matrix[i][j-1].flag) {matrix[i][j-1].show = true}}//лево

                            if(j+1<HEIGHT)
                                {if (!matrix[i][j+1].show && !matrix[i][j+1].flag && matrix[i][j+1].num == 0) 
                                {openCell(matrix, matrix[i][j+1].id) }
                                else if (!matrix[i][j+1].show && !matrix[i][j+1].flag) {matrix[i][j+1].show = true}}//право

                            if(i+1<WIDTH)
                                {let elNiz = matrix[i+1][j]
                                    if (!elNiz.show && !elNiz.flag && elNiz.num == 0) 
                                {openCell(matrix, elNiz.id) }
                                else if (!elNiz.show && !elNiz.flag) {elNiz.show = true}}//ввниз

                            if(i-1>-1)
                                {let elVerh = matrix[i-1][j]
                                if (!elVerh.show && !elVerh.flag && elVerh.num == 0) 
                                {openCell(matrix, elVerh.id) }
                                else if (!elVerh.show && !elVerh.flag) {elVerh.show = true}}//вверх

                            if(j-1>-1 && i+1<WIDTH)
                                {let elLNiz = matrix[i+1][j-1]
                                if (!elLNiz.show && !elLNiz.flag && elLNiz.num == 0) 
                                {openCell(matrix, elLNiz.id) }
                                else if (!elLNiz.show && !elLNiz.flag) {elLNiz.show = true}}//лево и низ

                            if(j-1>-1 && i-1>-1)
                                {let elLVerh = matrix[i-1][j-1]
                                if (!elLVerh.show && !elLVerh.flag && elLVerh.num == 0) 
                                {openCell(matrix, elLVerh.id) }
                                else if (!elLVerh.show && !elLVerh.flag) {elLVerh.show = true}}//лево и вверх

                            if(j+1<HEIGHT && i+1<WIDTH)
                                {let elPNiz = matrix[i+1][j+1]
                                if (!elPNiz.show && !elPNiz.flag && elPNiz.num == 0) 
                                {openCell(matrix, elPNiz.id) }
                                else if (!elPNiz.show && !elPNiz.flag) {elPNiz.show = true}}//право и низ

                            if(j+1<HEIGHT && i-1>-1)
                                {let elPVerh = matrix[i-1][j+1]
                                if (!elPVerh.show && !elPVerh.flag && elPVerh.num == 0) 
                                {openCell(matrix, elPVerh.id) }
                                else if (!elPVerh.show && !elPVerh.flag) {elPVerh.show = true}}//право и вверх

                        }
                    }
                }
            }
        }
    }
    //считаем остаток неоткрытых ячеек за вычетом ячеек с флагами
    let closetCells = 0
    for (let i = 0; i <WIDTH; i++)
        {
        for (let j = 0; j <HEIGHT; j++)
            {
                const cell = matrix[i][j]
                if (!cell.show)
                {
                    closetCells++
                    // console.log('!cell.show',cell.id)
                }
                if (cell.flag)
                {
                    closetCells--
                    // console.log('cell.flag',cell.id)
                }
            }}
    if (closetCells == flagCount){
        console.log('WINER!!!')
        for (let i = 0; i <WIDTH; i++)
        {
        for (let j = 0; j <HEIGHT; j++)
            {
                const cell = matrix[i][j]
                if (cell.mine) {
                    cell.flag = true
                }
            }}
    }
}

//функция для установки флага
function putFlag (matrix,id) 
{
    for (let i = 0; i <WIDTH; i++)
    {
      for (let j = 0; j <HEIGHT; j++)
      {
        const cell = matrix[i][j]
        if (cell.id == id && !cell.show)
        {
            console.log('ФЛАГ')
            if (cell.flag == false) 
            {
                if (flagCount>0){
                    console.log('LLL2')
                    cell.flag = true
                    flagCount--

                }
                // flagCount--  //счетчик оставшихся флагов уменьшаем на 1
                // flagSlot.innerHTML = flagLeftCounter + flagCount
                // console.log('flagCount',flagCount)
                // console.log('меняем флаг на true')
                //считаем остаток неоткрытых ячеек за вычетом ячеек с флагами
                let closetCells = 0
                for (let i = 0; i <WIDTH; i++)
                    {
                    for (let j = 0; j <HEIGHT; j++)
                        {
                            const cell = matrix[i][j]
                            if (!cell.show)
                            {
                                closetCells++
                                // console.log('!cell.show',cell.id)
                            }
                            if (cell.flag)
                            {
                                closetCells--
                                // console.log('cell.flag',cell.id)
                            }
                        }}
                if (closetCells == flagCount){
                    console.log('WINER!!!')
                    for (let i = 0; i <WIDTH; i++)
                    {
                    for (let j = 0; j <HEIGHT; j++)
                        {
                            const cell = matrix[i][j]
                            if (cell.mine) {
                                console.log('LLL3')
                                cell.flag = true
                                // if  (flagCount>0){
                                // flagCount--
                                // flagSlot.innerHTML = flagLeftCounter + flagCount}
                            }
                        }}
                }
                
            }
            else if (cell.flag == true) 
            {
                cell.flag = false 
                flagCount++
                // flagSlot.innerHTML = flagLeftCounter + flagCount
                console.log('flagCount',flagCount)
                console.log('меняем флаг на false')
            }
            console.log(cell)
        }
      }
    }
    // checWin(matrix)
}
//функция для открытия клетки
function openCell (matrix,id)
{
    for (let i = 0; i <WIDTH; i++)
    {
      for (let j = 0; j <HEIGHT; j++)
      {
        const cell = matrix[i][j]
        if (cell.id == id && !cell.show)
        {
             //проверяем состояния флага
             if (cell.flag == true) {continue}

            //проверяем на мину
            if(cell.mine == true){
                cell.show = true 
                cell.boom = true
                continue}
           // открываем ячейку если на ней нет флага и мины
            if (cell.show == true){
                console.log('уже открыта', cell.id)
                continue}
                else 
                {cell.show = true
            //проверка на цифру кликнутой ячейки
            if (!cell.num==0){
                // console.log('Попал в цифру')
            } 
            // открываем все по периметру
            else {
                if(j-1>-1){openCell(matrix, matrix[i][j-1].id)}//лево
                if(j+1<HEIGHT){openCell(matrix, matrix[i][j+1].id)}//право
                if(i+1<WIDTH){openCell(matrix, matrix[i+1][j].id)}//ввниз
                if(i-1>-1){openCell(matrix, matrix[i-1][j].id)}//вверх
                if(j-1>-1 && i+1<WIDTH){openCell(matrix, matrix[i+1][j-1].id)}//лево и низ
                if(j-1>-1 && i-1>-1){openCell(matrix, matrix[i-1][j-1].id)}//лево и вверх
                if(j+1<HEIGHT && i+1<WIDTH){openCell(matrix, matrix[i+1][j+1].id)}//право и низ
                if(j+1<HEIGHT && i-1>-1){openCell(matrix, matrix[i-1][j+1].id)}//право и вверх
            }
        }
        }
      }
    }
    //счтаем остаток неоткрытых ячеек за вычетом ячеек с флагами
    // let closetCells = 0
    // for (let i = 0; i <WIDTH; i++)
    //     {for (let j = 0; j <HEIGHT; j++)
    //         {   const cell = matrix[i][j]
    //             if (!cell.show)
    //             {closetCells++}
    //             if (cell.flag)
    //             {closetCells--}
    //         }}
    // if (closetCells == flagCount){
    //     for (let i = 0; i <WIDTH; i++)
    //     {for (let j = 0; j <HEIGHT; j++)
    //         {const cell = matrix[i][j]
    //         if (cell.mine) {
    //             console.log('LLL4')
    //             cell.flag = true
    //             if  (flagCount>0){
    //             flagCount--
    //                 flagSlot.innerHTML = flagLeftCounter + flagCount}
    //         }}}}
    // checWin(matrix)
}


//функция убирающая у всех эл матрицы параметр подсказки, срабатывает при любом отжатии кнопки
function antiPod(matrix)
{
    for (let i = 0; i <WIDTH; i++)
    {
      for (let j = 0; j <HEIGHT; j++)
      {
        const cell = matrix[i][j]
            if (cell.pod == true) {
                cell.pod = false
                console.log('убираем подсказку с ячейки', cell.id)
            }

      }
}
update(matrix)
}

// что ещё нужно:
//убрать возможность кликать после проиграша