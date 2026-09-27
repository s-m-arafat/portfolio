---
title: ATtiny85 External Hardware Watchdog
summary: Bare-metal AVR C watchdog on an ATtiny85 that supervises an ESP32-C3 IoT node through digital heartbeat pulses.
fields: [embedded]
order: 110
tools: [ATtiny85, AVR C, AVR programmer, external interrupts, timers, ESP32-C3]
highlights:
  - External ATtiny85 hardware watchdog that supervises an ESP32-C3 IoT node via digital heartbeat pulses.
  - Bare-metal AVR C firmware with direct register configuration, external hardware interrupts and low-overhead internal timer tracking.
---
A watchdog detects when a processor has stopped running its program correctly. An external hardware watchdog does this from a separate chip, so it keeps working even when the supervised processor has hung. In a heartbeat scheme, the supervised device sends regular pulses, and a missing pulse marks it as unresponsive.

An ATtiny85 was used as an external hardware watchdog for an ESP32-C3 Internet of Things (IoT) node, supervising it through digital heartbeat pulses. Bare-metal firmware runs directly on the microcontroller without an operating system. The watchdog firmware was written in AVR C with direct register configuration, external hardware interrupts and low-overhead tracking with an internal timer.
