import { renderLoginComponent } from "./components/login-components.js"
import { GetRespone, postResponse, comment } from "./api.js"
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

export let token = "Bearer asb4c4boc86gasb4c4boc86g37k3bk3cg3c03ck3k37w3cc3bo3b8";

token = null
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
        renderLoginComponent({
            appEl, setToken: (NewToken) => {
                token = NewToken
            },
            GetRespone, commitHTML
        })

        return
    }

    const appHTML = `
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
    const nameInputElement = document.getElementById('name-input')
    const commitInputElement = document.getElementById('color-input')
    const addedCommentElement = document.getElementById('added-comment')
    const InputFormElement = document.getElementById('add')
    likeButton();
    //initEventList()
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
        postResponse({
            text: commitInputElement.value,
            nameEl: nameInputElement.value,
            commentEl: addedCommentElement.style,
            formEl: InputFormElement.style
        })
        console.log("It works!");
    })
    initAnswer()


};

GetRespone()
renderCommit()
