import { styled } from 'styled-components'

export const Header = styled.header`
   display: flex;
   align-items: center;
   gap: 12px;
   padding: 28px 40px; 
   max-width: 1100px;
   width: 100%;
   margin: 0 auto;
`

export const IconBox = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #E7F0E4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`

export const Brand = styled.span`
    font-size: 20px;
    font-weight: 700;
`

export const NewPlantButton = styled.button`
    background: #4E7A56;
    color: #FFFFFF;
    border: none;
    border-radius: 14px;
    padding: 12px 20px;
    cursor: pointer;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover{
        
        background: #4d925a;
    }

    &:active {
        transform: scale(0.95);
        background: #69c27a;
    }
`

export const Main = styled.main`
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 12px 40px 64px;
    flex: 1;
`

export const MainWrapper = styled.section`
    margin-bottom: 32px;
`

export const PlantsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 22px;
`

export const Card = styled.div`
    background: #FFFFFF; 
    border-radius: 22px; 
    padding: 22px; 
    box-shadow: 0 6px 20px rgba(46,59,49,0.07); 
    display: flex; 
    flex-direction: column; 
    gap: 16px;
`

export const CardHeader = styled.div`
    display: flex; 
    align-items: flex-start; 
    justify-content: space-between; 
    gap: 10px;
`

export const PlantInfo = styled.div`
    display: flex; 
    align-items: center; 
    gap: 10px; 
    min-width: 0;
`

export const PlantName = styled.div`
    font-size: 17px; 
    font-weight: 700; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
`

export const PlantSpecies = styled.div`
    font-size: 13px; 
    font-style: italic; 
    color: #8A968B; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
`

export const CardActions = styled.div`
    display: flex; 
    gap: 2px; 
    flex-shrink: 0;
`

export const IconButton = styled.button`
    width: 32px; 
    height: 32px; 
    border-radius: 10px; 
    border: none; 
    background: transparent; 
    color: #8A968B; 
    cursor: pointer; 
    display: flex; 
    align-items: center; 
    justify-content: center; 

    &:hover {
        background: #F1EEE5;
    }
`

export const Divider = styled.div`
    height: 1px; 
    background: #F0ECE2;
`

export const CardMeta = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: 4px; 
    font-size: 13.5px; 
    color: #5C6B5E;
`

export const LastWatered = styled.div`
    color: #92998F;
`

export const WaterButton = styled.button`
    display: flex; 
    align-items: center; 
    justify-content: center; 
    gap: 8px; 
    background: #EDF4EB; 
    color: #3F6647; 
    border: none; 
    border-radius: 14px; 
    padding: 11px 16px; 
    font-family: inherit; 
    font-size: 14.5px; 
    font-weight: 700; 
    cursor: pointer;

    &:hover {
        background: #DFEBDA;
    }
`

export const StatusDot = styled.span`
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => props.$color};
    box-shadow: 0 0 0 4px ${(props) => props.$ring};
    flex-shrink: 0;
`

export const StatusTag = styled.span`
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    align-self: flex-start;
    background: ${(props) => props.$bg};
    color: ${(props) => props.$text};
`

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(46,59,49,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 50;
`

export const Dialog = styled.div`
    background: #FFFDF9;
    border-radius: 24px;
    padding: 32px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 50px rgba(46,59,49,0.25);
    box-sizing: border-box;
`

export const DialogTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`

export const FieldsWrapper = styled.div`
    display: grid;
    gap: 16px;
`

export const Label = styled.label`
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #5C6B5E;
    margin-bottom: 6px;
`

export const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid #E7E1D3;
    border-radius: 12px;
    padding: 11px 14px;
    font-family: inherit;
    font-size: 14.5px;
    background: #FFFFFF;
`

export const DialogActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
`

export const CancelButton = styled.button`
    background: transparent;
    border: none;
    color: #6E7D70;
    font-family: inherit;
    font-size: 14.5px;
    font-weight: 600;
    padding: 11px 16px;
    border-radius: 12px;
    cursor: pointer;
`

export const SubmitButton = styled.button`
    background: #4E7A56;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 11px 20px;
    font-family: inherit;
    font-size: 14.5px;
    font-weight: 700;
    cursor: pointer;
`

export const DialogText = styled.p`
    margin: 0 0 24px;
    color: #6E7D70;
    font-size: 14.5px;
`

export const DangerButton = styled.button`
    background: #C1503F;
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 11px 20px;
    font-family: inherit;
    font-size: 14.5px;
    font-weight: 700;
    cursor: pointer;
`