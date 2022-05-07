let widthSettings = document.getElementById('settings-1')
let heighthSettings = document.getElementById('settings-2')
let mineCountSettings = document.getElementById('settings-3')


const img = document.createElement('img')
img.draggable = false // убираем возможность перетаскивать картинку
img.oncontextmenu = () => false // убираем стандартное всплывающее меню на ПКМ
img.src="./img/settup.png"
img.id="settup"
btnSlot.append(img)

const settupBTN = document.querySelector("#settup")
const settings = document.getElementById('settings')
const settingsContainer = document.getElementById('settings_container')
const closeSettings = document.getElementById('close_settings')
const saveSettings = document.getElementById('save_set')

//функционал открытия формы настроек привязаный к кнопке настроек
settupBTN.addEventListener("click",(e) => {
    settings.classList.add('open')
})
//функционал закрытия если кликнуть на крестик справа вверху формы настроек
closeSettings.addEventListener("click",() => {
    settings.classList.remove('open')
})
//функционал закрытия если кликнуть на темную зону вокруг формы настроек
settingsContainer.addEventListener("click",(e) => {
    if (e.target.classList.contains('settings_container'))
    {
        settings.classList.remove('open')
    }
})
//функционал кнопки "save"
saveSettings.addEventListener("click",(e) => {
    e.preventDefault()
    settings.classList.remove('open')
    //записываем в локалстореж значения из настроек
    localStorage.setItem('width', widthSettings.value)
    localStorage.setItem('heght', heighthSettings.value)
    localStorage.setItem('minecount', mineCountSettings.value)
    //перезагружаем окно
    window.location.reload();
})