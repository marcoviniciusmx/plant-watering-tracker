export function formatLastWatered(date) {
    if (date === null) {
        return 'Nunca Regada'
    }

    let lastWatered = new Date(date + "T00:00:00")
    let formatedLastWatered = lastWatered.toLocaleDateString('pt-BR')

    return formatedLastWatered
}