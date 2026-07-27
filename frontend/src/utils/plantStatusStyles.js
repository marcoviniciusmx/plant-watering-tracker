const plantStatus = {
    "Aguardando 1ª rega": {
        dot: "#B7BDB4", 
        ring: "rgba(183,189,180,0.18)", 
        bg: "#EFEEE9", 
        text: "#767C72"
    },
    "Em dia": {
        dot: "#4F9A5F", 
        ring: "rgba(79,154,95,0.16)",  
        bg: "#E7F2E5", 
        text: "#337A42"
    },
    "Perto de vencer": {
        dot: "#DDAE3B", 
        ring: "rgba(221,174,59,0.18)", 
        bg: "#FBF1DC", 
        text: "#93701E"
    },
    "Vence hoje": {
        dot: "#E07A3F", 
        ring: "rgba(224,122,63,0.18)", 
        bg: "#FBE9DD", 
        text: "#A34E1E"
    },
    "Vencida": {
        dot: "#C1503F", 
        ring: "rgba(193,80,63,0.18)",  
        bg: "#FBE1DC",
        text: "#96382A"
    }
};

export function getStatusStyle(status) {
    return plantStatus[status]
}