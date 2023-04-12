import { ImpactCategoryManufactureWithUnit, ManufactureImpacts } from "../../configs/types";
import { Component } from "../main";
import { CPUInputType } from "../types";
export declare class ComponentCPU implements Component {
    private _input;
    constructor({ cores, die_size, die_size_per_core, constants, units }: CPUInputType);
    computeGwpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"gwp"> | number;
    computePeManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"pe"> | number;
    computeAdpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"adp"> | number;
    computeManufacture(): ManufactureImpacts;
    private getManufactureImpactFromImpactCategory;
    private getCPUManufactureImpact;
}
