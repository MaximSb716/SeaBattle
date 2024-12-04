'use strict'
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8d786cfe843d24a0d74da2bd08b1acf9', true);
xhr.send();

function enter() {
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8d786cfe843d24a0d74da2bd08b1acf9', true);
    xhr2.send();
    xhr2.addEventListener('readystatechange', function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            let usersArr = JSON.parse(xhr2.responseText)
            let flag1 = true
            for (let i in usersArr) {
                if (usersArr[i].login == login.value && usersArr[i].password != password.value) {
                    flag1 = false
                    alert("Неверный пароль")
                    break
                }
                if (usersArr[i].login == login.value && usersArr[i].password == password.value) {
                    if (usersArr[i].entered == 0) {
                        usersArr[i].entered = 1
                        let xhrSender2 = new XMLHttpRequest();
                        xhrSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8d786cfe843d24a0d74da2bd08b1acf9', true)
                        xhrSender2.setRequestHeader("Content-type", "application/json");
                        xhrSender2.send(JSON.stringify(usersArr));
                        xhrSender2.addEventListener('readystatechange', function () {
                            if (xhrSender2.readyState == 4) {
                                if (xhrSender2.status == 200) {
                                    flag1 = false
                                    localStorage.setItem('status', usersArr[i].status)
                                    localStorage.setItem('enterSeabattle', 1)
                                    localStorage.setItem('login', login.value)
                                    localStorage.setItem('nickname', usersArr[i].nickname)
                                    alert("Вы успешно вошли в аккаунт")
                                    window.location.href = 'index3.html';
                                }
                            }
                        })
                        break
                    }
                    if (usersArr[i].entered == 1) {
                        flag1 = false
                        alert("В аккаунт уже зашли")
                    }
                }
            }
            setTimeout(function () {
                if (flag1 == true) {
                    alert("Такого аккаунта не существует")
                }
            }, 500)
        }
    })
}

function register() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let usersArr = JSON.parse(xhr.responseText)
        let user = {
            nickname: '',
            login: '',
            password: '',
            status: 'user',
            entered: '0'
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
                if (passwordcheck.value == password.value) {
                    user.nickname = nickname.value
                    user.login = login.value
                    user.password = password.value
                    nickname.value = ""
                    login.value = ""
                    password.value = ""
                    passwordcheck.value = ""
                    usersArr.push(user)
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8d786cfe843d24a0d74da2bd08b1acf9', true)
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
                } else {
                    alert("Пароли не совпадают")
                }
            }
        }
    }
}

if (localStorage.getItem("enterSeabattle") == 0 && (document.title == "Правила" || document.title == "Поля")) {
    window.location.href = 'index.html';
}
if (localStorage.getItem('enterSeabattle') == 1 && document.title == "Регистрация") {
    window.location.href = 'index3.html';
}
if (localStorage.getItem('enterGame') == 1 && document.title != "Бой") {
    localStorage.setItem('correct', 0)
    localStorage.setItem('gameStarted', 0)
    localStorage.setItem('gameSended', 0)
    localStorage.setItem('startClicked', 0)
    window.location.href = 'index7.html';
}

if (localStorage.getItem('enterSeabattle') == 1 && (document.title == "Поля" || document.title == "Правила")) {
    let templateCode = `
        <ul>
            <a href="index3.html">Поля</a>
            <a href="index4.html">Правила</a>
            <button class="exitButton" id="exitButton">Выйти</button>
            <div class="verticalbox">
                <div class="username" id="username">${localStorage.getItem('nickname')}</div>
            </div>
        </ul>
    `
    let template = Handlebars.compile(templateCode);
    let head = document.querySelector('#header');
    head.innerHTML = '';
    head.innerHTML = template()
    exitButton.addEventListener('click', function () {
        let xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8d786cfe843d24a0d74da2bd08b1acf9', true);
        xhr2.send();
        xhr2.addEventListener('readystatechange', function () {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                let usersArr = JSON.parse(xhr2.responseText)
                let flag1 = true
                for (let i in usersArr) {
                    if (usersArr[i].login == localStorage.getItem('login')) {
                        usersArr[i].entered = 0
                        let xhrSender2 = new XMLHttpRequest();
                        xhrSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8d786cfe843d24a0d74da2bd08b1acf9', true)
                        xhrSender2.setRequestHeader("Content-type", "application/json");
                        xhrSender2.send(JSON.stringify(usersArr));
                        xhrSender2.addEventListener('readystatechange', function () {
                            if (xhrSender2.readyState == 4) {
                                if (xhrSender2.status == 200) {
                                    localStorage.clear()
                                    localStorage.setItem('enterSeabattle', 0)
                                    window.location.href = 'index2.html';
                                }
                            }
                        })
                    }
                }
            }
        })
    })
}

if (document.title == "Регистрация") {
    registrationButton.addEventListener('click', function () {
        register()
    })
    document.addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
            register()
        }
    })
}

if (document.title == "Вход") {
    enterButton.addEventListener('click', function () {
        enter()
    })
    document.addEventListener('keydown', function (e) {
        if (e.key == "Enter") {
            enter()
        }
    })
}

let fields2 = new XMLHttpRequest();
fields2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
fields2.send();

