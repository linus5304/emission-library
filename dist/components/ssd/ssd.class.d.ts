import { ImpactCategoryManufactureWithUnit, ManufactureImpacts } from "../../configs/types";
import { Component } from "../main";
import { SSDInputType } from "../types";
export declare class ComponentSSD implements Component {
    private _input;
    constructor({ capacity, density, constants, units }: SSDInputType);
    computeGwpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"gwp"> | number;
    computePeManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"pe"> | number;
    computeAdpManufacture(withUnits?: boolean): ImpactCategoryManufactureWithUnit<"adp"> | number;
    computeManufacture(): ManufactureImpacts;
    private getManufactureImpactFromImpactCategory;
    private getRAMManufactureImpact;
}
