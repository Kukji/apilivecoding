//Вся логика связанная с логикой входа
import { loginUser } from '../api.js';

export function renderLoginComponent({ appEl, setToken, GetRespone }) {
    let isLoginMode = false;

    const renderForm = () => {
        const appHTML = ` 
        <div class="container">
        <div class="add-form">
        <h3> Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
        ${isLoginMode ? '' : `Имя
        <input type="password" id="name-input" class="input" />
        <br />`}    
            Логин
            <input type="text" id="login-input" class="input" />
            <br />
            Пароль
            <input type="password" id="password-input" class="input" />
    
        </div>
        <br />
        <button class="button" id="login-button">${isLoginMode ? 'Войти' : 'Зарегестироваться'}</button>
        <br />
        <br />
        <br />
        <button class="button" id="toggle-button">Перейти к ${isLoginMode ? 'к регистрации' : 'к входу'} </button>
    
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
        document.getElementById('toggle-button').addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            renderForm()
        })
    }
    renderForm()
}
