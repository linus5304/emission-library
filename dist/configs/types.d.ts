import { ComponentCPU } from "..";
import { ComponentRAM } from "../components/ram/ram.class";
import { ComponentSSD } from "../components/ssd/ssd.class";
import { Usage } from "../components/usage/usage.class";
export declare type ImpactCategories = "gwp" | "pe" | "adp";
export declare type ManufactureImpacts = {
    [Category in ImpactCategories]: {
        manufacture: number;
        unit: Category extends "gwp" ? "kgCO2eq" : Category extends "pe" ? "MJ" : "kgSbeq";
    };
};
export declare type UsageImpacts = {
    [Category in ImpactCategories]: {
        usage: number;
        unit: Category extends "gwp" ? "kgCO2eq" : Category extends "pe" ? "MJ" : "kgSbeq";
    };
};
export declare type Impacts = {
    [Category in ImpactCategories]: {
        manufacture: number;
        usage: number;
        unit: Category extends "gwp" ? "kgCO2eq" : Category extends "pe" ? "MJ" : "kgSbeq";
    };
};
export declare type ImpactCategoryManufactureWithUnit<K extends ImpactCategories> = {
    K: {
        manufacture: number;
        unit: K extends "gwp" ? "kgCO2eq" : K extends "pe" ? "MJ" : "kgSbeq";
    };
};
export declare type ImpactCategoryUsageWithUnit<K extends ImpactCategories> = {
    K: {
        usage: number;
        unit: K extends "gwp" ? "kgCO2eq" : K extends "pe" ? "MJ" : "kgSbeq";
    };
};
export declare type NumberSignificantFigures = [number, number];
export declare class WorkloadTime {
    timePercentage: number;
    loadPercentage: number;
}
export declare type UsageType = {
    monthsUseTime: number;
    daysUseTime: number;
    hoursUseTime: number;
    hoursElectricalConsumption: number;
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
export declare type ServerInputTypes = {
    cpu: ComponentCPU;
    ram: ComponentRAM;
    ssd: ComponentSSD;
    usage: Usage;
};
export declare type ComponentKeys = keyof ServerInputTypes;
