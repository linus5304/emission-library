import { ComponentCPU } from "../components";
import { ComponentRAM } from "../components/ram/ram.class";
import { ComponentSSD } from "../components/ssd/ssd.class";
import { Usage } from "../components/usage/usage.class";

type ImpactUnits = "kgCO2eq" | "MJ" | "kgSbeq";

export type ImpactCategories = "gwp" | "pe" | "adp";

export type ManufactureImpacts = {
  [Category in ImpactCategories]: {
    manufacture: number;
    unit: Category extends "gwp"
      ? "kgCO2eq"
      : Category extends "pe"
      ? "MJ"
      : "kgSbeq";
  };
};

export type UsageImpacts = {
  [Category in ImpactCategories]: {
    usage: number;
    unit: Category extends "gwp"
      ? "kgCO2eq"
      : Category extends "pe"
      ? "MJ"
      : "kgSbeq";
  };
};

export type Impacts = {
  [Category in ImpactCategories]: {
    manufacture: number;
    usage: number;
    unit: Category extends "gwp"
      ? "kgCO2eq"
      : Category extends "pe"
      ? "MJ"
      : "kgSbeq";
  };
};

export type ImpactCategoryManufactureWithUnit<K extends ImpactCategories> = {
  K: {
    manufacture: number;
    unit: K extends "gwp" ? "kgCO2eq" : K extends "pe" ? "MJ" : "kgSbeq";
  };
};

export type ImpactCategoryUsageWithUnit<K extends ImpactCategories> = {
  K: {
    usage: number;
    unit: K extends "gwp" ? "kgCO2eq" : K extends "pe" ? "MJ" : "kgSbeq";
  };
};

export type NumberSignificantFigures = [number, number];

export class WorkloadTime {
  timePercentage: number;
  loadPercentage: number;
}

export type UsageType = {
  monthsUseTime: number;
  daysUseTime: number;
  hoursUseTime: number;

  // Used to calculate allocation ratio in boavizta's code.
  // yearsLifeTime: number;

  hoursElectricalConsumption: number;
  // timeWorkload: number | WorkloadTime[];

  usageLocation: string;
  factors: {
    gwp: {
      value: number;
    };
    pe: {
      value: number;
    };
    adp: {
      value: number;
    };
  };
};

export type ServerInputTypes = {
  cpu: ComponentCPU;
  ram: ComponentRAM;
  ssd: ComponentSSD;
  usage: Usage
};

export type ComponentKeys = keyof ServerInputTypes;
