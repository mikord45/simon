document.querySelector("#start").addEventListener("click", function () { //przypisanie do przycisku START odpowiednich fukncji
    if (main.gameActive == false) {
        main.gameActive = true
        document.querySelector("#colSignal").style.backgroundColor = "green"
        main.play()
    }
})

var colorBts = document.querySelectorAll(".bt") //przypisanie do kolorowych przycisków odpowiednich fukncji
for (let i = 0; i < colorBts.length; i++) {
    colorBts[i].addEventListener("click", function (e) {
        if (main.gameActive == true) {
            // console.log(e.target.id)
            main.check(e.target.id)
        }
    })
}


var main = { //utworzenie głównego obiektu, w którym będą przechowywane dane dot. gry oraz potrzebne funkcje
    gameActive: false, //wlasciwosc okreslajaca czy gra jest aktywna
    tabOfColours: ["green", "red", "yellow", "blue"],
    tabOfSignals: [], //tablica zawierająca dane o sekwencji sygnałów   
    numberOfClickedProperly: 0, //ilosc kliknietych aktualnie przycisków    
    topScore: 0, //najlepszy wynik
    play: function () { //metoda obiektu main uruchamiająca grę
        setTimeout(function () {  //wylosowanie pierwszego elementu
            var random = Math.floor(Math.random() * 4)
            main.tabOfSignals.push(random)
            for (let i = 0; i < main.tabOfSignals.length; i++) {
                var buttonToFlash = document.getElementById(main.tabOfColours[main.tabOfSignals[i]])
                console.log(buttonToFlash.style)
                buttonToFlash.style.display = "none"
                setTimeout(function () {
                    buttonToFlash.style.display = "block"
                }, 200)
            }
            main.lose5s = setTimeout(function () { //timeout funkcji odpowiedzialnej za przegranie po 5s bezczynnosci
                console.log("przegrana")
                document.querySelector("#colSignal").style.backgroundColor = "red"
                var j = 0
                var x = setInterval(function () {
                    for (let i = 0; i < main.tabOfColours.length; i++) {
                        document.querySelector("#" + main.tabOfColours[i]).style.display = "none"
                    }
                    setTimeout(function () {
                        for (let i = 0; i < main.tabOfColours.length; i++) {
                            document.querySelector("#" + main.tabOfColours[i]).style.display = "block"
                        }
                    }, 200)
                    j += 1
                    if (j == 5) {
                        clearInterval(x)
                        main.gameActive = false
                        main.tabOfSignals = []
                        if (main.topScore < 10) {
                            main.topScore = "0" + main.topScore
                        }

                        main.numberOfClickedProperly = 0
                        document.querySelector("#currentScore").innerText = "00"
                        document.querySelector("#topScore").innerText = main.topScore
                    }
                }, 400)
            }, 5000)
        }, 3000)
    },
    addOne: function () { //metoda odpowiedzialna za dodawanie nowego elementu do sekwencji
        var random = Math.floor(Math.random() * 4)
        main.tabOfSignals.push(random)
        var j = 0
        var currentNumber = main.numberOfClickedProperly
        if (currentNumber < 10) {
            currentNumber = "0" + currentNumber
        }
        document.querySelector("#currentScore").innerText = currentNumber
        var x = setInterval(function () { //funkcja, która pokazuje sekwencją z uwzględnianiem przyspieszania po 5, 9 i 13 elemencie
            document.querySelector("#" + main.tabOfColours[main.tabOfSignals[j]]).style.display = "none"
            if (j < 5) {
                setTimeout(function () {
                    document.querySelector("#" + main.tabOfColours[main.tabOfSignals[j]]).style.display = "block"
                    j += 1
                    if (j == main.tabOfSignals.length) {
                        clearInterval(x)
                    }
                }, 400)
            }
            else if (j < 9) {
                console.log("X")
                setTimeout(function () {
                    document.querySelector("#" + main.tabOfColours[main.tabOfSignals[j]]).style.display = "block"
                    j += 1
                    if (j == main.tabOfSignals.length) {
                        clearInterval(x)
                    }
                }, 300)
            }
            else if (j < 13) {
                setTimeout(function () {
                    document.querySelector("#" + main.tabOfColours[main.tabOfSignals[j]]).style.display = "block"
                    j += 1
                    if (j == main.tabOfSignals.length) {
                        clearInterval(x)
                    }
                }, 200)
            }
            else {
                setTimeout(function () {
                    document.querySelector("#" + main.tabOfColours[main.tabOfSignals[j]]).style.display = "block"
                    j += 1
                    if (j == main.tabOfSignals.length) {
                        clearInterval(x)
                    }
                }, 150)
            }
        }, 600)
    },
    check: function (col) { //metoda odpowiedzialna za sprawdzanie czy podawaana sekwencja przez uzytkownika jest prawidłowa
        var properColor = main.tabOfColours[main.tabOfSignals[main.numberOfClickedProperly]]
        if (properColor == col) {
            document.querySelector("#" + col).style.display = "none"
            setTimeout(function () {
                document.querySelector("#" + col).style.display = "block"
                main.numberOfClickedProperly += 1
                if (main.lose5s != undefined) {
                    clearTimeout(main.lose5s)
                }
                main.lose5s = setTimeout(function () {
                    console.log("przegrana")
                    document.querySelector("#colSignal").style.backgroundColor = "red"
                    var j = 0
                    var x = setInterval(function () {
                        for (let i = 0; i < main.tabOfColours.length; i++) {
                            document.querySelector("#" + main.tabOfColours[i]).style.display = "none"
                        }
                        setTimeout(function () {
                            for (let i = 0; i < main.tabOfColours.length; i++) {
                                document.querySelector("#" + main.tabOfColours[i]).style.display = "block"
                            }
                        }, 200)
                        j += 1
                        if (j == 5) {
                            clearInterval(x)
                            main.gameActive = false
                            main.tabOfSignals = []
                            if (main.topScore < 10) {
                                main.topScore = "0" + main.topScore
                            }

                            main.numberOfClickedProperly = 0
                            document.querySelector("#currentScore").innerText = "00"
                            document.querySelector("#topScore").innerText = main.topScore
                        }
                    }, 400)
                }, 5000)
                if (main.numberOfClickedProperly == main.tabOfSignals.length) {
                    clearInterval(main.lose5s)
                    main.addOne()
                    if (main.numberOfClickedProperly > main.topScore) {
                        main.topScore = main.numberOfClickedProperly
                    }
                    main.numberOfClickedProperly = 0
                }
            }, 100)
        }
        else {
            console.log("przegrana")
            document.querySelector("#colSignal").style.backgroundColor = "red"
            var j = 0
            var x = setInterval(function () {
                for (let i = 0; i < main.tabOfColours.length; i++) {
                    document.querySelector("#" + main.tabOfColours[i]).style.display = "none"
                }
                setTimeout(function () {
                    for (let i = 0; i < main.tabOfColours.length; i++) {
                        document.querySelector("#" + main.tabOfColours[i]).style.display = "block"
                    }
                }, 200)
                j += 1
                if (j == 5) {
                    clearInterval(x)
                    main.gameActive = false
                    main.tabOfSignals = []
                    if (main.topScore < 10) {
                        main.topScore = "0" + main.topScore
                    }

                    main.numberOfClickedProperly = 0
                    document.querySelector("#currentScore").innerText = "00"
                    document.querySelector("#topScore").innerText = main.topScore
                }
            }, 400)
        }
    }
}