"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usage = void 0;
class Usage {
    constructor(usage) {
        this._usage = usage;
    }
    computeGwpUsage(withUnits) {
        return this.getUsageImpactFromImpactCategory("gwp", { withUnits: withUnits !== null && withUnits !== void 0 ? withUnits : true });
    }
    computePeUsage(withUnits) {
        return this.getUsageImpactFromImpactCategory("pe", { withUnits: withUnits !== null && withUnits !== void 0 ? withUnits : true });
    }
    computeAdpUsage(withUnits) {
        return this.getUsageImpactFromImpactCategory("adp", { withUnits: withUnits !== null && withUnits !== void 0 ? withUnits : true });
    }
    computeUsage() {
        return this.getUsageImpact();
    }
    getUsageImpactFromImpactCategory(impactCategory, props) {
        if (this._usage) {
            const emissionsFactor = this._usage.factors[impactCategory].value;
            const duration = (30 * 24 * this._usage.monthsUseTime) + (24 * this._usage.daysUseTime) + this._usage.hoursUseTime;
            const usage = emissionsFactor * duration * (this._usage.hoursElectricalConsumption / 1000);
            const unit = impactCategory === "gwp"
                ? "kgCO2eq"
                : impactCategory === "pe"
                    ? "MJ"
                    : "kgSbeq";
            if (!(props === null || props === void 0 ? void 0 : props.withUnits))
                return usage;
            return {
                [impactCategory]: {
                    usage,
                    unit,
                },
            };
        }
        return 0;
    }
    getUsageImpact() {
        const impacts = {
            gwp: {
                usage: this.getUsageImpactFromImpactCategory("gwp"),
                unit: "kgCO2eq",
            },
            pe: {
                usage: this.getUsageImpactFromImpactCategory("pe"),
                unit: "MJ",
            },
            adp: {
                usage: this.getUsageImpactFromImpactCategory("adp"),
                unit: "kgSbeq",
            },
        };
        return impacts;
    }
}
exports.Usage = Usage;
//# sourceMappingURL=usage.class.js.map