"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentCPU = void 0;
class ComponentCPU {
    constructor({ cores, die_size, die_size_per_core, constants, units = 1 }) {
        this._input = {
            cores,
            die_size,
            die_size_per_core,
            constants,
            units
        };
    }
    computeGwpManufacture(withUnits) {
        return this.getManufactureImpactFromImpactCategory("gwp", { withUnits: withUnits !== null && withUnits !== void 0 ? withUnits : true });
    }
    computePeManufacture(withUnits) {
        return this.getManufactureImpactFromImpactCategory("pe", { withUnits: withUnits !== null && withUnits !== void 0 ? withUnits : true });
    }
    computeAdpManufacture(withUnits) {
        return this.getManufactureImpactFromImpactCategory("adp", { withUnits: withUnits !== null && withUnits !== void 0 ? withUnits : true });
    }
    computeManufacture() {
        return this.getCPUManufactureImpact();
    }
    getManufactureImpactFromImpactCategory(impactCategory, props) {
        const core_impact = this._input.constants.core_impact;
        const die_impact = this._input.constants[impactCategory].die_impact;
        const base_impact = this._input.constants[impactCategory].base_impact;
        const manufacture = ((this._input.cores * this._input.die_size_per_core + core_impact) * die_impact + base_impact) * this._input.units;
        const unit = impactCategory === "gwp"
            ? "kgCO2eq"
            : impactCategory === "pe"
                ? "MJ"
                : "kgSbeq";
        if (!(props === null || props === void 0 ? void 0 : props.withUnits))
            return manufacture;
        return {
            [impactCategory]: {
                manufacture,
                unit,
            },
        };
    }
    getCPUManufactureImpact() {
        const impacts = {
            gwp: {
                manufacture: this.getManufactureImpactFromImpactCategory("gwp"),
                unit: "kgCO2eq",
            },
            pe: {
                manufacture: this.getManufactureImpactFromImpactCategory("pe"),
                unit: "MJ",
            },
            adp: {
                manufacture: this.getManufactureImpactFromImpactCategory("adp"),
                unit: "kgSbeq",
            },
        };
        return impacts;
    }
}
exports.ComponentCPU = ComponentCPU;
//# sourceMappingURL=cpu.class.js.map