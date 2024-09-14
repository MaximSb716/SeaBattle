'use strict'
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=0e8a6538b291d291d144eeb9f1a49801', true);
xhr.send();
if (localStorage.getItem("enterSeabattle") == 0 && (document.title == "Rules" || document.title == "Fields")) {
    window.location.href = 'index.html';
}
if (localStorage.getItem('enterSeabattle') == 1 && document.title == "Registration") {
    window.location.href = 'index3.html';
}
if (localStorage.getItem('enterGame') == 1 && document.title != "Gamefield") {
    window.location.href = 'index5.html';
}

if (localStorage.getItem('enterSeabattle') == 1 && (document.title != "Registration" || document.title != "Enter")) {
    let templateCode = `
        <ul>
            <a href="index3.html">Поля</a>
            <a href="index4.html">Правила</a>
            <button class="exitButton" id="exitButton">Выйти</button>
        </ul>
    `
    let template = Handlebars.compile(templateCode);
    let head = document.querySelector('#header');
    head.innerHTML = '';
    head.innerHTML = template()
    exitButton.addEventListener('click', function () {
        localStorage.setItem('enterSeabattle', 0)
        window.location.href = 'index2.html';
    })
}

if (document.title == "Registration") {
    registrationButton.addEventListener('click', function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let usersArr = JSON.parse(xhr.responseText)
            let user = {
                nickname: '',
                login: '',
                password: '',
                status: 'user'
            }
            if (nickname.value == "" || login.value == "" || password.value == "") {
                alert("Все поля должны быть заполнены")
            } else {
                let flag1 = true
                for (let i in usersArr) {
                    if (usersArr[i].login == login.value) {
                        flag1 = false
                        alert("Данный логин уже занят")
                        break
                    }
                }
                if (flag1 == true) {
                    user.nickname = nickname.value
                    user.login = login.value
                    user.password = password.value
                    nickname.value = ""
                    login.value = ""
                    password.value = ""
                    usersArr.push(user)
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=0e8a6538b291d291d144eeb9f1a49801', true)
                    xhrSender.setRequestHeader("Content-type", "application/json");
                    xhrSender.send(JSON.stringify(usersArr));
                    xhrSender.addEventListener('readystatechange', function () {
                        if (xhrSender.readyState == 4) {
                            if (xhrSender.status == 200) {
                                alert('Пользователь успешно зарегестрирован!');
                            } else {
                                alert('Ошибка отправки. Попробуйте еще раз.');
                            }
                        }
                    })
                }
            }
        }
    })
}
if (document.title == "Enter") {
    enterButton.addEventListener('click', function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let usersArr = JSON.parse(xhr.responseText)
            let flag1 = true
            for (let i in usersArr) {
                if (usersArr[i].login == login.value && usersArr[i].password != password.value) {
                    flag1 = false
                    alert("Неверный пароль")
                    break
                }
                if (usersArr[i].login == login.value && usersArr[i].password == password.value) {
                    flag1 = false
                    localStorage.setItem('status', usersArr[i].status)
                    localStorage.setItem('enterSeabattle', 1)
                    alert("Вы успешно вошли в аккаунт")
                    window.location.href = 'index3.html';
                    break
                }
            }
            if (flag1 == true) {
                alert("Такого аккаунта не существует")
            }
        }
    })
}
let fields = new XMLHttpRequest();
fields.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=0b2fe229595998e2de7c3c69440e5647', true);
fields.send();
if (document.title == "Fields") {
    fields.addEventListener('readystatechange', function () {
        if (fields.readyState == 4 && fields.status == 200) {
            let fieldsArr = JSON.parse(fields.responseText)
            let templateCode = `
                <div onclick="window.location.href='index5.html';" style="cursor: pointer;" class="fieldListElement">Название поля: {{fieldName}}</div>
            `
            let template = Handlebars.compile(templateCode);
            let fieldul = document.querySelector('#fieldsUl');
            fieldul.innerHTML = '';
            for (let field of fieldsArr) {
                fieldul.innerHTML += template(field)
            }
        }

    })
    CreateField.addEventListener('click', function () {
        if (localStorage.getItem('status') == 'user') {
            alert("У вас недостаточно прав")
        } else {
            window.location.href="index6.html"
        }
    })
}
if (document.title == "Gamefield") {
    localStorage.setItem('enterGame', 1)
    let templateCode = `
        <button class="exitGameButton" id="exitGameButton">Выйти</button>
    `
    let template = Handlebars.compile(templateCode);
    let head = document.querySelector('#header');
    head.innerHTML = '';
    head.innerHTML = template()
    exitGameButton.addEventListener('click', function () {
        localStorage.setItem('enterGame', 0)
        window.location.href = 'index3.html';
    })
}