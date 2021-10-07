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
    music.stopAllSounds()
    if (num == 0) {
        basic.showIcon(IconNames.Giraffe)
        soundExpression.giggle.play()
    }
    if (num == 1) {
        basic.showIcon(IconNames.Tortoise)
        soundExpression.mysterious.play()
    }
    if (num == 2) {
        basic.showIcon(IconNames.Angry)
        soundExpression.hello.play()
    }
    if (num == 3) {
        basic.showIcon(IconNames.Happy)
        soundExpression.happy.play()
    }
    if (num == 4) {
        basic.showIcon(IconNames.Sad)
        soundExpression.sad.play()
    }
    if (num == 5) {
        basic.showIcon(IconNames.Umbrella)
        soundExpression.slide.play()
    }
    if (num == 6) {
        basic.showIcon(IconNames.StickFigure)
        soundExpression.soaring.play()
    }
    if (num == 7) {
        basic.showIcon(IconNames.Duck)
        soundExpression.spring.play()
    }
    if (num == 8) {
        soundExpression.twinkle.play()
        for (let index = 0; index < 4; index++) {
            basic.showIcon(IconNames.Diamond)
            basic.pause(250)
            basic.showIcon(IconNames.Target)
            basic.pause(250)
            basic.showIcon(IconNames.SmallDiamond)
            basic.pause(250)
        }
    }
    if (num == 9) {
        basic.showIcon(IconNames.EigthNote)
        soundExpression.yawn.play()
    }
    if (num == 10) {
        basic.showIcon(IconNames.Snake)
        music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
    }
    if (num == 11) {
        basic.showIcon(IconNames.Rollerskate)
        music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Forever)
    }
    if (num == 12) {
        basic.showIcon(IconNames.Yes)
        music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
    }
    if (num >= 13) {
        basic.showIcon(IconNames.House)
        soundExpression.sad.play()
        basic.pause(250)
        currentMenuItem = 0
        showImage(currentMenuItem)
    }
}
input.onButtonPressed(Button.A, function () {
    if (currentApp == -1) {
        listMenu(-1)
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
            basic.pause(6)
        }
        currentMenuItem = 0
    }
    if (currentMenuItem < 0) {
        currentMenuItem = 24
    }
    basic.clearScreen()
    showImage(currentMenuItem)
}
input.onButtonPressed(Button.AB, function () {
    images.createBigImage(`
        . . # . . . # . . .
        . . . . . . . . . .
        . # . # . # . # . #
        . . . . . . . . . .
        # . . . # . . . # .
        `).scrollImage(1, 200)
    for (let index = 0; index < 4; index++) {
        music.playMelody("C E G B C5 B G E ", 333)
    }
})
input.onButtonPressed(Button.B, function () {
    if (currentApp == -1) {
        listMenu(1)
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
