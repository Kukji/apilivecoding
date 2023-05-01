import { GetRespone, postResponse, comment } from "./api.js"
import { renderCommit } from "./render.js"
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}



const buttonElement = document.getElementById('add-button')
const nameInputElement = document.getElementById('name-input')
const commitInputElement = document.getElementById('color-input')
const addedCommentElement = document.getElementById('added-comment')
const InputFormElement = document.getElementById('add')

export function DateElement() {
    let date = new Date()
    let monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    let Minute = String(date.getMinutes()).length < 2 ? '0' + date.getMinutes() : date.getMinutes();
    let Hours = String(date.getHours()).length < 2 ? '0' + date.getHours() : date.getHours();
    let Day = String(date.getDate()).length < 2 ? '0' + date.getDate() : date.getDate();
    let Month = monthArray[+date.getMonth()]
    let Year = String(date.getFullYear()).slice(2);
    let str = Day + '.' + Month + '.' + Year + ' ' + Hours + ':' + Minute;
    return str
}

export function likeButton() {
    const likeButtonElements = document.querySelectorAll(".like-button")

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            if (likeButtonElement.classList.contains("false")) {
                comment[likeButtonElement.dataset.index].isLiked = "true";
                comment[likeButtonElement.dataset.index].likes += 1;
            } else {
                comment[likeButtonElement.dataset.index].isLiked = "";
                comment[likeButtonElement.dataset.index].likes -= 1
            }
            renderCommit();
        });
    }
}

GetRespone()

renderCommit()

GetRespone()
nameInputElement.style.backgroundColor = ""
commitInputElement.style.backgroundColor = "";


buttonElement.addEventListener('click', () => {
    addedCommentElement.style.display = "flex";
    addedCommentElement.textContent = "Комментарий добавляется"
    InputFormElement.style.display = "none";

    nameInputElement.classList.remove('error')
    if (nameInputElement.value === '') {
        nameInputElement.classList.add('error')
        return
    }
    if (commitInputElement.value === '') {
        commitInputElement.classList.add('error')
        return
    }


    comment.push({
        name: nameInputElement.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
        data: DateElement(),
        commit: commitInputElement.value.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
        likeCounter: 0,
        likeButton: "",

    })


    GetRespone()
    postResponse()
    console.log("It works!");
})