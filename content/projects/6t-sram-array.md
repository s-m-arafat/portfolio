---
title: "64×8 6T SRAM Array Design and Characterization"
summary: Six-transistor SRAM array in Cadence Virtuoso with precharge, sense amplifier, write driver and row decoder, characterized across PVT corners.
fields: [analog, digital]
order: 30
featured: true
tools: [Cadence Virtuoso, SPICE simulation, PVT corner analysis]
highlights:
  - Designed a 64×8 6T SRAM array with precharge, sense amplifier, write driver and row decoder in Cadence Virtuoso.
  - Characterized static noise margin (SNM), read/write margins and access time across PVT corners.
  - Used the characterization results for SRAM timing modeling.
---
A six-transistor (6T) static random-access memory (SRAM) cell stores a bit in cross-coupled inverters and connects it to complementary bit lines through access transistors. The cell must stay stable while it is read, yet flip readily when it is written, so its transistor sizing balances read stability against writability.

A 64×8 array of these cells was designed in Cadence Virtuoso together with its peripheral circuits. The precharge circuit sets the bit lines before each access, the row decoder selects a word line, the sense amplifier detects the small bit-line swing during a read, and the write driver forces the bit lines to overwrite a cell.

Static noise margin (SNM), read and write margins, and access time were characterized across process, voltage and temperature (PVT) corners, which bound how the array behaves as manufacturing and operating conditions vary. The characterization results were then used for SRAM timing modeling.
