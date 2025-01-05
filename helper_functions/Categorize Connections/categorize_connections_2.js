function categorizePods(connections) {
    const regionSet = new Set()
    const regionPodMap = new Map()
    connections.forEach(([pod1, pod2]) => {
        const region1 = regionPodMap.get(pod1)
        const region2 = regionPodMap.get(pod2)
        if (!region1 && !region2) {
            const newRegion = new Set([pod1, pod2])
            regionSet.add(newRegion)
            regionPodMap.set(pod1, newRegion)
            regionPodMap.set(pod2, newRegion)
        } else if (!region1) {
            region2.add(pod1)
            regionPodMap.set(pod1, region2)
        } else if (!region2) {
            region1.add(pod2)
            regionPodMap.set(pod2, region1)
        } else if (region1 !== region2) {
            const bigRegion = region1.size >= region2.size ? region1 : region2
            const smallRegion = region1 !== bigRegion ? region1 : region2
            smallRegion.forEach((pod) => {
                bigRegion.add(pod)
                regionPodMap.set(pod, bigRegion)
            })
            regionSet.delete(smallRegion)
        }
    })
    return [...regionSet].map((region) => [...region].sort((a, b) => a - b))
}