export function calculateStatus(lastWateredDate, wateringIntervalDays) {

    if (lastWateredDate === null) {
        return 'Aguardando 1ª rega'
    }

    let nextWatering = new Date(lastWateredDate)
    nextWatering.setUTCDate(nextWatering.getUTCDate() + wateringIntervalDays)

    let today = new Date(new Date().toISOString().slice(0, 10))

    let pendingDays = (nextWatering - today) / 86400000

    if (pendingDays > 2) {
        return 'Em dia'
    } else if (pendingDays === 2 || pendingDays === 1) {
        return 'Perto de vencer'
    } else if (pendingDays === 0) {
        return 'Vence hoje'
    } else {
        return 'Vencida'
    }
}