if (document.title == "Поля") {
    document.addEventListener('click', function (e) {
        localStorage.setItem('fieldName', e.target.id)
    })
    fields2.addEventListener('readystatechange', function () {
        if (fields2.readyState == 4 && fields2.status == 200) {
            let flag = true
            let fieldsArr = JSON.parse(fields2.responseText)
            let templateCode = `
                <div onclick="window.location.href='index5.html';" style="cursor: pointer;" class="fieldListElement" id={{creator}}{{count}}>Название поля: {{fieldName}}</div>
            `
            let templateCode2 = `<button id="deleteField" class="CreateField">Удалить поле</button>
            <button id="clear" class="CreateField">Localstorageclear()</button>
            `
            let template = Handlebars.compile(templateCode);
            let template2 = Handlebars.compile(templateCode2);
            let fieldul2 = document.querySelector('#buttons');
            let fieldul = document.querySelector('#fieldsUl');
            fieldul.innerHTML = '';
            if (localStorage.getItem('status') == 'admin') {
                fieldul2.innerHTML += template2()
                clear.addEventListener('click', function () {
                    let fieldsDelete = new XMLHttpRequest();
                    let zerofield = []
                    fieldsDelete.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                    fieldsDelete.setRequestHeader("Content-type", "application/json");
                    fieldsDelete.send(JSON.stringify(zerofield));
                })
                deleteField.addEventListener('click', function () {
                    flag = false
                    let templateCode3 = `
                        <div style="cursor: pointer;" class="fieldListElement" id={{creator}}{{count}}>Название поля: {{fieldName}}</div>
                    `
                    let templateCode4 = `<button id="cancelDeleteField" class="CreateField">Отмена</button>`
                    let template3 = Handlebars.compile(templateCode3);
                    let template4 = Handlebars.compile(templateCode4);
                    let fieldul4 = document.querySelector('#buttons');
                    let fieldul3 = document.querySelector('#fieldsUl');
                    fieldul.innerHTML = '';
                    fieldul2.innerHTML += template4()
                    for (let fiel of fieldsArr) {
                        fieldul3.innerHTML += template3(fiel)
                    }
                    fieldul3.addEventListener('click', function (e) {
                        for (let i = 0; i < fieldsArr.length; i++) {
                            if (e.target.id == fieldsArr[i].creator + fieldsArr[i].count) {
                                fieldsArr.splice(i, 1)
                                let fieldsSender = new XMLHttpRequest();
                                fieldsSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                                fieldsSender.setRequestHeader("Content-type", "application/json");
                                fieldsSender.send(JSON.stringify(fieldsArr));
                                fieldsSender.addEventListener('readystatechange', function () {
                                    if (fieldsSender.readyState == 4) {
                                        if (fieldsSender.status == 200) {
                                            alert('Поле успешно удалено!');
                                            fieldul.innerHTML = '';
                                            for (let fiel of fieldsArr) {
                                                fieldul3.innerHTML += template3(fiel)
                                            }
                                        } else {
                                            alert('Ошибка удаления. Попробуйте еще раз.');
                                        }
                                    }
                                })
                            }
                        }
                    })
                    cancelDeleteField.addEventListener('click', function () {
                        flag = true
                        let templateCode = `
                            <div onclick="window.location.href='index5.html';" style="cursor: pointer;" class="fieldListElement" id={{creator}}{{count}}>Название поля: {{fieldName}}</div>
                        `
                        let templateCode2 = `<button id="deleteField" class="CreateField">Удалить поле</button>
                        <button id="clear" class="CreateField">Localstorageclear()</button>
                        `
                        let template = Handlebars.compile(templateCode);
                        let template2 = Handlebars.compile(templateCode2);
                        let fieldul2 = document.querySelector('#buttons');
                        let fieldul = document.querySelector('#fieldsUl');
                        fieldul.innerHTML = '';
                        fieldul2.innerHTML = '';
                        fieldul2.innerHTML += template2()
                        for (let field of fieldsArr) {
                            fieldul.innerHTML += template(field)
                        }
                    })
                })
            }
            if (flag == true) {
                for (let field of fieldsArr) {
                    fieldul.innerHTML += template(field)
                }
            }
        }
    })
    CreateField.addEventListener('click', function () {
        window.location.href = "index6.html"
    })
}

if (document.title == "Создание") {
    create.addEventListener('click', function () {
        if (fieldCreateName.value == "") {
            alert("Заполните поле")
        } else if (fieldCreateName.value.length > 40) {
            alert('Слишком длинное имя.')
        } else {
            let fieldsArr = JSON.parse(fields2.responseText)
            let field = {
                fieldName: '',
                creator: '',
                login: '',
                loginsecond: '',
                players: '0',
                count: ''
            }
            field.creator = localStorage.getItem('login')
            field.fieldName = fieldCreateName.value
            field.count = fieldsArr.length + 1
            fieldsArr.push(field)
            let fieldsSender = new XMLHttpRequest();
            fieldsSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
            fieldsSender.setRequestHeader("Content-type", "application/json");
            fieldsSender.send(JSON.stringify(fieldsArr));
            fieldsSender.addEventListener('readystatechange', function () {
                if (fieldsSender.readyState == 4) {
                    if (fieldsSender.status == 200) {
                        alert('Поле успешно зарегестрировано!');
                        window.location.href = "index3.html"
                    } else {
                        alert('Ошибка отправки. Попробуйте еще раз.');
                    }
                }
            })
        }
    })
    exitCreate.addEventListener('click', function () {
        window.location.href = "index3.html"
    })
}

if (document.title == "Подтверждение") {
    startGameButton.addEventListener('click', function () {
        localStorage.setItem('correct', 0)
        localStorage.setItem('gameStarted', 0)
        localStorage.setItem('gameSended', 0)
        localStorage.setItem('startClicked', 0)
        localStorage.setItem('enterGame', 1)
        window.location.href = "index7.html"
    })
    let templateCode = `
        <button class="exitGameButton" id="exitGameButton">Выйти</button>
    `
    let template = Handlebars.compile(templateCode);
    let head = document.querySelector('#header');
    head.innerHTML = '';
    head.innerHTML = template()
    exitGameButton.addEventListener('click', function () {
        window.location.href = 'index3.html';
    })
}

