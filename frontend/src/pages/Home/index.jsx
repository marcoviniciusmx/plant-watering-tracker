import { Backdrop, Brand, CancelButton, Card, CardActions, CardHeader, CardMeta, Dialog, DialogActions, DialogTitle, Divider, FieldsWrapper, Header, IconBox, IconButton, Input, Label, LastWatered, Main, MainWrapper, NewPlantButton, PlantInfo, PlantName, PlantsGrid, PlantSpecies, StatusDot, StatusTag, SubmitButton, WaterButton } from "./styles"
import { useState, useEffect } from 'react'
import { getPlants, createPlant } from '../../services/plantsApi.js'
import { getStatusStyle } from '../../utils/plantStatusStyles.js'
import { formatLastWatered } from '../../utils/formatDate.js'

function Home() {
    const [plants, setPlants] = useState([])
    const [modal, setModal] = useState(null)
    const [formData, setFormData] = useState({ name: '', species: '', watering_interval_days: '' })

    async function fetchPlants() {
        const data = await getPlants()
        setPlants(data)
    }

    useEffect(() => {

        fetchPlants()
    }, [])

    return (
        <>
            <Header>
                <IconBox>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4E7A56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69s-5 5.86-7.07 9.06A6 6 0 0 0 12 21.5a6 6 0 0 0 7.07-9.75C16.93 8.55 12 2.69 12 2.69Z" /></svg>
                </IconBox>
                <Brand>Regador de Plantas</Brand>
                <NewPlantButton onClick={() => setModal({ type: 'register' })}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    Nova Planta
                </NewPlantButton>
            </Header>

            <Main>
                <MainWrapper>
                    <h1 style={{ margin: '0 0 6px' }}>Minhas Plantas</h1>
                    <p>{plants.length} {plants.length === 1 ? 'planta' : 'plantas'}</p>
                </MainWrapper>
                {plants.length > 0 ?
                    <PlantsGrid>
                        {plants.map((plant) => {
                            const style = getStatusStyle(plant.status);

                            return (
                                <Card key={plant.id}>
                                    <CardHeader>
                                        <PlantInfo>
                                            <StatusDot $color={style.dot} $ring={style.ring} />
                                            <div>
                                                <PlantName>{plant.name}</PlantName>
                                                <PlantSpecies>{plant.species}</PlantSpecies>
                                            </div>
                                        </PlantInfo>

                                        <CardActions>
                                            <IconButton aria-label="Excluir planta">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                            </IconButton>
                                            <IconButton aria-label="Editar planta">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                            </IconButton>
                                        </CardActions>
                                    </CardHeader>

                                    <Divider />

                                    <CardMeta>
                                        <div>A cada {plant.watering_interval_days} dias</div>
                                        <LastWatered>Última rega: {formatLastWatered(plant.last_watered_date)}</LastWatered>
                                    </CardMeta>

                                    <StatusTag $bg={style.bg} $text={style.text}>{plant.status}</StatusTag>

                                    <WaterButton>Regar agora</WaterButton>
                                </Card>
                            )
                        })}
                    </PlantsGrid> :
                    <Card>Nenhuma planta cadastrada ainda</Card>
                }
            </Main>

            {modal?.type === 'register' && (
                <Backdrop>
                    <Dialog>
                        <DialogTitle>Nova planta</DialogTitle>
                        <form onSubmit={async (e) => {
                            e.preventDefault()
                            const created = await createPlant(formData)
                            await fetchPlants()
                            setModal(null)
                            setFormData({ name: '', species: '', watering_interval_days: '' })
                        }}>
                            <FieldsWrapper>
                                <div>
                                    <Label htmlFor="reg-name">Nome</Label>
                                    <Input id="reg-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>

                                <div>
                                    <Label htmlFor="reg-species">Espécie</Label>
                                    <Input id="reg-species" value={formData.species} onChange={(e) => setFormData({ ...formData, species: e.target.value })} required />
                                </div>

                                <div>
                                    <Label htmlFor="reg-interval">Intervalo</Label>
                                    <Input type="number" min="1" id="reg-interval" value={formData.watering_interval_days} onChange={(e) => setFormData({ ...formData, watering_interval_days: e.target.value })} required />
                                </div>
                            </FieldsWrapper>
                            <DialogActions>
                                <CancelButton onClick={() => { setModal(null) }} type="button">Cancelar</CancelButton>
                                <SubmitButton type="submit">Adicionar planta</SubmitButton>
                            </DialogActions>
                        </form>
                    </Dialog>
                </Backdrop>
            )}

        </>
    )
}

export default Home
