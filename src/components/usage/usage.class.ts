import { ImpactCategories, ImpactCategoryUsageWithUnit, UsageImpacts, UsageType } from "../../configs/types";

export class Usage {
    private _usage: UsageType

    constructor(usage: UsageType){
        this._usage = usage 
    }

  computeGwpUsage(withUnits?: boolean): ImpactCategoryUsageWithUnit<"gwp"> | number {
    return this.getUsageImpactFromImpactCategory("gwp", { withUnits: withUnits ?? true })
  }

  computePeUsage(withUnits?: boolean): ImpactCategoryUsageWithUnit<"pe"> | number {
    return this.getUsageImpactFromImpactCategory("pe", { withUnits: withUnits ?? true })
  }

  computeAdpUsage(withUnits?: boolean): ImpactCategoryUsageWithUnit<"adp"> | number {
    return this.getUsageImpactFromImpactCategory("adp", { withUnits: withUnits ?? true })
  }

  computeUsage(): UsageImpacts {
    return this.getUsageImpact();
  }



  private getUsageImpactFromImpactCategory<K extends ImpactCategories>(
    impactCategory: K,
    props?: { withUnits: boolean }
  ): ImpactCategoryUsageWithUnit<K> | number {
    if (this._usage) {
      const emissionsFactor = this._usage.factors[impactCategory].value;
      const duration = (30 * 24 * this._usage.monthsUseTime) + (24 * this._usage.daysUseTime) + this._usage.hoursUseTime; // considering month to be 28 days. I think calculation will be better with year consideration
      const usage = emissionsFactor * duration * (this._usage.hoursElectricalConsumption / 1000);
      const unit =
        impactCategory === "gwp"
          ? "kgCO2eq"
          : impactCategory === "pe"
          ? "MJ"
          : "kgSbeq";

      if (!props?.withUnits) return usage;
      return {
        [impactCategory]: {
          usage,
          unit,
        },
      } as ImpactCategoryUsageWithUnit<K>;
    }
    return 0;
  }

  private getUsageImpact(): UsageImpacts {
    const impacts: UsageImpacts = {
      gwp: {
        usage: this.getUsageImpactFromImpactCategory("gwp") as number,
        unit: "kgCO2eq",
      },
      pe: {
        usage: this.getUsageImpactFromImpactCategory("pe") as number,
        unit: "MJ",
      },
      adp: {
        usage: this.getUsageImpactFromImpactCategory("adp") as number,
        unit: "kgSbeq",
      },
    };

    return impacts;
  }
}