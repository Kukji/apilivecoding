import { loginUser, registerUser } from '../api.js';

export function renderLoginComponent({ appEl, setToken, GetRespone, commitHTML }) {
    let isLoginMode = true;

    const renderForm = () => {
        let appHTML = ` 
        <ul class="comments" id="list">
                ${commitHTML}
                </ul>
                <div class="add-form-row">
                        <button class="add-form-button" id="login-button">Чтобы написать комментарий, войдите</button>
                    </div>
                <style>
                    .error {
                        background-color: lightpink;
                    }
                </style>`

        appEl.innerHTML = appHTML;
        //Рендер ленты комментариев - первый рендер

        //Рендер формы входа
        const renderReg = () => {
            appHTML = `
            <div class="container">
        <div class="add-form">
        <h3> Форма ${isLoginMode ?
                    "входа" : "регистрации"}</h3>
        ${isLoginMode ? '' : `Имя
        <input type="text" id="name-input" class="input" />
        <br />`}    
            Логин
            <input type="text" id="login-input" class="input" />
            <br />
            Пароль
            <input type="password" id="password-input" class="input" />
    
        </div>
        <br />
        <button class="add-form-button" id="login-button">${isLoginMode ? 'Войти' : 'Зарегестироваться'}</button>
        <br />
        <button class="add-form-button" id="toggle-button"> Перейти к ${isLoginMode ? 'к регистрации' : 'к входу'} </button>
    
    </div>`
            document.getElementById('login-button').addEventListener('click', () => {
                console.log("Кнопка рендер входа нажата")
                appEl.innerHTML = appHTML

                let onclickForm = document.getElementById("login-button")
                onclickForm.onclick = function () {
                    console.log("Кнопка  входа нажата")

                    if (isLoginMode) {
                        const login = document.getElementById('login-input').value
                        const password = document.getElementById('password-input').value
                        if (!login) {
                            alert('Введите логин')
                        }
                        if (!password) {
                            alert('Введите пароль')
                        }
                        loginUser({
                            login: login,
                            password: password,

                        }).then((user) => {
                            setToken(`Bearer ${user.user.token}`);
                            GetRespone();

                        }).catch((error) => {
                            alert(error.message)
                        })
                    } else {
                        const login = document.getElementById('login-input').value
                        const password = document.getElementById('password-input').value
                        const NameUser = document.getElementById('name-input').value
                        if (!NameUser) {
                            alert('Введите имя')
                        }

                        if (!login) {
                            alert('Введите логин')
                        }
                        if (!password) {
                            alert('Введите пароль')
                        }
                        registerUser({
                            login: login,
                            password: password,
                            name: NameUser,
                        }).then((user) => {
                            setToken(`Bearer ${user.user.token}`);
                            GetRespone();

                        }).catch((error) => {
                            alert(error.message)
                        })
                    }

                    document.getElementById("toggle-button").addEventListener('click', () => {
                        isLoginMode = !isLoginMode;
                        renderReg()
                    })

                }

                document.getElementById("toggle-button").addEventListener('click', () => {
                    isLoginMode = !isLoginMode;
                    renderReg()
                    console.log('Кнопка регистрации нажата');
                })

            })

        }

        renderReg()

    }


    renderForm()
}

