export function getAverage(data: number[]): number {
    try {
        const sum = data.reduce((sum, val) => sum + val);
        const average = sum / data.length;
        return average;
    } catch (e) {
        return 0;
    }
}

export function getMax(data: number[]): number {
    try {
        const max = Math.max(...data);
        return max;
    } catch (e) {
        return 0;
    }
}

export function getTotal(data: number[]): number {
    try {
        const sum = data.reduce((sum, val) => sum + val);
        return sum;
    } catch (e) {
        return 0;
    }
}

export function getTotalCost(data: number[], cost: number): number {
    try {
        const sum = data.reduce((sum, val) => sum + val);
        const totalCost = sum * cost;
        return totalCost;
    } catch (e) {
        return 0;
    }
}
