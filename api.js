import { DateElement, renderCommit, token, nameInputElement, commitInputElement, addedCommentElement, InputFormElement } from "./main.js"

// const nameInputElement = document.getElementById('name-input')
// const commitInputElement = document.getElementById('color-input')
// const addedCommentElement = document.getElementById('added-comment')
// const InputFormElement = document.getElementById('add')

const host = "https://webdev-hw-api.vercel.app/api/v2/kulikov-arseniy/comments"
export let comment = []
export const GetRespone = () => {
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

export function postResponse({ text, name, commentEl, formEl }) {
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text, name,
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
        commentEl.display = "none";
        formEl.display = "flex";
        name = ""
        text = ""
    }).catch((error) => {
        console.log("Error mesage =", error.message)

        if (name.length < 3 || text.length < 3) {
            alert("Имя и комментарий должны быть не короче 3-х символов")
        } else { alert("Сервер упал") }
        commentEl.display = "none";
        formEl.display = "flex";
        console.warn(error);
    })
}