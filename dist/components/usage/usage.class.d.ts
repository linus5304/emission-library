import { ImpactCategoryUsageWithUnit, UsageImpacts, UsageType } from "../../configs/types";
export declare class Usage {
    private _usage;
    constructor(usage: UsageType);
    computeGwpUsage(withUnits?: boolean): ImpactCategoryUsageWithUnit<"gwp"> | number;
    computePeUsage(withUnits?: boolean): ImpactCategoryUsageWithUnit<"pe"> | number;
    computeAdpUsage(withUnits?: boolean): ImpactCategoryUsageWithUnit<"adp"> | number;
    computeUsage(): UsageImpacts;
    private getUsageImpactFromImpactCategory;
    private getUsageImpact;
}
