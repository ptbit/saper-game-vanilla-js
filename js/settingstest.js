// const btnSlot = document.querySelector("#buttons")
// site.innerHTML = ''
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

settupBTN.addEventListener("click",(e) => {
    e.preventDefault()
    settings.classList.add('open')
})

closeSettings.addEventListener("click",() => {
    settings.classList.remove('open')
})

settingsContainer.addEventListener("click",(e) => {
    if (e.target.classList.contains('settings_container'))
    {
        settings.classList.remove('open')
    }
})

saveSettings.addEventListener("click",(e) => {
    e.preventDefault()
    settings.classList.remove('open')
    window.location.reload();
})