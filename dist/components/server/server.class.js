"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentServer = void 0;
class ComponentServer {
    constructor({ cpu, ram, ssd, usage }) {
        this._input = {
            cpu,
            ram,
            ssd,
            usage
        };
    }
    computeGwpManufacture() {
        return this.getManufactureImpactFromImpactCategory("gwp", {
            withUnits: true,
        });
    }
    computePeManufacture() {
        return this.getManufactureImpactFromImpactCategory("pe", {
            withUnits: true,
        });
    }
    computeAdpManufacture() {
        return this.getManufactureImpactFromImpactCategory("adp", {
            withUnits: true,
        });
    }
    computeManufacture() {
        return this.getServerManufactureImpact();
    }
    computeGwpUsage() {
        return this._input.usage.computeGwpUsage();
    }
    computePeUsage() {
        return this._input.usage.computePeUsage();
    }
    computeAdpUsage() {
        return this._input.usage.computeAdpUsage();
    }
    computeUsage() {
        return this._input.usage.computeUsage();
    }
    getManufactureImpactFromImpactCategory(impactCategory, props) {
        let manufacture = 0;
        if (impactCategory === "gwp")
            manufacture = this._input.cpu.computeGwpManufacture(false) + this._input.ram.computeGwpManufacture(false) + this._input.ssd.computeGwpManufacture(false);
        if (impactCategory === "pe")
            manufacture = this._input.cpu.computePeManufacture(false) + this._input.ram.computePeManufacture(false) + this._input.ssd.computePeManufacture(false);
        if (impactCategory === "adp")
            manufacture = this._input.cpu.computeAdpManufacture(false) + this._input.ram.computeAdpManufacture(false) + this._input.ssd.computeAdpManufacture(false);
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
    getServerManufactureImpact() {
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
exports.ComponentServer = ComponentServer;
//# sourceMappingURL=server.class.js.map