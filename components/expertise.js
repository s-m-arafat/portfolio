import React from "react";
import Badge from "@/components/ui/badge";
import { MemoryStick, Cpu, Microchip, BrainCog, Brain } from "lucide-react";
export default function Expertise() {
  return (
    <div className="flex flex-wrap gap-1 md:gap-3 justify-start mt-5 text-xs md:text-sm lg:space-y-0">
      <Badge>
        <BrainCog size={20} className="inline mr-2" />
        Machine Learning
      </Badge>
      <Badge>
        <Microchip size={20} className="inline mr-2" />
        VLSI
      </Badge>
      <Badge>
        <MemoryStick size={20} className="inline mr-2" />
        FPGA
      </Badge>
      <Badge>
        <Cpu size={20} className="inline mr-2" />
        RISC-V
      </Badge>
    </div>
  );
}
