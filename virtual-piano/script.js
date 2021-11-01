//Поиск элементов
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

//Проигрывание нот
function playSound(e) {
    const audio = document.querySelector(`audio[data-note="${e.dataset.note}"]`);
    if (!audio) return;
    e.classList.add('piano-key-active');
    audio.currentTime = 0;
    audio.play();
}

//События мыши
let mouseState = false;

function activeMouse(e) {
    if (!mouseState) return;
    const note = e.target;
    playSound(note);
}

const removeTransition = (e) => {
    e.target.classList.remove('piano-key-active');
};

pianoKeys.forEach((key) => {
    key.addEventListener('mousedown', (e) => {
        mouseState = true;
        activeMouse(e);
    });

    key.addEventListener('mouseover', activeMouse);
    key.addEventListener('mouseleave', removeTransition);
    key.addEventListener('mouseup', removeTransition);
    key.addEventListener('contextmenu', (e) => e.preventDefault());
});

window.addEventListener('mouseup', () => (mouseState = false));

//События клавиатуры
let keyState = {};

function activeKey(e) {
    const key = document.querySelector(`.piano-key[data-letter="${e.code.slice(-1)}"]`);
    if (key && !keyState[e.code]) {
        keyState[e.code] = true;
        console.log(keyState);
        playSound(key);
    }
}

window.addEventListener('keyup', (e) => {
    const key = document.querySelector(`.piano-key[data-letter="${e.code.slice(-1)}"]`);

    if (key) {
        key.classList.remove('piano-key-active');
        keyState[e.code] = false;
    }
});

window.addEventListener('keydown', activeKey);

//Переключение Notes/Letters
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

btnNotes.addEventListener('click', () => {
    btnLetters.classList.remove('btn-active');
    btnNotes.classList.add('btn-active');
    pianoKeys.forEach(key => key.classList.remove('letter'));
});
btnLetters.addEventListener('click', () => {
    btnNotes.classList.remove('btn-active');
    btnLetters.classList.add('btn-active');
    pianoKeys.forEach(key => key.classList.add('letter'));
});

//FullScreen
const fullscreenButton = document.querySelector('.fullscreen');

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

fullscreenButton.addEventListener('click', toggleFullScreen);