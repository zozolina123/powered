const sumElements = (data: number[]) => {
    console.log(data);
    return data.reduce((sum, val) => sum + val, 0);
};

export function getAverage(data: number[]): number {
    return sumElements(data) / data.length;
}

export function getMax(data: number[]): number {
    return Math.max(...data);
}

export function getTotal(data: number[]): number {
    return sumElements(data);
}

export function getTotalCost(data: number[], cost: number): number {
    return sumElements(data) * cost;
}