function findGoing() {
    let t = setInterval(function () {
        let gamestep2 = new XMLHttpRequest();
        gamestep2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
        gamestep2.send();
        gamestep2.addEventListener('readystatechange', function () {
            if (gamestep2.readyState == 4 && gamestep2.status == 200) {
                let gameArr4 = JSON.parse(gamestep2.responseText)
                let gameArr6 = JSON.parse(gamestep2.responseText)
                let myarr = JSON.parse(localStorage.getItem('myarr'))
                for (let i = 0; i < gameArr4.length; i++) {
                    if (gameArr4[i][10] == myarr[10]) {
                        if (gameArr4[i][11] == true) {
                            myarr = gameArr4[i]
                            localStorage.setItem('myarr', JSON.stringify(myarr))
                            for (let i = 0; i < 10; i++) {
                                for (let j = 0; j < 10; j++) {
                                    let k = i * 10 + j
                                    if (myarr[i][j] == 2) {
                                        let h = document.querySelector('#fieldPart' + k)
                                        h.classList = ('fieldElement4')
                                    }
                                    if (myarr[i][j] == 3) {
                                        let h = document.querySelector('#fieldPart' + k)
                                        h.classList = ('fieldElement3')
                                    }
                                }
                            }
                            if (localStorage.getItem('alertenemystep') == 1) {
                                alert('Ваш ход')
                                localStorage.setItem('alertenemystep', 0)
                            }
                            gameGoing()
                            clearInterval(t)
                            break
                        }
                        if (gameArr4[i][11] == "lose") {
                            localStorage.setItem('gameEnded', 2)
                            alert('К сожалению вы проиграли');
                            deleteTwoFields()
                            clearInterval(t)
                        }
                    }
                }
            }
        })
    }, 500)
}

function deleteTwoFields() {
    let game2 = new XMLHttpRequest();
    game2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
    game2.send();
    game2.addEventListener('readystatechange', function () {
        if (game2.readyState == 4) {
            if (game2.status == 200) {
                let gameArr4 = JSON.parse(game2.responseText)
                for (let i = 0; i < gameArr4.length; i++) {
                    if (gameArr4[i][10] == localStorage.getItem('mylogin')) {
                        gameArr4.splice(i, 1)
                        let gameSender4 = new XMLHttpRequest();
                        gameSender4.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                        gameSender4.setRequestHeader("Content-type", "application/json");
                        gameSender4.send(JSON.stringify(gameArr4));
                        gameSender4.addEventListener('readystatechange', function () {
                            if (gameSender4.readyState == 4) {
                                localStorage.setItem('gameEnded', 2)
                                localStorage.removeItem('correct')
                                localStorage.removeItem('gameStarted')
                                localStorage.removeItem('gameSended')
                                localStorage.removeItem('startClicked')
                                localStorage.removeItem('enterGame')
                                localStorage.removeItem('checkArr')
                                localStorage.removeItem('enemylogin')
                                localStorage.removeItem('mylogin')
                                localStorage.removeItem('steps')
                                localStorage.removeItem('timer')
                                localStorage.removeItem('alertenemystep')
                                localStorage.removeItem('enemyarr')
                                localStorage.removeItem('myarr')
                                window.location.href = 'index3.html';
                            }
                        })
                    }
                }
            }
        }
    })
}

function paint(enemyarr) {
    let check = JSON.parse(localStorage.getItem('checkArr'))
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let k = i * 10 + j
            if (enemyarr[i][j] == 2 && check.includes(k)) {
                let h = document.querySelector('#enemyFieldPart' + k)
                h.classList = ('fieldElement4')
            }
        }
    }
}

