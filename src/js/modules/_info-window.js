import {
    ACHIEVEMENT,
    INFO_WINDOW,
    INFO_WINDOW_BTN,
    INFO_WINDOW_HEADER,
    INFO_WINDOW_TABS,
} from "../constants/_constants.js";
import { currentGame, pointsScore } from "../main.js";

// -------------------------------------------- перемикання вкладок
function showElement(elemClass) {
    const elem = document.querySelector(`.${elemClass}`);

    const PARENT = document.querySelector(".info-window__inner");

    for (const elem of PARENT.children) {
        elem.classList.remove("active");
    }

    elem.classList.add("active");
}

function getClassElementToBeDrawn(e) {
    const elemClass = e.currentTarget.className
        .split(" ")
        .find((elem) => elem.startsWith("tab-"))
        .slice(4);

    showElement(elemClass);
}

function activateTab(e) {
    INFO_WINDOW_TABS.forEach((element) => {
        element.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    getClassElementToBeDrawn(e);
}

INFO_WINDOW_BTN.addEventListener("click", function () {
    INFO_WINDOW.classList.toggle("active");
});

INFO_WINDOW_TABS.forEach((element) => {
    element.addEventListener("click", activateTab);
});

// -------------------------------------------- вивід повідомлень

function generateTags() {
    const div = document.createElement("div");
    const p = document.createElement("p");
    return [div, p];
}

function createMessageTouchdown() {
    const exp = pointsScore.touchdown;
    const [div, p] = generateTags();

    p.innerHTML = `Отримано <span>${exp}</span> досвіду`;
    div.classList.add("achievement__experience");

    div.appendChild(p);
    addMessageToAchievement(div);
}
function createMessageLevelUp() {
    const level = currentGame.level;
    const [div, p] = generateTags();

    p.innerHTML = `Вітаємо з <span>${level}</span> рівнем!`;
    div.classList.add("achievement__lvl-up");

    div.appendChild(p);
    addMessageToAchievement(div);
}
function createMessageDestruction(exp, lines = 1) {
    const [div, p] = generateTags();

    p.innerHTML = `Отримано <span>${exp}</span> досвіду за <span>${lines}</span> ліній`;
    div.classList.add("achievement__experience");

    div.appendChild(p);
    addMessageToAchievement(div);
}

function addMessageToAchievement(message) {
    ACHIEVEMENT.appendChild(message);
}

document.addEventListener("load", moveInfoWindow);

function moveInfoWindow() {}

let offsetX,
    offsetY = null;
let isDragging = false;

INFO_WINDOW_HEADER.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - INFO_WINDOW.getBoundingClientRect().left;
    offsetY = e.clientY - INFO_WINDOW.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        INFO_WINDOW.style.left = `${e.clientX - offsetX}px`;
        INFO_WINDOW.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

export { createMessageTouchdown, createMessageLevelUp, createMessageDestruction };
