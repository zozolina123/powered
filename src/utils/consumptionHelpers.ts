const sumElements = (data: number[]) => {
    return data.reduce((sum, val) => sum + val, 0);
};

export function getAverage(data: number[]): number {
    return sumElements(data) / data.length;
}

export function getMax(data: number[]): number {
    return Math.max(...data);
}

export function getMin(data: number[]): number {
    return Math.min(...data);
}

export function getMaxIndex(data: number[]): number {
    return data.indexOf(getMax(data));
}

export function getMinIndex(data: number[]): number {
    return data.indexOf(getMin(data));
}

export function getLoHiComparison(data: number[]): number {
    return (getMin(data) / getMax(data)) * 100;
}

export function getTotal(data: number[]): number {
    return sumElements(data);
}

export function getTotalCost(data: number[], cost: number): number {
    return sumElements(data) * cost;
}
