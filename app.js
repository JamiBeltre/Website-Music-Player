const songList = [
{
    title: "Hip Hop Ambiente Cinematico",
    file: "./Assest/Audio/ambient-cinematic-hip-hop-22168.mp3",
    cover: "./Assest/Img/3.png"
},

{
    title: "Slow Trap",
    file: "./Assest/Audio/slow-trap-18565.mp3",
    cover: "./Assest/Img/2.png"
},

{
    title: "Spirit Blossom",
    file: "./Assest/Audio/spirit-blossom-15285.mp3",
    cover: "./Assest/Img/1.png"
}
]

//canción actual
let actualSong = null

//capturar elementos del DOM para js 

const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const nombre = document.getElementById("nombre")
const play = document.getElementById("play")
const next = document.getElementById("sig")
const prev = document.getElementById("prev")
const progress = document.getElementById("progress")

//Escuchat Audio 
audio.addEventListener("timeupdate", updateProgress)

//click
play.addEventListener("click", () => {
if (audio.paused){
    playSong()
}else{
    pauseSong()
}

})

next.addEventListener("click", () => nextSong())

prev.addEventListener("click", () => prevSong())

//Cargar canciones y mostrar listado

function loadSongs(){
songList.forEach((song, index) => {
    const li = document.createElement("li")

    const link = document.createElement("a")

    link.textContent = song.title
    link.href = "#"

    link.addEventListener("click", () => loadSong(index))

    li.appendChild(link)
    songs.appendChild(li)
})

}
//Cargar Canción Seleccionada
function loadSong(songIndex){
    if (songIndex !== actualSong) {
    changeActiveClass (actualSong, songIndex)
    actualSong = songIndex
    audio.src = "./" + songList[songIndex].file
    audio.play() 
    changeCover(songIndex)
    changeSongTitle(songIndex)
    updateControls()
    playSong()
    }
}

//Actualizar barra de progreso de la canción
function updateProgress(event) {
const {duration, currentTime} = event.srcElement
console.log (duration, currentTime)
const percent = (currentTime / duration) * 100
progress.style.width = percent + "%"


}

//actualizar controles
function updateControls(){
    if (audio.paused){
    play.classList.remove("fa-pause")
    play.classList.add("fa-play")
    }else{

   play.classList.add("fa-pause")
    play.classList.remove("fa-play")
}
}

//Reproducir Cancin 
function playSong(){
audio.play()
updateControls()
}

//Pausar Canción
function pauseSong(){
audio.pause()
updateControls()

}
//cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")

    if(lastIndex != null){
    links[lastIndex].classList.remove("active")

    }

    links[newIndex].classList.add("active")

}

//cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = "./" + songList[songIndex].cover


}
//Cambiar el titulo de la canción
function changeSongTitle(songIndex) {
    nombre.innerText = songList[songIndex].title
}

//Anterior Canción 
function prevSong(){
    if(actualSong > 0){
        loadSong(actualSong - 1) 
    }else{
    loadSong(songList.length - 1)
    }
}


//Siguiente Canción 
function nextSong(){
    if(actualSong < songList.length -1){
        loadSong(actualSong+1) 
    }else{
    loadSong(0)
}
}



//Go
loadSongs()
