---
title: "H-Bridge Motor Driver: Circuit Simulation and PCB Design"
summary: Full H-bridge motor driver with MOSFET switching, PWM speed control and flyback protection, simulated in Proteus and laid out in KiCad.
fields: [embedded]
order: 80
tools: [KiCad, Proteus, PWM, MOSFETs, flyback diodes]
highlights:
  - Schematic of a full H-bridge with MOSFET switching, motor direction control, PWM speed control and flyback protection.
  - "Designed the PCB in KiCad: component selection, net connectivity, routing and design validation."
---
An H-bridge connects a motor between switches arranged in an H shape, so that turning on diagonally opposite switches drives current through the motor in either direction. Switching with pulse-width modulation (PWM) varies the average voltage across the motor and therefore its speed. Because a motor winding is inductive, flyback diodes give its current a path when the switches turn off and protect them from voltage spikes.

The schematic used metal-oxide-semiconductor field-effect transistors (MOSFETs) as the switches, with motor direction control, PWM speed control and flyback protection. The circuit was simulated in Proteus. The printed circuit board (PCB) was then designed in KiCad, covering component selection, net connectivity, routing and design validation.
