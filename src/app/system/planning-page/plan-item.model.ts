export class PlanItem {
    constructor(
        public categoryName: string,
        public categoryCapacity: number,
        public outcome: number,
    ) {}

    getPercent() {
        const p = this.outcome * 100 / this.categoryCapacity;
        return p > 100 ? 100 : p;
    }

    getRemain() {
        return this.categoryCapacity - this.outcome;
    }

    getClass() {
        let p = this.getPercent();
        
        if(p < 60) return 'success';
        if(p < 100) return 'warning';
        return 'danger';
    }
}