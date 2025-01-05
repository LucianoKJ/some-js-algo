function getCombinations(n) {
    const mod = Math.pow(10, 9) + 7
    if (n % 2 === 1) {
        const temp = calculatelargeNum(2, n, mod)
        return calculatelargeNum(temp, (n - 1) / 2, mod)
    } else {
        const temp = calculatelargeNum(2, n / 2, mod)
        return calculatelargeNum(temp, (n - 1), mod)
    }
}

function calculatelargeNum(num, power, mod) {
    let res = 1
    for (let i = 0; i < power; i++) {
        res = res * (num % mod) % mod
    }
    return res
}

const result = getCombinations(5)
console.log(result)
