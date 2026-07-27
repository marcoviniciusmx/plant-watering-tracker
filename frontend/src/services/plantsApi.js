const apiUrl = import.meta.env.VITE_API_URL

export async function getPlants() {
    try {
        const result = await fetch(`${apiUrl}/plants`)

        if (!result.ok) {
            throw new Error(`Erro HTTP! Status: ${result.status}`)
        }

        const data = await result.json()
        return data
    } catch (erro) {
        console.error('Não foi possível realizar a busca:', erro)
    }
}

export async function createPlant(plantData) {
    try {
        const result = await fetch(`${apiUrl}/plants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: plantData.name,
                species: plantData.species,
                watering_interval_days: plantData.watering_interval_days
            })
        })

        if (!result.ok) {
            throw new Error(`Erro ao criar planta! Status: ${result.status}`)
        }

        const createdPlant = await result.json()
        return createdPlant
    } catch (erro) {
        console.error('Falha na criação da planta:', erro)
        throw erro;
    }
}

export async function updatePlant(id, plantData) {
    try {
        const result = await fetch(`${apiUrl}/plants/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: plantData.name,
                species: plantData.species,
                watering_interval_days: plantData.watering_interval_days
            })
        })

        if (!result.ok) {
            throw new Error(`Erro ao editar planta! Status: ${result.status}`)
        }

        const updatedPlant = await result.json()
        return updatedPlant
    } catch (erro) {
        console.error('Falha na edição da planta:', erro)
        throw erro;
    }
}

export async function waterPlant(id, date) {
    try {
        const result = await fetch(`${apiUrl}/plants/${id}/water`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                last_watered_date: date
            })
        })

        if (!result.ok) {
            throw new Error(`Erro ao editar planta! Status: ${result.status}`)
        }

        const updatedPlant = await result.json()
        return updatedPlant
    } catch (erro) {
        console.error('Falha na edição da planta:', erro)
        throw erro;
    }
}

export async function deletePlant(id) {
    try {
        const result = await fetch(`${apiUrl}/plants/${id}`, {
            method: 'DELETE',
        })

        if (!result.ok) {
            throw new Error(`Erro ao editar planta! Status: ${result.status}`)
        }
        
        return result
    } catch (erro) {
        console.error('Falha na edição da planta:', erro)
        throw erro;
    }
}