import { ServerInputTypes, ImpactCategoryManufactureWithUnit, ManufactureImpacts, UsageImpacts, ImpactCategoryUsageWithUnit } from "../../configs/types";
import { Component } from "../main";
export declare class ComponentServer implements Component {
    private _input;
    constructor({ cpu, ram, ssd, usage }: ServerInputTypes);
    computeGwpManufacture(): ImpactCategoryManufactureWithUnit<"gwp"> | number;
    computePeManufacture(): ImpactCategoryManufactureWithUnit<"pe"> | number;
    computeAdpManufacture(): ImpactCategoryManufactureWithUnit<"adp"> | number;
    computeManufacture(): ManufactureImpacts;
    computeGwpUsage(): ImpactCategoryUsageWithUnit<"gwp"> | number;
    computePeUsage(): ImpactCategoryUsageWithUnit<"pe"> | number;
    computeAdpUsage(): ImpactCategoryUsageWithUnit<"adp"> | number;
    computeUsage(): UsageImpacts;
    private getManufactureImpactFromImpactCategory;
    private getServerManufactureImpact;
}
