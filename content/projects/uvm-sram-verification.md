---
title: UVM Verification Environment for a Parameterized Synchronous SRAM
summary: SystemVerilog UVM testbench with driver, monitor, agent, scoreboard and functional coverage for a configurable single-port SRAM with byte enables.
fields: [digital]
order: 40
tools: [SystemVerilog, UVM, functional coverage]
highlights:
  - Built a SystemVerilog UVM testbench with driver, monitor, agent, scoreboard and coverage.
  - "Target: a configurable single-port SRAM with byte enables."
---
The Universal Verification Methodology (UVM) is a SystemVerilog class library and methodology for building reusable, layered testbenches. Stimulus is expressed as transactions that a driver applies to the design, a monitor observes the design interface, and a scoreboard compares observed results with expected ones. Functional coverage records which scenarios the tests have exercised.

The design under test was a parameterized synchronous static random-access memory (SRAM): a configurable single-port memory with byte enables, where each enable controls whether its byte of the data word is written. The SystemVerilog testbench grouped the driver and monitor into an agent, and added a scoreboard and coverage around it.