function checkBoatEnd(enemyarr, k) {
    let soundCheck = localStorage.getItem('checkArr')
    let check = []
    let flag = false
    for (let a = 0; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
            if (enemyarr[a][b] == 2 && a < 9 && (check.includes(a * 10 + b) == false)) {
                if (enemyarr[a + 1][b] == 2 && a < 8 && (check.includes((a + 1) * 10 + b) == false)) {
                    if (enemyarr[a + 2][b] == 2 && a < 7 && (check.includes((a + 2) * 10 + b) == false)) {
                        if (enemyarr[a + 3][b] == 2 && (check.includes((a + 2) * 10 + b) == false)) {
                            check.push(a * 10 + b)
                            check.push((a + 1) * 10 + b)
                            check.push((a + 2) * 10 + b)
                            check.push((a + 3) * 10 + b)
                            if (soundCheck.includes(a * 10 + b) == false) {
                                flag = true
                                sound7.play()
                            }
                        }
                        if ((enemyarr[a + 3][b] == 0 || enemyarr[a + 3][b] == 3)) {
                            if (a > 0) {
                                if (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3) {
                                    check.push(a * 10 + b)
                                    check.push((a + 1) * 10 + b)
                                    check.push((a + 2) * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound6.play()
                                    }
                                }
                            }
                            if (a == 0) {
                                check.push(a * 10 + b)
                                check.push((a + 1) * 10 + b)
                                check.push((a + 2) * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound6.play()
                                }
                            }
                        }
                    }
                    if (enemyarr[a + 2][b] == 2 && a == 7 && check.includes((a + 2) * 10 + b) == false && (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3)) {
                        check.push(a * 10 + b)
                        check.push((a + 1) * 10 + b)
                        check.push((a + 2) * 10 + b)
                        if (soundCheck.includes(a * 10 + b) == false) {
                            flag = true
                            sound6.play()
                        }
                    }
                    if ((enemyarr[a + 2][b] == 0 || enemyarr[a + 2][b] == 3)) {
                        if (a > 0) {
                            if (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3) {
                                check.push(a * 10 + b)
                                check.push((a + 1) * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound5.play()
                                }
                            }
                        }
                        if (a == 0) {
                            check.push(a * 10 + b)
                            check.push((a + 1) * 10 + b)
                            if (soundCheck.includes(a * 10 + b) == false) {
                                flag = true
                                sound5.play()
                            }
                        }
                    }
                }
                if (enemyarr[a + 1][b] == 2 && a == 8 && check.includes((a + 1) * 10 + b) == false && (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3)) {
                    check.push(a * 10 + b)
                    check.push((a + 1) * 10 + b)
                    if (soundCheck.includes(a * 10 + b) == false) {
                        flag = true
                        sound5.play()
                    }
                }
                if (enemyarr[a + 1][b] == 0 || enemyarr[a + 1][b] == 3) {
                    if (a > 0) {
                        if (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3) {
                            if (b > 0 && b < 9) {
                                if ((enemyarr[a][b + 1] == 0 || enemyarr[a][b + 1] == 3) && (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3)) {
                                    check.push(a * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound4.play()
                                    }
                                }
                            }
                            if (b == 0) {
                                if ((enemyarr[a][b + 1] == 0 || enemyarr[a][b + 1] == 3)) {
                                    check.push(a * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound4.play()
                                    }
                                }
                            }
                            if (b == 9) {
                                if ((enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3)) {
                                    check.push(a * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound4.play()
                                    }
                                }
                            }
                        }
                    }
                    if (a == 0) {
                        if (b > 0 && b < 9) {
                            if ((enemyarr[a][b + 1] == 0 || enemyarr[a][b + 1] == 3) && (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3)) {
                                check.push(a * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound4.play()
                                }
                            }
                        }
                        if (b == 0) {
                            if ((enemyarr[a][b + 1] == 0 || enemyarr[a][b + 1] == 3)) {
                                check.push(a * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound4.play()
                                }
                            }
                        }
                        if (b == 9) {
                            if ((enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3)) {
                                check.push(a * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound4.play()
                                }
                            }
                        }
                    }
                }
            }
            if (enemyarr[a][b] == 2 && b < 9 && (check.includes(a * 10 + b) == false)) {
                if (enemyarr[a][b + 1] == 2 && b < 8 && (check.includes(a * 10 + b + 1) == false)) {
                    if (enemyarr[a][b + 2] == 2 && b < 7 && (check.includes(a * 10 + b + 2) == false)) {
                        if (enemyarr[a][b + 3] == 2 && (check.includes(a * 10 + b + 3) == false)) {
                            check.push(a * 10 + b)
                            check.push(a * 10 + b + 1)
                            check.push(a * 10 + b + 2)
                            check.push(a * 10 + b + 3)
                            if (soundCheck.includes(a * 10 + b) == false) {
                                flag = true
                                sound7.play()
                            }
                        }
                        if ((enemyarr[a][b + 3] == 0 || enemyarr[a][b + 3] == 3)) {
                            if (b > 0) {
                                if (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3) {
                                    check.push(a * 10 + b)
                                    check.push(a * 10 + b + 1)
                                    check.push(a * 10 + b + 2)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound6.play()
                                    }
                                }
                            }
                            if (b == 0) {
                                check.push(a * 10 + b)
                                check.push(a * 10 + b + 1)
                                check.push(a * 10 + b + 2)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound6.play()
                                }
                            }
                        }
                    }
                    if (enemyarr[a][b + 2] == 2 && b == 7 && check.includes(a * 10 + b + 2) == false && (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3)) {
                        check.push(a * 10 + b)
                        check.push(a * 10 + b + 1)
                        check.push(a * 10 + b + 2)
                        if (soundCheck.includes(a * 10 + b) == false) {
                            flag = true
                            sound6.play()
                        }
                    }
                    if ((enemyarr[a][b + 2] == 0 || enemyarr[a][b + 2] == 3)) {
                        if (b > 0) {
                            if (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3) {
                                check.push(a * 10 + b)
                                check.push(a * 10 + b + 1)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound5.play()
                                }
                            }
                        }
                        if (b == 0) {
                            check.push(a * 10 + b)
                            check.push(a * 10 + b + 1)
                            if (soundCheck.includes(a * 10 + b) == false) {
                                flag = true
                                sound5.play()
                            }
                        }
                    }
                }
                if (enemyarr[a][b + 1] == 2 && b == 8 && check.includes(a * 10 + b + 1) == false && (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3)) {
                    check.push(a * 10 + b)
                    check.push(a * 10 + b + 1)
                    if (soundCheck.includes(a * 10 + b) == false) {
                        flag = true
                        sound5.play()
                    }
                }
                if (enemyarr[a][b + 1] == 0 || enemyarr[a][b + 1] == 3) {
                    if (b > 0) {
                        if (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3) {
                            if (a > 0 && a < 9) {
                                if ((enemyarr[a + 1][b] == 0 || enemyarr[a + 1][b] == 3) && (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3)) {
                                    check.push(a * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound4.play()
                                    }
                                }
                            }
                            if (a == 0) {
                                if ((enemyarr[a + 1][b] == 0 || enemyarr[a + 1][b] == 3)) {
                                    check.push(a * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound4.play()
                                    }
                                }
                            }
                            if (a == 9) {
                                if ((enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3)) {
                                    check.push(a * 10 + b)
                                    if (soundCheck.includes(a * 10 + b) == false) {
                                        flag = true
                                        sound4.play()
                                    }
                                }
                            }
                        }
                    }
                    if (b == 0) {
                        if (a > 0 && a < 9) {
                            if ((enemyarr[a + 1][b] == 0 || enemyarr[a + 1][b] == 3) && (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3)) {
                                check.push(a * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound4.play()
                                }
                            }
                        }
                        if (a == 0) {
                            if ((enemyarr[a + 1][b] == 0 || enemyarr[a + 1][b] == 3)) {
                                check.push(a * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound4.play()
                                }
                            }
                        }
                        if (a == 9) {
                            if ((enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3)) {
                                check.push(a * 10 + b)
                                if (soundCheck.includes(a * 10 + b) == false) {
                                    flag = true
                                    sound4.play()
                                }
                            }
                        }
                    }
                }
            }
            if (a == 9 && b == 9 && (enemyarr[a - 1][b] == 0 || enemyarr[a - 1][b] == 3) && (enemyarr[a][b - 1] == 0 || enemyarr[a][b - 1] == 3) && (check.includes(a * 10 + b) == false) && enemyarr[a][b] == 2) {
                check.push(a * 10 + b)
                if (soundCheck.includes(a * 10 + b) == false) {
                    flag = true
                    sound4.play()
                }
            }
        }
    }
    console.log(soundCheck)
    console.log(check);
    console.log(soundCheck.length)
    console.log(check.length);
    if (flag == false) {
        sound2.play()
    }
    if (check.length == 20) {
        paint(enemyarr)
        localStorage.setItem('gameEnded', 1)
    }
    localStorage.setItem('checkArr', JSON.stringify(check))
    paint(enemyarr)
}

