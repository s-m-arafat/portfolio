---
title: "2.4 GHz RF Remote-Controlled Car"
summary: Arduino-based car driven over a 2.4 GHz nRF24L01 radio link, with a joystick mapped to motor direction and speed commands.
fields: [embedded]
context: University project
order: 130
tools: [Arduino, ESP32, nRF24L01, SPI, L298N motor driver]
highlights:
  - Implemented 2.4 GHz wireless communication between Arduino boards using nRF24L01 RF transmitter/receiver modules.
  - Interfaced a joystick with the Arduino and mapped its analog inputs to motor direction and speed commands.
---
In a radio-frequency (RF) remote control, a transmitter sends commands from the controller to a receiver on the vehicle. The nRF24L01 is a 2.4 GHz transceiver module that a microcontroller operates over the Serial Peripheral Interface (SPI), a common choice for short-range links between Arduino boards. A motor driver such as the L298N sits between the microcontroller and the motors, because the board pins cannot supply motor current directly.

The car was built as a university project. Wireless communication at 2.4 GHz was implemented between Arduino boards using nRF24L01 transmitter and receiver modules. A joystick was interfaced with the Arduino, and its analog inputs were mapped to motor direction and speed commands.
