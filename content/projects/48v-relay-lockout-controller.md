---
title: "48 V Fail-Safe Relay Lockout Controller"
summary: Isolated relay controller with a protected 48 V input front-end that inhibits vehicle operation on an interlock condition, designed in KiCad.
fields: [embedded]
order: 90
tools: [KiCad, Proteus, ESP32-C3-WROOM-02, STM32, PC817 optocouplers, circuit isolation]
highlights:
  - Protected 48 V input front-end driving isolated relay outputs that inhibit vehicle operation on an interlock condition.
  - KiCad schematic and PCB design; Proteus simulation with an ESP32.
---
A lockout controller keeps a vehicle from operating while an interlock condition is present. A fail-safe design is arranged so that a fault leaves the system in its safe state rather than an unsafe one. Optocouplers such as the PC817 pass a signal across an optical gap, which keeps the low-voltage control side electrically isolated from the circuit it switches.

The controller combined a protected 48 V input front-end with isolated relay outputs that inhibit vehicle operation on an interlock condition. The schematic and printed circuit board (PCB) were designed in KiCad, and the circuit was simulated in Proteus with an ESP32.
