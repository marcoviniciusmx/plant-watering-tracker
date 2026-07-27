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