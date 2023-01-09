document.addEventListener("DOMContentLoaded", () => {
    const onceAgainButton = document.getElementById('once_again_btn');
    onceAgainButton.onclick = () => { placeImages() }
    placeImages();
});

const categories = {
    birds: [],
    beasts: []
};
const figures = document.getElementsByClassName('figure');
let selectedFigure;
const rotateAngle = 45;
function placeImages() {
    setDefaultBorderColorToAllFigures();
    for (let i = 0; i < figures.length; i++) {
        let figure = figures[i];
        figure.style.top = window.innerHeight * 0.3 + (Math.random() * 10000) % window.innerHeight * 0.4 + 'px';
        figure.style.left = (window.innerWidth * 0.3) + (Math.random() * 10000) % window.innerWidth * 0.4  + 'px';
        figure.angle = Number.parseInt(Math.random() * 10, 10) % 8 * rotateAngle;
        rotateFigure(figure);

        if (figure.className.includes('bird')) {
            categories.birds.push(figure);
        } else if (figure.className.includes('beast')) {
            categories.beasts.push(figure);
        }
        move(figure);
    }
}

function rotateFigure(figure) {
    figure.children[0].style.transform = `rotate(${figure.angle}deg)`;
}

document.onkeyup = function(e) {
    if (e.key === 'ArrowLeft') {
        selectedFigure.angle -= rotateAngle;
        rotateFigure(selectedFigure);
        check();
    }

    if (e.key === 'ArrowRight') {
        selectedFigure.angle += rotateAngle;
        rotateFigure(selectedFigure);
        check();
    }
}

function setDefaultBorderColorToAllFigures() {
    for (let i = 0; i < figures.length; i++) {
        figures[i].children[0].style.borderColor = 'whitesmoke';
    }
}

function move(figure) {
    figure.ondragstart = () => {
        return false;
    };
    figure.onmousedown = (e) => {
        const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
        const mainHeight = document.getElementsByTagName('main')[0].offsetHeight;
        const mainWidth = document.getElementsByTagName('main')[0].offsetWidth;

        document.onmousemove = (e) => {
            setDefaultBorderColorToAllFigures();
            figure.children[0].style.borderColor = 'red';
            selectedFigure = figure;
            const picture = figure.children[0];
            let left = e.pageX - picture.width / 2;
            figure.style.left = Math.max(mainWidth * 0.1 + picture.width, Math.min(mainWidth * 0.9 - picture.width * 2, left)) + 'px';
            let top = e.pageY - picture.height / 2;
            figure.style.top = Math.min( headerHeight + mainHeight - picture.width * 2, Math.max(headerHeight + picture.height * 2, top)) +  'px';
        };
        figure.onmouseup = () => {
            document.onmousemove = null;
            check();
        };
    };
}

function checkCategory(category) {
    const maximumHeightDiff = category[0].children[0].height * 3;
    const maximumWidthDiff = category[0].children[0].width * 3;
    for (let i = 0; i < category.length; i++) {
        for (let j = 0; j < category.length; j++) {
            if (category[j].angle % 360 !== 0) {
                return false;
            }

            const iTop = Number.parseFloat(category[i].style.top)
            const jTop = Number.parseFloat(category[j].style.top)
            const iLeft = Number.parseFloat(category[i].style.left)
            const jLeft = Number.parseFloat(category[j].style.left)
            if (Math.abs(iTop - jTop) >= maximumHeightDiff || Math.abs(iLeft - jLeft) >= maximumWidthDiff) {
                return false;
            }
        }
    }
    return true;
}

function checkDistanceBetweenCategory(first, second) {
    const maximumHeightDiff = first[0].children[0].height * 4;
    const maximumWidthDiff = first[0].children[0].width * 4;

    for (let i = 0; i < first.length; i++) {
        for (let j = 0; j < second.length; j++) {
            const iTop = Number.parseFloat(first[i].style.top)
            const jTop = Number.parseFloat(second[j].style.top)
            const iLeft = Number.parseFloat(first[i].style.left)
            const jLeft = Number.parseFloat(second[j].style.left)
            if (Math.abs(iTop - jTop) <= maximumHeightDiff && Math.abs(iLeft - jLeft) <= maximumWidthDiff) {
                return false;
            }
        }
    }

    return true;
}

function check() {
    let win;
    const birds = categories.birds;
    const beasts = categories.beasts;
    win = checkCategory(birds) && checkCategory(beasts) && checkDistanceBetweenCategory(beasts, birds);
    if (win) {
        for (let i = 0; i < figures.length; i++) {
            const picture = figures[i].children[0];
            console.log("WIN")
            picture.animate([
                {transform: 'translateX(' + 20 + 'px)'},
                {transform: 'translateX(' + (-20) + 'px)'},
                {transform: 'translateX(' + 20 + 'px)'},
                {transform: 'translateX(' + (-20) + 'px)'},
                {transform: 'translateX(' + 20 + 'px)'},
                {transform: 'translateX(' + (-20) + 'px)'},
                {transform: 'translateX(' + 20 + 'px)'}
            ], 1500);
        }
    }
}