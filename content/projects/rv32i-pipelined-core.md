---
title: RV32I Pipelined Core with C++ Reference Model Co-Simulation
summary: Five-stage RISC-V RV32I processor with forwarding and hazard detection, checked instruction by instruction against a self-written C++ simulator.
fields: [digital]
order: 60
featured: true
tools: [RISC-V (RV32I), RTL design, C++, randomized testing]
highlights:
  - Designed a five-stage RV32I processor with forwarding and hazard detection.
  - Verified the core against a self-written C++ instruction-set simulator.
  - Randomized instruction tests with instruction-by-instruction checking.
---
RV32I is the base integer instruction set of the open RISC-V architecture. A pipelined core splits each instruction into stages — fetch, decode, execute, memory access and write-back — so several instructions are in progress at once. When an instruction needs a result that an earlier one has not yet written back, forwarding passes the value along, and hazard detection stalls or flushes the pipeline when forwarding cannot resolve the conflict.

A five-stage RV32I processor was designed at register-transfer level (RTL) with forwarding and hazard detection. It was verified by co-simulation against a self-written C++ instruction-set simulator acting as the reference model. Randomized instruction tests ran on both, with each instruction checked against the reference model, so a mismatch points to the first instruction where the RTL diverged.
