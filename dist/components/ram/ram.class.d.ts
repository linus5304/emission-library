import { ImpactCategoryManufactureWithUnit, ManufactureImpacts } from "../../configs/types";
import { Component } from "../main";
import { RAMInputType } from "../types";
export declare class ComponentRAM implements Component {
    private _input;
    constructor({ capacity, density, constants, units }: RAMInputType);
    computeGwpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"gwp"> | number;
    computePeManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"pe"> | number;
    computeAdpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"adp"> | number;
    computeManufacture(): ManufactureImpacts;
    private getManufactureImpactFromImpactCategory;
    private getRAMManufactureImpact;
}
