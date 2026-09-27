---
title: AXI4-Lite Slave Verification Environment with SVA Protocol Checks
summary: UVM environment for an AXI4-Lite slave with constrained-random tests, error injection and SVA checks verified against the Vivado AXI Verification IP.
fields: [digital]
order: 50
tools: [SystemVerilog, UVM, SVA, AMD Vivado, AXI VIP]
highlights:
  - Built a UVM environment for an AXI4-Lite slave with constrained-random read/write tests and error injection.
  - Developed SVA checks for handshake stability, response ordering and WSTRB legality.
  - Verified the assertions against the Vivado AXI Verification IP.
---
The Advanced eXtensible Interface (AXI) is an on-chip bus, and AXI4-Lite is its reduced form for simple memory-mapped register access. Each channel transfers data with a VALID/READY handshake: the source raises VALID and holds its signals stable until the destination accepts them with READY. The write strobe (WSTRB) signal marks which bytes of the write data are valid.

A Universal Verification Methodology (UVM) environment was built for an AXI4-Lite slave, running constrained-random read and write tests alongside error injection. Constrained-random tests generate varied transactions within the rules of the protocol, while error injection drives unexpected conditions to exercise how the slave responds.

SystemVerilog Assertions (SVA) checked handshake stability, response ordering and WSTRB legality directly on the bus signals. The assertions were verified against the AXI Verification IP (VIP) in AMD Vivado, a vendor-supplied model of the AXI protocol.
