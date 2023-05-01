import { likeButton } from "./main.js";
import { comment } from "./api.js";
const listElement = document.getElementById('list')


export function renderCommit() {
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
    listElement.innerHTML = commitHTML;
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