---
title: "Sv32 Address Translation Unit: Synthesis and Place-and-Route"
summary: Sv32 page-table walker with a 16-entry TLB and AXI-based PTE fetching, taken through Cadence Genus synthesis and Innovus place-and-route.
fields: [digital]
order: 70
tools: [RTL design, Cadence Genus, Cadence Innovus, AXI]
highlights:
  - Designed a two-level Sv32 page-table walker with a 16-entry fully associative TLB, permission checks, fault handling and AXI-based PTE fetching.
  - Took the design through Cadence Genus and Innovus, including floorplanning, clock-tree synthesis and routing.
  - Analyzed frequency, area and power.
---
Sv32 is the RISC-V virtual-memory scheme that maps virtual addresses to physical addresses through a two-level page table. A page-table walker reads page-table entries (PTEs) level by level to find a mapping, and a translation lookaside buffer (TLB) caches recent translations so repeated lookups can skip the walk. Permission bits in each entry decide whether a read, write or execute access is allowed.

The unit was designed at register-transfer level (RTL) as a two-level Sv32 page-table walker with a 16-entry fully associative TLB, in which any entry can hold any translation. It included permission checks, fault handling and PTE fetching over the Advanced eXtensible Interface (AXI) bus.

The design was taken through Cadence Genus for logic synthesis and Cadence Innovus for physical design, including floorplanning, clock-tree synthesis and routing. Clock-tree synthesis builds the network that delivers the clock to every register with balanced delay. Frequency, area and power were then analyzed.
