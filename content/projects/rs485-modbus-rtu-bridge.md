---
title: Half-Duplex RS-485 to UART Bridge with Modbus RTU
summary: MAX485-based bridge between a UART and a half-duplex RS-485 bus, sending hand-built Modbus RTU FC03 requests without a protocol library.
fields: [embedded]
order: 100
tools: [MAX485, UART, RS-485, Modbus RTU]
highlights:
  - MAX485 transceiver with explicit DE/RE control and hand-built FC03 request frames — no protocol library.
  - Full hex TX/RX tracing to validate slave responses and timing against a Modbus master.
---
RS-485 is a differential serial bus used in industrial wiring. In half-duplex form all devices share the same wires, so each node enables its driver only while it transmits. A transceiver such as the MAX485 converts between the logic-level signals of a universal asynchronous receiver-transmitter (UART) and the bus, with driver enable (DE) and receiver enable (RE) pins that select the direction.

Modbus RTU (Remote Terminal Unit) is a master–slave protocol that exchanges requests and responses as compact binary frames; FC03 is the function code that reads holding registers. The bridge drove the MAX485 DE/RE pins explicitly and built FC03 request frames by hand, without a protocol library. Transmitted and received data was traced in full as hex to validate slave responses and timing against a Modbus master.
