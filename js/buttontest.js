
const site = document.querySelector("#container")
site.innerHTML = ''
const img = document.createElement('img')
img.draggable = false // убираем возможность перетаскивать картинку
img.oncontextmenu = () => false // убираем стандартное всплывающее меню на ПКМ
img.src="./img/mine.png"
site.append(img)

const allImg = document.querySelectorAll("img")

let mouse = {
    leftButtonDown: false,
    rightButtonDown: false,
    leftButtonUp: false,
    rightButtonUp: false
}

for (let i = 0; i < allImg.length; i++) 
{
    allImg[i].addEventListener("mousedown", imgClickD)
    allImg[i].addEventListener("mouseup", imgClickU)
}

function imgClickD (e) {
    let buttonD = e.which
    if (buttonD == 1) 
    {
        console.log('Нажата кнопка', buttonD)
        mouse.leftButtonDown = true
        mouse.leftButtonUp = false
    }
    if (buttonD == 3) 
    {
        console.log('Нажата кнопка', buttonD)
        mouse.rightButtonDown = true
        mouse.rightButtonUp = false
    }
     checkButton()
}

function imgClickU (e) {
    let buttonU = e.which
    if (buttonU == 1) 
    {
        console.log('Отпущена кнопка', buttonU)
        mouse.leftButtonUp = true
        mouse.leftButtonDown = false
    }
    if (buttonU == 3) 
    {
        console.log('Отпущена кнопка', buttonU)
        mouse.rightButtonUp = true
        mouse.rightButtonDown = false
    }
    
}

function checkButton(){
    console.log(mouse)
    if (mouse.leftButtonDown && mouse.rightButtonDown)
    {
        console.log('ДАБЛ БЛЯ')
    }
}
// && !mouse.leftButtonUp && !mouse.rightButtonUp