function gameGoing() {
    document.addEventListener('click', function (e) {
        console.log(e.target.id);
        if (e.target.id == "loseButton") {
            deleteGame()
        }
        if (e.target.id.slice(0, 10) == "enemyField") {
            let myarr = JSON.parse(localStorage.getItem('myarr'))
            let enemyarr = JSON.parse(localStorage.getItem('enemyarr'))
            if (myarr[11] == true && e.target.classList == "fieldElement") {
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 10; j++) {
                        let k = i * 10 + j
                        if (e.target.id == 'enemyFieldPart' + k) {
                            if (enemyarr[i][j] == 1) {
                                e.target.classList.toggle('fieldElement2')
                                enemyarr[i][j] = 2
                                myarr[11] = true
                                enemyarr[11] = false
                                checkBoatEnd(enemyarr, k)
                            }
                            if (enemyarr[i][j] == 0) {
                                sound3.play()
                                e.target.classList.toggle('fieldElement3')
                                enemyarr[i][j] = 3
                                myarr[11] = false
                                enemyarr[11] = true
                                localStorage.setItem('alertenemystep', 1)
                                alert('Ход соперника')
                            }
                        }
                    }
                }
                if (localStorage.getItem('gameEnded') == 1) {
                    myarr[11] = "win"
                    enemyarr[11] = "lose"
                }
                localStorage.setItem('myarr', JSON.stringify(myarr))
                localStorage.setItem('enemyarr', JSON.stringify(enemyarr))
                let gamestep = new XMLHttpRequest();
                gamestep.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                gamestep.send();
                gamestep.addEventListener('readystatechange', function () {
                    if (gamestep.readyState == 4 && gamestep.status == 200) {
                        let gameArr = JSON.parse(gamestep.responseText)
                        for (let i = 0; i < gameArr.length; i++) {
                            if (gameArr[i][10] == myarr[10]) {
                                gameArr[i] = myarr
                            }
                            if (gameArr[i][10] == enemyarr[10]) {
                                gameArr[i] = enemyarr
                            }
                        }
                        let gamestepSender = new XMLHttpRequest();
                        gamestepSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                        gamestepSender.setRequestHeader("Content-type", "application/json");
                        gamestepSender.send(JSON.stringify(gameArr));
                        gamestepSender.addEventListener('readystatechange', function () {
                            if (gamestepSender.readyState == 4 && gamestepSender.status == 200) {
                                if (myarr[11] == false) {
                                    findGoing()
                                }
                                if (myarr[11] == true) {
                                    gameGoing()
                                }
                                if (myarr[11] == "win") {
                                    alert('Поздравляю! Вы выиграли');
                                    deleteTwoFields()
                                }
                            }
                        })
                    }
                })
            }
        }
    })
}

function deleteGame() {
    let fields3 = new XMLHttpRequest();
    fields3.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
    fields3.send();
    fields3.addEventListener('readystatechange', function () {
        if (fields3.readyState == 4) {
            if (fields3.status == 200) {
                let fieldsArr = JSON.parse(fields3.responseText)
                for (let elem of fieldsArr) {
                    if (elem.login == localStorage.getItem('login')) {
                        elem.login = ""
                        elem.players -= 1
                    }
                    if (elem.loginsecond == localStorage.getItem('login')) {
                        elem.loginsecond = ""
                        elem.players -= 1
                    }
                }
                let fieldSender4 = new XMLHttpRequest();
                fieldSender4.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                fieldSender4.setRequestHeader("Content-type", "application/json");
                fieldSender4.send(JSON.stringify(fieldsArr));
                fieldSender4.addEventListener('readystatechange', function () {
                    if (fieldSender4.readyState == 4 && fieldSender4.status == 200) {
                        console.log(fieldsArr)
                        localStorage.setItem('enterGame', 0)
                        localStorage.setItem('correct', 0)
                        localStorage.setItem('gameSended', 0)
                        localStorage.setItem('gameStarted', 0)
                        localStorage.setItem('gameSended', 0)
                        localStorage.setItem('startClicked', 0)
                        window.location.href = 'index3.html';
                    }
                })
            }
        }
    })
}

