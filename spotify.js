var songindex = 0;
var audioelement = new Audio('songs/1.mp3');

var masterplay = document.getElementById('masterplay');
var myprogressbar = document.getElementById('myprogressbar');
var songitem = Array.from(document.getElementsByClassName('songitem'));
var songs = [
    {songname: "FireSong", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songname: "Rolex Theme", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songname: "Oh Super Nova", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songname: "Singam Singam", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songname: "ET theme", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
];

songitem.forEach((element, i) => {
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
});

masterplay.addEventListener('click', () => {
    if (audioelement.paused) {
        audioelement.play();
    } else {
        audioelement.pause();
    }
    songdown.textContent = songs[songindex].songname;
});

setInterval(() => {
    var progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;
}, 500);

myprogressbar.addEventListener('input', () => {
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
});

var previous = document.getElementById('previous');
var songdown = document.getElementById("songdown");
var next = document.getElementById('next');

function loadSong(index) {
    songindex = (index + songs.length) % songs.length;  
    console.log(songindex);
    audioelement.src = songs[songindex].filePath;
    audioelement.currentTime = 0;
    audioelement.play();
    songdown.textContent = songs[songindex].songname;
    next.setAttribute('data', songindex + 1);
    previous.setAttribute('data', songindex - 1);
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        loadSong(parseInt(e.target.id));
    });
});

next.addEventListener('click', () => {
    loadSong(songindex + 1);
});

previous.addEventListener('click', () => {
    loadSong(songindex - 1);
});
