//Вся логика связанная с логикой входа
export function renderLoginComponent({ appEl, setToken, GetRespone }) {
    const appHTML = ` 
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
</div>`

    appEl.innerHTML = appHTML;

    document.getElementById('login-button').addEventListener('click', () => {
        setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
        GetRespone();

    })
}