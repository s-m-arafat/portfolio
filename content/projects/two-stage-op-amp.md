---
title: Two-Stage Miller-Compensated Op-Amp
summary: Transistor-level two-stage op-amp with Miller compensation and current-mirror biasing, designed and simulated in Cadence Virtuoso.
fields: [analog]
order: 10
tools: [Cadence Virtuoso, ADE, SPICE simulation]
highlights:
  - Designed a two-stage op-amp with Miller compensation and current-mirror biasing in Cadence Virtuoso.
  - Simulated gain, phase margin and slew rate.
---
A two-stage operational amplifier pairs a high-gain differential input stage with a common-source second stage that provides output swing. Because the second stage adds a pole close to the first, a Miller compensation capacitor across it splits the poles and keeps the amplifier stable in feedback.

The amplifier was designed at transistor level in Cadence Virtuoso, with current mirrors setting the bias currents of both stages. Simulations covered open-loop gain, phase margin and slew rate — the figures that trade against each other when sizing the compensation capacitor and bias currents.
