---
title: StrongARM Latch Comparator
summary: Clocked StrongARM latch comparator with an SR-latch output stage, designed in Cadence Virtuoso and characterized for delay and power.
fields: [analog]
order: 20
tools: [Cadence Virtuoso, ADE, SPICE simulation]
highlights:
  - Designed a StrongARM latch comparator with an SR-latch output stage in Cadence Virtuoso.
  - Characterized delay and power.
---
A StrongARM latch is a clocked comparator that turns a small differential input into a full logic-level decision. During reset its internal nodes are precharged; when the clock enables the tail transistor, the input pair draws unequal currents and a cross-coupled inverter pair regenerates that imbalance. It draws current only while evaluating, which is why it is common in data converters and sense circuits.

The comparator was designed at transistor level in Cadence Virtuoso. Because the latch outputs return to their precharge state at every reset, a set-reset (SR) latch output stage follows it to hold each decision until the next evaluation.

Delay and power were characterized in simulation using the Cadence Analog Design Environment (ADE). Delay limits how fast the comparator can be clocked, while power grows with how often it evaluates.
