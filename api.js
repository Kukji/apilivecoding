import { DateElement, renderCommit, token } from "./main.js"

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

export function postResponse({ text, nameEl, commentEl, formEl }) {
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text, nameEl,
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
        nameEl = ""
        text = ""
    }).catch((error) => {
        console.log("Error mesage =", error.message)

        if (nameEl.length < 3 || text.length < 3) {
            alert("Имя и комментарий должны быть не короче 3-х символов")
        } else { alert("Сервер упал") }
        commentEl.display = "none";
        formEl.display = "flex";
        console.warn(error);
    })
}

export function loginUser({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный логин или пароль')
        }
        return response.json();
    });
}

export function registerUser({ login, password, name }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Такой пользователь уже существует");
        }
        return response.json();
    });
}