if (document.title == "Бой") {
    loseButton.addEventListener('click', function () {
        localStorage.removeItem('myarr')
        localStorage.removeItem('enemyarr')
        if (localStorage.getItem('gameStarted') == 1) {
            let game2 = new XMLHttpRequest();
            game2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
            game2.send();
            game2.addEventListener('readystatechange', function () {
                if (game2.readyState == 4) {
                    if (game2.status == 200) {
                        let gameArr4 = JSON.parse(game2.responseText)
                        for (let i = 0; i < gameArr4.length; i++) {
                            if (gameArr4[i][10] == localStorage.getItem('login')) {
                                gameArr4.splice(i, 1)
                                let gameSender4 = new XMLHttpRequest();
                                gameSender4.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                gameSender4.setRequestHeader("Content-type", "application/json");
                                gameSender4.send(JSON.stringify(gameArr4));
                                gameSender4.addEventListener('readystatechange', function () {
                                    if (gameSender4.readyState == 4) {
                                        if (gameSender4.status == 200) {
                                            if (localStorage.getItem('gameSended') == 1) {
                                                deleteGame()
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            })
        }
        if (localStorage.getItem('gameStarted') == 0) {
            if (localStorage.getItem('gameSended') == 1) {
                deleteGame()
            }
            if (localStorage.getItem('gameSended') == 0) {
                localStorage.setItem('enterGame', 0)
                localStorage.setItem('correct', 0)
                localStorage.setItem('gameSended', 0)
                localStorage.setItem('gameStarted', 0)
                localStorage.setItem('startClicked', 0)
                window.location.href = 'index3.html';
            }
        }
    })
    document.addEventListener('click', function (e) {
        if (e.target.id.slice(0, 9) == "fieldPart") {
            if (localStorage.getItem('correct') == 0) {
                e.target.classList.toggle('fieldElement2')
            }
        }
    })
    readyButton.addEventListener('click', function () {
        let boatsArr = {}
        let chekedArr = []
        let nearFlag = true
        let nearby = true
        let onefieldboat = 0
        let twofieldboat = 0
        let treefieldboat = 0
        let fourfieldboat = 0
        let sum = 0
        let arr = document.getElementsByClassName('fieldElement1')
        for (let i = 0; i < 10; i++) {
            boatsArr[i] = {};
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (arr[i * 10 + j].classList.value.length > 20) {
                    boatsArr[i][j] = 1;
                    sum += 1;
                } else {
                    boatsArr[i][j] = 0;
                }
            }
        }
        boatsArr[10] = localStorage.getItem('login')
        boatsArr[11] = false
        boatsArr[12] = localStorage.getItem('fieldName')
        boatsArr[13] = 0
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if ((boatsArr[i][j] == 1) && (chekedArr.includes(i * 10 + j) == false)) {
                    if (i < 9) {
                        if (boatsArr[i + 1][j] == 1 && chekedArr.includes((i + 1) * 10 + j) == false && i < 8) {
                            if (boatsArr[i + 2][j] == 1 && chekedArr.includes((i + 2) * 10 + j) == false && i < 7) {
                                if (boatsArr[i + 3][j] == 1 && chekedArr.includes((i + 3) * 10 + j) == false) {
                                    if (i < 6 && boatsArr[i + 4][j] == 1 && chekedArr.includes((i + 4) * 10 + j) == false) {
                                        nearFlag = false
                                    } else {
                                        fourfieldboat += 1
                                        chekedArr[chekedArr.length] = i * 10 + j
                                        chekedArr[chekedArr.length] = (i + 1) * 10 + j
                                        chekedArr[chekedArr.length] = (i + 2) * 10 + j
                                        chekedArr[chekedArr.length] = (i + 3) * 10 + j
                                    }
                                } else {
                                    treefieldboat += 1
                                    chekedArr[chekedArr.length] = i * 10 + j
                                    chekedArr[chekedArr.length] = (i + 1) * 10 + j
                                    chekedArr[chekedArr.length] = (i + 2) * 10 + j
                                }
                            } else if (boatsArr[i + 2][j] == 1 && chekedArr.includes((i + 1) * 10 + j) == false && i == 7) {
                                treefieldboat += 1
                                chekedArr[chekedArr.length] = i * 10 + j
                                chekedArr[chekedArr.length] = (i + 1) * 10 + j
                                chekedArr[chekedArr.length] = (i + 2) * 10 + j
                            } else {
                                twofieldboat += 1
                                chekedArr[chekedArr.length] = i * 10 + j
                                chekedArr[chekedArr.length] = (i + 1) * 10 + j
                            }
                        } else if (boatsArr[i + 1][j] == 1 && chekedArr.includes((i + 1) * 10 + j) == false && i == 8) {
                            twofieldboat += 1
                            chekedArr[chekedArr.length] = i * 10 + j
                            chekedArr[chekedArr.length] = (i + 1) * 10 + j
                        } else if (chekedArr.includes(i * 10 + j) == false && j == 9) {
                            onefieldboat += 1
                            chekedArr[chekedArr.length] = i * 10 + j
                        }
                    }
                    if (j < 9) {
                        if (boatsArr[i][j + 1] == 1 && chekedArr.includes(i * 10 + j + 1) == false && (j < 8)) {
                            if (boatsArr[i][j + 2] == 1 && chekedArr.includes(i * 10 + j + 2) == false && (j < 7)) {
                                if (boatsArr[i][j + 3] == 1 && chekedArr.includes(i * 10 + j + 3) == false) {
                                    if (j < 6 && boatsArr[i][j + 4] == 1 && chekedArr.includes(i * 10 + j + 4) == false) {
                                        nearFlag = false
                                    } else {
                                        fourfieldboat += 1
                                        chekedArr[chekedArr.length] = i * 10 + j
                                        chekedArr[chekedArr.length] = i * 10 + j + 1
                                        chekedArr[chekedArr.length] = i * 10 + j + 2
                                        chekedArr[chekedArr.length] = i * 10 + j + 3
                                    }
                                } else {
                                    treefieldboat += 1
                                    chekedArr[chekedArr.length] = i * 10 + j
                                    chekedArr[chekedArr.length] = i * 10 + j + 1
                                    chekedArr[chekedArr.length] = i * 10 + j + 2
                                }
                            } else if (boatsArr[i][j + 2] == 1 && chekedArr.includes(i * 10 + j + 1) == false && j == 7) {
                                treefieldboat += 1
                                chekedArr[chekedArr.length] = i * 10 + j
                                chekedArr[chekedArr.length] = i * 10 + j + 1
                                chekedArr[chekedArr.length] = i * 10 + j + 2
                            } else {
                                twofieldboat += 1
                                chekedArr[chekedArr.length] = i * 10 + j
                                chekedArr[chekedArr.length] = i * 10 + j + 1
                            }
                        } else if (boatsArr[i][j + 1] == 1 && chekedArr.includes(i * 10 + j + 1) == false && j == 8) {
                            twofieldboat += 1
                            chekedArr[chekedArr.length] = i * 10 + j
                            chekedArr[chekedArr.length] = i * 10 + j + 1
                        } else if (chekedArr.includes(i * 10 + j) == false) {
                            onefieldboat += 1
                            chekedArr[chekedArr.length] = i * 10 + j
                        }
                    }
                    if (i == 9 && j == 9 && chekedArr.includes(99) == false) {
                        onefieldboat += 1
                        chekedArr[chekedArr.length] = i * 10 + j
                    }
                }
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (chekedArr.includes(i * 10 + j)) {
                    if (chekedArr.includes((i + 1) * 10 + j) && j != 0 && j != 9) {
                        if (chekedArr.includes((i + 2) * 10 + j)) {
                            if (chekedArr.includes((i + 3) * 10 + j)) {
                                if (chekedArr.includes(i * 10 + j + 1) || chekedArr.includes(i * 10 + j - 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 1) * 10 + j + 1) || chekedArr.includes((i + 1) * 10 + j - 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 2) * 10 + j + 1) || chekedArr.includes((i + 2) * 10 + j - 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 3) * 10 + j + 1) || chekedArr.includes((i + 3) * 10 + j - 1)) {
                                    nearby = false
                                }
                            }
                            if (chekedArr.includes(i * 10 + j + 1) || chekedArr.includes(i * 10 + j - 1)) {
                                nearby = false
                            }
                            if (chekedArr.includes((i + 1) * 10 + j + 1) || chekedArr.includes((i + 1) * 10 + j - 1)) {
                                nearby = false
                            }
                            if (chekedArr.includes((i + 2) * 10 + j + 1) || chekedArr.includes((i + 2) * 10 + j - 1)) {
                                nearby = false
                            }
                        }
                        if (chekedArr.includes(i * 10 + j + 1) || chekedArr.includes(i * 10 + j - 1)) {
                            nearby = false
                        }
                        if (chekedArr.includes((i + 1) * 10 + j + 1) || chekedArr.includes((i + 1) * 10 + j - 1)) {
                            nearby = false
                        }
                    }
                    if (chekedArr.includes((i + 1) * 10) && j == 0) {
                        if (chekedArr.includes((i + 2) * 10)) {
                            if (chekedArr.includes((i + 3) * 10)) {
                                if (chekedArr.includes(i * 10 + 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 1) * 10 + 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 2) * 10 + 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 3) * 10 + 1)) {
                                    nearby = false
                                }
                            }
                            if (chekedArr.includes(i * 10 + 1)) {
                                nearby = false
                            }
                            if (chekedArr.includes((i + 1) * 10 + 1)) {
                                nearby = false
                            }
                            if (chekedArr.includes((i + 2) * 10 + 1)) {
                                nearby = false
                            }
                        }
                        if (chekedArr.includes(i * 10 + 1)) {
                            nearby = false
                        }
                        if (chekedArr.includes((i + 1) * 10 + 1)) {
                            nearby = false
                        }
                    }
                    if (chekedArr.includes((i + 1) * 10 + j) && j == 9) {
                        if (chekedArr.includes((i + 2) * 10 + j)) {
                            if (chekedArr.includes((i + 3) * 10 + j)) {
                                if (chekedArr.includes(i * 10 + j + 1) || chekedArr.includes(i * 10 + j - 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 1) * 10 + j - 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 2) * 10 + j - 1)) {
                                    nearby = false
                                }
                                if (chekedArr.includes((i + 3) * 10 + j - 1)) {
                                    nearby = false
                                }
                            }
                            if (chekedArr.includes(i * 10 + j - 1)) {
                                nearby = false
                            }
                            if (chekedArr.includes((i + 1) * 10 + j - 1)) {
                                nearby = false
                            }
                            if (chekedArr.includes((i + 2) * 10 + j - 1)) {
                                nearby = false
                            }
                        }
                        if (chekedArr.includes(i * 10 + j - 1)) {
                            nearby = false
                        }
                        if (chekedArr.includes((i + 1) * 10 + j - 1)) {
                            nearby = false
                        }
                    }
                    if (i != 0 && j != 9 && j != 0 && j != 9) {
                        if (chekedArr.includes((i + 1) * 10 + j + 1) || chekedArr.includes((i + 1) * 10 + j - 1)) {
                            nearby = false
                        }
                    }
                }
            }
        }
        if (onefieldboat == 4) {
            if (twofieldboat == 3) {
                if (treefieldboat == 2) {
                    if (fourfieldboat == 1) {
                        if (nearFlag == true) {
                            if (nearby == true) {
                                localStorage.setItem('gameEnded', 0)
                                localStorage.setItem('correct', 1)
                                let check = []
                                localStorage.setItem('checkArr', JSON.stringify(check))
                                let game = new XMLHttpRequest();
                                game.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                game.send();
                                game.addEventListener('readystatechange', function () {
                                    if (game.readyState == 4 && game.status == 200) {
                                        let fields = new XMLHttpRequest();
                                        fields.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                                        fields.send();
                                        fields.addEventListener('readystatechange', function () {
                                            if (fields.readyState == 4 && fields.status == 200) {
                                                let gameArr = JSON.parse(game.responseText)
                                                let fieldsArr = JSON.parse(fields.responseText)
                                                let flagplayers = true
                                                let flagsend = false
                                                for (let field of fieldsArr) {
                                                    if (field.creator + field.count == localStorage.getItem('fieldName')) {
                                                        if (field.players == 0 && flagplayers == true) {
                                                            readyButton.style.visibility = 'hidden'
                                                            localStorage.setItem('gameSended', 1)
                                                            field.login = localStorage.getItem('login')
                                                            field.players = 1
                                                            flagplayers = false
                                                            let a = setInterval(function () {
                                                                let fieldcheck = new XMLHttpRequest();
                                                                fieldcheck.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                                                                fieldcheck.send();
                                                                fieldcheck.addEventListener('readystatechange', function () {
                                                                    if (fieldcheck.readyState == 4 && fieldcheck.status == 200) {
                                                                        let fieldsArr2 = JSON.parse(fieldcheck.responseText)
                                                                        for (let field of fieldsArr2) {
                                                                            if (field.creator + field.count == localStorage.getItem('fieldName')) {
                                                                                if (field.players == 2) {
                                                                                    let deleteCompleteField = JSON.parse(fieldcheck.responseText)
                                                                                    for (let i = 0; i < deleteCompleteField.length; i++) {
                                                                                        if (deleteCompleteField[i].creator + deleteCompleteField[i].count == localStorage.getItem('fieldName')) {
                                                                                            localStorage.setItem('enemylogin', deleteCompleteField[i].loginsecond)
                                                                                            localStorage.setItem('mylogin', localStorage.getItem('login'))
                                                                                            deleteCompleteField.splice(i, 1)
                                                                                            let fieldcheckSender = new XMLHttpRequest();
                                                                                            fieldcheckSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                                                                                            fieldcheckSender.setRequestHeader("Content-type", "application/json");
                                                                                            fieldcheckSender.send(JSON.stringify(deleteCompleteField));
                                                                                        }
                                                                                    }
                                                                                    let fieldcheck2 = new XMLHttpRequest();
                                                                                    fieldcheck2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                                                                    fieldcheck2.send();
                                                                                    fieldcheck2.addEventListener('readystatechange', function () {
                                                                                        if (fieldcheck2.readyState == 4 && fieldcheck2.status == 200) {
                                                                                            let gameArr2 = JSON.parse(fieldcheck2.responseText)
                                                                                            boatsArr[11] = true
                                                                                            gameArr2.push(boatsArr)
                                                                                            let gameSender2 = new XMLHttpRequest();
                                                                                            gameSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                                                                            gameSender2.setRequestHeader("Content-type", "application/json");
                                                                                            gameSender2.send(JSON.stringify(gameArr2));
                                                                                            gameSender2.addEventListener('readystatechange', function () {
                                                                                                if (gameSender2.readyState == 4 && gameSender2.status == 200) {
                                                                                                    for (let eleme of gameArr2) {
                                                                                                        if (eleme[10] == localStorage.getItem('mylogin')) {
                                                                                                            let myarr = eleme
                                                                                                            localStorage.setItem('myarr', JSON.stringify(myarr))
                                                                                                        }
                                                                                                        if (eleme[10] == localStorage.getItem('enemylogin')) {
                                                                                                            let enemyarr = eleme
                                                                                                            localStorage.setItem('enemyarr', JSON.stringify(enemyarr))
                                                                                                        }
                                                                                                    }
                                                                                                    readyButton.style.visibility = 'hidden'
                                                                                                    localStorage.setItem('correct', 1)
                                                                                                    localStorage.setItem('gameStarted', 1)
                                                                                                    localStorage.setItem('timer', 0)
                                                                                                    localStorage.setItem('startClicked', 1)
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                    })
                                                                                    localStorage.setItem('steps', 0)
                                                                                    localStorage.setItem('timer', 0)
                                                                                    localStorage.setItem('alertenemystep', 1)
                                                                                    localStorage.setItem('gameStarted', 1)
                                                                                    gameGoing()
                                                                                    sound1.play()
                                                                                    alert('противник найден')
                                                                                    alert('Ваш ход')
                                                                                    clearInterval(a)
                                                                                    break
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                })
                                                            }, 2000)
                                                        }
                                                        if (field.players == 1 && flagplayers == true && field.login != localStorage.getItem('login')) {
                                                            let fieldcheck2 = new XMLHttpRequest();
                                                            fieldcheck2.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                                            fieldcheck2.send();
                                                            fieldcheck2.addEventListener('readystatechange', function () {
                                                                if (fieldcheck2.readyState == 4 && fieldcheck2.status == 200) {
                                                                    let gameArr3 = JSON.parse(fieldcheck2.responseText)
                                                                    field.loginsecond = localStorage.getItem('login')
                                                                    localStorage.setItem('enemyarr', 0)
                                                                    localStorage.setItem('enemylogin', field.login)
                                                                    localStorage.setItem('mylogin', localStorage.getItem('login'))
                                                                    field.players = 2
                                                                    flagplayers = false
                                                                    flagsend = true
                                                                    gameArr3.push(boatsArr)
                                                                    let fieldsSender2 = new XMLHttpRequest();
                                                                    fieldsSender2.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                                                                    fieldsSender2.setRequestHeader("Content-type", "application/json");
                                                                    fieldsSender2.send(JSON.stringify(fieldsArr));
                                                                    let gameSender = new XMLHttpRequest();
                                                                    gameSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                                                    gameSender.setRequestHeader("Content-type", "application/json");
                                                                    gameSender.send(JSON.stringify(gameArr3));
                                                                    gameSender.addEventListener('readystatechange', function () {
                                                                        if (gameSender.readyState == 4 && gameSender.status == 200) {
                                                                            let fieldcheck3 = new XMLHttpRequest();
                                                                            fieldcheck3.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                                                            fieldcheck3.send();
                                                                            fieldcheck3.addEventListener('readystatechange', function () {
                                                                                if (fieldcheck3.readyState == 4 && fieldcheck3.status == 200) {
                                                                                    let x = setInterval(function () {
                                                                                        let fieldcheck4 = new XMLHttpRequest();
                                                                                        fieldcheck4.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=6c2b964fc7850f7ca6f1a0015505b836', true);
                                                                                        fieldcheck4.send();
                                                                                        fieldcheck4.addEventListener('readystatechange', function () {
                                                                                            if (fieldcheck4.readyState == 4 && fieldcheck4.status == 200) {
                                                                                                let gameArr5 = JSON.parse(fieldcheck4.responseText)
                                                                                                for (let e of gameArr5) {
                                                                                                    if (localStorage.getItem('enemylogin') == e[10]) {
                                                                                                        localStorage.setItem('enemyarr', JSON.stringify(e))
                                                                                                        clearInterval(x)
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        })
                                                                                    }, 500)
                                                                                    for (let eleme of gameArr3) {
                                                                                        if (eleme[10] == localStorage.getItem('mylogin')) {
                                                                                            let myarr = eleme
                                                                                            localStorage.setItem('myarr', JSON.stringify(myarr))
                                                                                        }
                                                                                    }
                                                                                    readyButton.style.visibility = 'hidden'
                                                                                    localStorage.setItem('correct', 1)
                                                                                    localStorage.setItem('timer', 1)
                                                                                    localStorage.setItem('startClicked', 1)
                                                                                    localStorage.setItem('alertenemystep', 1)
                                                                                    localStorage.setItem('steps', 0)
                                                                                    localStorage.setItem('gameStarted', 1)
                                                                                    findGoing()
                                                                                    sound1.play()
                                                                                    alert('противник найден')
                                                                                    alert('Ход соперника')
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        if (field.players == 2 && flagplayers == true) {
                                                            flagplayers = false
                                                            alert('поле уже заняли')
                                                        }
                                                        let fieldsSender = new XMLHttpRequest();
                                                        fieldsSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=8f11d0af0bbdc10a6b24559e5af930c0', true);
                                                        fieldsSender.setRequestHeader("Content-type", "application/json");
                                                        fieldsSender.send(JSON.stringify(fieldsArr));
                                                        break
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            } if (nearby == false) {
                                alert('Некоторые корабли стоят слишком близко')
                            }
                        } else {
                            alert('Некоторые корабли больше пяти клеток')
                        }
                    } else {
                        alert('Неверное количество четырехпалубных кораблей')
                    }
                } else {
                    alert('Неверное количество трёхпалубных кораблей')
                }
            } else {
                alert('Неверное количество двухпалубных кораблей')
            }
        } else {
            alert('Неверное количество однопалубных кораблей')
        }
    })
}