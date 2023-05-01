// import { GetRespone, postResponse, comment, nameInputElement, commitInputElement } from "./api.js"
// import { renderCommit } from "./render.js"
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}





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

let comment = []
const host = "https://webdev-hw-api.vercel.app/api/v2/kulikov-arseniy/comments"
let token = null
const GetRespone = () => {
    const fetchPromis = fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    fetchPromis.then((response) => {
        const jsonPromise = response.json();

        jsonPromise.then((responseData) => {
            const AppComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: DateElement(),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            comment = AppComments;
            renderCommit();
        })
    });
}

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


    if (!token) {
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
        function postResponse() {
            fetch(host, {
                method: "POST",
                body: JSON.stringify({
                    text: commitInputElement.value,
                    name: nameInputElement.value,
                    forceError: false,
                    headers: {
                        Authorization: token,
                    },
                })
            }).then((response) => {
                if (response.status === 400) {
                    throw new Error('Поля должны быть не короче 3-х символов')
                } else if (response.status === 500) {
                    throw new Error('Попробуйте ещё раз')
                }
            }).then(() => {
                return GetRespone();
            }).then(() => {
                addedCommentElement.style.display = "none";
                InputFormElement.style.display = "flex";
                nameInputElement.value = ""
                commitInputElement.value = ""
            }).catch((error) => {
                console.log("Error mesage =", error.message)

                if (nameInputElement.value.length < 3 || commitInputElement.value.length < 3) {
                    alert("Имя и комментарий должны быть не короче 3-х символов")
                } else { alert("Сервер упал") }
                addedCommentElement.style.display = "none";
                InputFormElement.style.display = "flex";
                console.warn(error);
            })
        }
        postResponse()
        console.log("It works!");
    })
    initAnswer()


};

GetRespone()
renderCommit()
// nameInputElement.style.backgroundColor = ""
// commitInputElement.style.backgroundColor = "";


// buttonElement.addEventListener('click', () => {
//     addedCommentElement.style.display = "flex";
//     addedCommentElement.textContent = "Комментарий добавляется"
//     InputFormElement.style.display = "none";

//     nameInputElement.classList.remove('error')
//     if (nameInputElement.value === '') {
//         nameInputElement.classList.add('error')
//         return
//     }
//     if (commitInputElement.value === '') {
//         commitInputElement.classList.add('error')
//         return
//     }


//     comment.push({
//         name: nameInputElement.value.replaceAll("&", "&amp;")
//             .replaceAll("<", "&lt;")
//             .replaceAll(">", "&gt;")
//             .replaceAll('"', "&quot;"),
//         data: DateElement(),
//         commit: commitInputElement.value.replaceAll("&", "&amp;")
//             .replaceAll("<", "&lt;")
//             .replaceAll(">", "&gt;")
//             .replaceAll('"', "&quot;"),
//         likeCounter: 0,
//         likeButton: "",

//     })


//     GetRespone()
//     function postResponse() {
//         fetch(host, {
//             method: "POST",
//             body: JSON.stringify({
//                 text: commitInputElement.value,
//                 name: nameInputElement.value,
//                 forceError: false,
//                 headers: {
//                     Authorization: token,
//                 },
//             })
//         }).then((response) => {
//             if (response.status === 400) {
//                 throw new Error('Поля должны быть не короче 3-х символов')
//             } else if (response.status === 500) {
//                 throw new Error('Попробуйте ещё раз')
//             }
//         }).then(() => {
//             return GetRespone();
//         }).then(() => {
//             addedCommentElement.style.display = "none";
//             InputFormElement.style.display = "flex";
//             nameInputElement.value = ""
//             commitInputElement.value = ""
//         }).catch((error) => {
//             console.log("Error mesage =", error.message)

//             if (nameInputElement.value.length < 3 || commitInputElement.value.length < 3) {
//                 alert("Имя и комментарий должны быть не короче 3-х символов")
//             } else { alert("Сервер упал") }
//             addedCommentElement.style.display = "none";
//             InputFormElement.style.display = "flex";
//             console.warn(error);
//         })
//     }
//     postResponse()
//     console.log("It works!");
// })