//import { likeButton, DateElement, nameInputElement, commitInputElement } from "./main.js";
import { comment, GetRespone, postResponse } from "./api.js";
export let token = null


export function renderCommit() {
    const appEl = document.getElementById("app")
    const commitHTML = comment
        .map((comment, index) => {
            console.log(comment)
            return `<div>
    <p class="added-comment"></p></div>
        <li class = "comment data-comment="${comment.commit}"">
    <div class = "comment-header">
        <div> ${comment.name} </div>
        <div> ${comment.date} </div>
    </div>
    <div class = "comment-body">
        <div class = "comment-text">
            ${comment.text}
        </div>
    </div>
    <div class ="comment-footer"
        <div class = "likes"
            <span class = "likes-counter" data-index = '${index}'> ${comment.likes}</span>
            <button  data-index = '${index}' class = "like-button ${comment.isLiked}"></button>
        </div>
    </div>
    </li>`
        }).join("");


    if (!token) {
        const appHTML = `
        <ul class="comments" id="list">
        ${commitHTML}
        </ul>
        <br>
        <br>
        <br>
            <button class="add-form-button" id="login-button">Войти, чтобы написать комментарий</button>
        </div>
        </div>`

        appEl.innerHTML = appHTML;

        document.getElementById('login-button').addEventListener('click', () => {
            token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
            GetRespone()
        })

        return
    }



    const appHTML = `    <!-- <div class="preloader">
                    <div class="preloader__row">
                        <div class="preloader__item">Сайт загружается</div>
                        <div class="preloader__item"></div>
                    </div>
                </div> -->
                <div class="container">
                    <div class="add-form">
                        Логин
                        <input type="text" id="login-input" class="input" />
                        <br />
                        Пароль
                        <input type="text" id="login-input" class="input" />
                    </div>
                    <br />
                    <button class="button" id="login-button">Войти</button>
                </div>
                <ul class="comments" id="list">
                ${commitHTML}
                </ul>
                <div>
                    <p id="added-comment"></p>
                </div>
                <div id="add" class="add-form">
                    <input type="text" class="add-form-name" id="name-input" placeholder="Введите ваше имя" />
                    <textarea type="textarea" class="add-form-text" id="color-input" placeholder="Введите ваш коментарий"
                        rows="4"></textarea>
                    <div class="add-form-row">
                        <button class="add-form-button" id="add-button">Написать</button>
                    </div>
                </div>
                </div>
                <style>
                    .error {
                        background-color: lightpink;
                    }
                </style>`

    appEl.innerHTML = appHTML;
    const buttonElement = document.getElementById('add-button')
    // const nameInputElement = document.getElementById('name-input')
    // const commitInputElement = document.getElementById('color-input')
    const addedCommentElement = document.getElementById('added-comment')
    const InputFormElement = document.getElementById('add')
    likeButton();
    const initAnswer = () => {
        const liElements = document.querySelectorAll(".comment")

        for (const answerElement of liElements) {
            answerElement.addEventListener("click", () => {
                let author = answerElement.querySelector(".comment-header")
                let text = answerElement.querySelector(".comment-body")
                commitInputElement.value = `${author.textContent} \n ${text.textContent}`

            })
        }

    }

    buttonElement.addEventListener('click', () => {
        addedCommentElement.style.display = "flex";
        addedCommentElement.textContent = "Комментарий добавляется"
        InputFormElement.style.display = "none";



        GetRespone()
        postResponse()
        console.log("It works!");
    })
    initAnswer()


};