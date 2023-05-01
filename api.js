import { DateElement } from "./main.js"
import { renderCommit } from "./render.js"

const nameInputElement = document.getElementById('name-input')
const commitInputElement = document.getElementById('color-input')
const addedCommentElement = document.getElementById('added-comment')
const InputFormElement = document.getElementById('add')

export let comment = []
const host = "https://webdev-hw-api.vercel.app/api/v2/kulikov-arseniy/comments"
let password = prompt("Ввести пароль(123456)");
export const GetRespone = () => {
    const fetchPromis = fetch(host, {
        method: "GET"
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


export function postResponse() {
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: commitInputElement.value,
            name: nameInputElement.value,
            forceError: false,
            headers: {
                Authorization: password,
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
