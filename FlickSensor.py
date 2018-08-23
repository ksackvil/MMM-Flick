#!/usr/bin/env python
import flicklib
import time
import signal
import sys

sleeptime = 0.1
#@flicklib.move()
#def move(x, y, z):
#    print(x, y, z)

@flicklib.flick()
def flick(start, finish):
    if(start == 'west' and finish == 'east'):
        print('right')
    elif(start == 'east' and finish =='west'):
        print('left')
    elif(start == 'south' and finish == 'north'):
        print('up')
    else:
        print('down')
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.airwheel()
def airwheel(delta):
    print("airwheel")
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.double_tap()
def doubletap(position):
    print("double tap" + position)
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.tap()
def tap(position):
    print("tap" + position)
    sys.stdout.flush()
    time.sleep(sleeptime)

@flicklib.touch()
def touch(position):
    print("touch" + position)
    sys.stdout.flush()
    time.sleep(sleeptime)


signal.pause()