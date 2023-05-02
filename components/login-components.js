//Вся логика связанная с логикой входа
import { loginUser } from '../api.js';

export function renderLoginComponent({ appEl, setToken, GetRespone }) {
    const appHTML = ` 
    <div class="container">
    <div class="add-form">
        Логин
        <input type="text" id="login-input" class="input" />
        <br />
        Пароль
        <input type="password" id="password-input" class="input" />
    </div>
    <br />
    <button class="button" id="login-button">Войти</button>
</div>`

    appEl.innerHTML = appHTML;

    document.getElementById('login-button').addEventListener('click', () => {
        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input')
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
    })
}