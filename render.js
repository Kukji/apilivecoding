import { likeButton } from "./main.js";
import { comment, nameInputElement, commitInputElement, addedCommentElement, InputFormElement } from "./api.js";



 function renderCommit() {
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
    const listElement = document.getElementById('list')
    const nameInputElement = document.getElementById('name-input')
    const commitInputElement = document.getElementById('color-input')
    const addedCommentElement = document.getElementById('added-comment')
    const InputFormElement = document.getElementById('add')
    likeButton();
    // initEventList()
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
    initAnswer()


};