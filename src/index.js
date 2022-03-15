/* Colour API: https://www.thecolorapi.com/docs#schemes */
let colorsArray = ["#847B7B", "#9E9494", "#B7AEAE", "#CFC9C9", "#E7E4E4"]
let colorHex = document.getElementById('color-select').value.substring(1)
let colorScheme =  document.getElementById('color-scheme').value

function renderColors () {
    let colorsHtml = ""
    let titlesHtml = ""
    for (let i=0; i<colorsArray.length; i++){
        colorsHtml +=  `<div class="color-box c${i}-box" style="background-color: ${colorsArray[i]}"><a href="${colorsArray[i]}" onclick="copyURI(event)"/></div>`
        titlesHtml += `<a class="color-box-title c${i}-title" href="${colorsArray[i]}" onclick="copyURI(event)"> ${colorsArray[i]} </a>`
    }
    document.getElementById('color-bar').innerHTML = colorsHtml
    document.getElementById('color-titles').innerHTML = titlesHtml
}

function callAPI(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${colorScheme}&count=5`, {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<5; i++){
            colorsArray[i]=data.colors[i].hex.value
        }
        renderColors()
    }
    )
}

function copyURI(event){
    event.preventDefault()
    navigator.clipboard.writeText(event.target.getAttribute('href'))


}

const selectColor = document.getElementById("color-select")
selectColor.addEventListener('change', function(){
    colorHex = document.getElementById('color-select').value
    colorHex = colorHex.substring(1)
})

const selectScheme = document.getElementById("color-scheme")
selectScheme.addEventListener('change', function(){
    colorScheme = document.getElementById('color-scheme').value
})

let button = document.getElementById("getColorButton")

button.addEventListener("click", function() {
    callAPI()
})

renderColors()