def runAppShowIsNorth():
    input.calibrate_compass()
    if input.compass_heading() > 340 or input.compass_heading() < 20:
        basic.show_arrow(ArrowNames.NORTH)
    else:
        basic.show_icon(IconNames.NO)
def lightMenuItem(num: number):
    led.plot(num % 5, num / 5)
def showImage(num: number):
    if num == 0:
        basic.show_icon(IconNames.GIRAFFE)
    if num == 1:
        basic.show_icon(IconNames.TORTOISE)
    if num == 2:
        basic.show_icon(IconNames.ANGRY)
    if num == 3:
        basic.show_icon(IconNames.HAPPY)
    if num >= 4:
        basic.show_icon(IconNames.HOUSE)
        music.play_melody("C F A C5 C5 A C5 C5 ", 480)

def on_button_pressed_a():
    if currentApp == -1:
        listMenu(-1)
    if currentApp == 2:
        runAppChartFill(-5)
input.on_button_pressed(Button.A, on_button_pressed_a)

def runAppImageSwitcher():
    global counter
    showImage(counter)
    counter = counter + 1
    if counter >= 5:
        counter = 0
        basic.clear_screen()
        basic.pause(50)
        images.create_big_image("""
            . . . # . # # # # #
            . # # # # # # # # #
            # # # # # # # # # #
            . . # # # # # # # #
            . . . . # # # # # #
            """).scroll_image(1, 42)
        basic.pause(500)
        basic.clear_screen()
def listMenu(delta: number):
    global currentMenuItem
    currentMenuItem = currentMenuItem + delta
    if currentMenuItem >= 24:
        for pořadí in range(101):
            led.plot_bar_graph(pořadí, 100)
            basic.pause(4)
        currentMenuItem = 0
    if currentMenuItem < 0:
        currentMenuItem = 24
    basic.clear_screen()
    lightMenuItem(currentMenuItem)

def on_button_pressed_ab():
    global currentMenuItem, currentApp
    if currentApp == -1:
        currentMenuItem = 0
    currentApp = -1
    listMenu(0)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    if currentApp == -1:
        listMenu(1)
    if currentApp == 2:
        runAppChartFill(5)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    global currentApp
    if currentApp == -1:
        currentApp = currentMenuItem
    if currentApp == 0:
        runAppShowIsNorth()
    if currentApp == 1:
        runAppImageSwitcher()
    if currentApp == 2:
        runAppChartFill(0)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def runAppChartFill(delta: number):
    global appChartFillCurrentValue
    appChartFillCurrentValue = Math.constrain(appChartFillCurrentValue + delta, 0, 100)
    led.plot_bar_graph(appChartFillCurrentValue, 100)
appChartFillCurrentValue = 0
currentApp = 0
currentMenuItem = 0
counter = 0
counter = 0
currentMenuItem = 0
currentApp = -1
music.set_volume(100)
music.start_melody(music.built_in_melody(Melodies.POWER_UP),
    MelodyOptions.ONCE_IN_BACKGROUND)
listMenu(0)