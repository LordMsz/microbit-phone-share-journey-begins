function runAppShowIsNorth () {
    input.calibrateCompass()
    if (input.compassHeading() > 340 || input.compassHeading() < 20) {
        basic.showArrow(ArrowNames.North)
    } else {
        basic.showIcon(IconNames.No)
    }
}
function lightMenuItem (num: number) {
    led.plot(num % 5, num / 5)
}
function showImage (num: number) {
    if (num == 0) {
        basic.showIcon(IconNames.Giraffe)
    }
    if (num == 1) {
        basic.showIcon(IconNames.Tortoise)
    }
    if (num == 2) {
        basic.showIcon(IconNames.Angry)
    }
    if (num == 3) {
        basic.showIcon(IconNames.Happy)
    }
    if (num >= 4) {
        basic.showIcon(IconNames.House)
        music.playMelody("C F A C5 C5 A C5 C5 ", 480)
    }
}
input.onButtonPressed(Button.A, function () {
    if (currentApp == -1) {
        listMenu(-1)
    }
    if (currentApp == 2) {
        runAppChartFill(-5)
    }
})
function runAppImageSwitcher () {
    showImage(counter)
    counter = counter + 1
    if (counter >= 5) {
        counter = 0
        basic.clearScreen()
        basic.pause(50)
        images.createBigImage(`
            . . . # . # # # # #
            . # # # # # # # # #
            # # # # # # # # # #
            . . # # # # # # # #
            . . . . # # # # # #
            `).scrollImage(1, 42)
        basic.pause(500)
        basic.clearScreen()
    }
}
function listMenu (delta: number) {
    currentMenuItem = currentMenuItem + delta
    if (currentMenuItem >= 24) {
        for (let pořadí = 0; pořadí <= 100; pořadí++) {
            led.plotBarGraph(
            pořadí,
            100
            )
            basic.pause(4)
        }
        currentMenuItem = 0
    }
    if (currentMenuItem < 0) {
        currentMenuItem = 24
    }
    basic.clearScreen()
    lightMenuItem(currentMenuItem)
}
input.onButtonPressed(Button.AB, function () {
    if (currentApp == -1) {
        currentMenuItem = 0
    }
    currentApp = -1
    listMenu(0)
})
input.onButtonPressed(Button.B, function () {
    if (currentApp == -1) {
        listMenu(1)
    }
    if (currentApp == 2) {
        runAppChartFill(5)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (currentApp == -1) {
        currentApp = currentMenuItem
    }
    if (currentApp == 0) {
        runAppShowIsNorth()
    }
    if (currentApp == 1) {
        runAppImageSwitcher()
    }
    if (currentApp == 2) {
        runAppChartFill(0)
    }
})
function runAppChartFill (delta: number) {
    appChartFillCurrentValue = Math.constrain(appChartFillCurrentValue + delta, 0, 100)
    led.plotBarGraph(
    appChartFillCurrentValue,
    100
    )
}
let appChartFillCurrentValue = 0
let currentApp = 0
let currentMenuItem = 0
let counter = 0
counter = 0
currentMenuItem = 0
currentApp = -1
music.setVolume(100)
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.OnceInBackground)
listMenu(0)
