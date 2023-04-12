import {
  ServerInputTypes,
  ImpactCategories,
  ImpactCategoryManufactureWithUnit,
  ManufactureImpacts,
  UsageImpacts,
  ImpactCategoryUsageWithUnit,
} from "../../configs/types";
import { Component } from "../main";

export class ComponentServer implements Component {
  private _input: ServerInputTypes;

  constructor({ cpu, ram, ssd, usage }: ServerInputTypes) {
    this._input = {
        cpu,
        ram,
        ssd,
        usage
    };
  }

  computeGwpManufacture(): ImpactCategoryManufactureWithUnit<"gwp"> | number {
    return this.getManufactureImpactFromImpactCategory("gwp", {
      withUnits: true,
    });
  }

  computePeManufacture(): ImpactCategoryManufactureWithUnit<"pe"> | number {
    return this.getManufactureImpactFromImpactCategory("pe", {
      withUnits: true,
    });
  }

  computeAdpManufacture(): ImpactCategoryManufactureWithUnit<"adp"> | number {
    return this.getManufactureImpactFromImpactCategory("adp", {
      withUnits: true,
    });
  }

  computeManufacture(): ManufactureImpacts {
    return this.getServerManufactureImpact();
  }

  computeGwpUsage(): ImpactCategoryUsageWithUnit<"gwp"> | number {
    return this._input.usage.computeGwpUsage();
  }

  computePeUsage(): ImpactCategoryUsageWithUnit<"pe"> | number {
    return this._input.usage.computePeUsage();
  }

  computeAdpUsage(): ImpactCategoryUsageWithUnit<"adp"> | number {
    return this._input.usage.computeAdpUsage()
  }
  
  computeUsage(): UsageImpacts {
    return this._input.usage.computeUsage()
  }

  private getManufactureImpactFromImpactCategory<K extends ImpactCategories>(
    impactCategory: K,
    props?: { withUnits: boolean }
  ): ImpactCategoryManufactureWithUnit<K> | number {
    let manufacture: number = 0;
    if(impactCategory === "gwp") manufacture = (this._input.cpu.computeGwpManufacture(false) as number) + (this._input.ram.computeGwpManufacture(false) as number) + (this._input.ssd.computeGwpManufacture(false) as number) 
    if(impactCategory === "pe") manufacture = (this._input.cpu.computePeManufacture(false) as number) + (this._input.ram.computePeManufacture(false) as number) + (this._input.ssd.computePeManufacture(false) as number)
    if(impactCategory === "adp") manufacture = (this._input.cpu.computeAdpManufacture(false) as number) + (this._input.ram.computeAdpManufacture(false) as number) + (this._input.ssd.computeAdpManufacture(false) as number)
    const unit =
      impactCategory === "gwp"
        ? "kgCO2eq"
        : impactCategory === "pe"
        ? "MJ"
        : "kgSbeq";

    if (!props?.withUnits) return manufacture;
    return {
      [impactCategory]: {
        manufacture,
        unit,
      },
    } as ImpactCategoryManufactureWithUnit<K>;
  }

  private getServerManufactureImpact(): ManufactureImpacts {
    const impacts: ManufactureImpacts = {
      gwp: {
        manufacture: this.getManufactureImpactFromImpactCategory(
          "gwp"
        ) as number,
        unit: "kgCO2eq",
      },
      pe: {
        manufacture: this.getManufactureImpactFromImpactCategory(
          "pe"
        ) as number,
        unit: "MJ",
      },
      adp: {
        manufacture: this.getManufactureImpactFromImpactCategory(
          "adp"
        ) as number,
        unit: "kgSbeq",
      },
    };

    return impacts;
  }
}
