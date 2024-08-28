import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());

const readDataFromFile = () => {
    const filePath = path.resolve("../data/data.json");
    const data = fs.readFileSync(filePath);

    return JSON.parse(data);
}


const writeDataToFile = (data) => {
    const filePath = path.resolve("../data/data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/possession", (req, res) => {
    const data = readDataFromFile();

    const patrimoine = data.find(item => item.model === 'Patrimoine');

    if (patrimoine) {
        res.json(patrimoine.data.possessions);
    }
    res.status(404).json({ error: "Patrimony not found" });
})


app.post("/possessions", (req, res) => {
    const newPossession = req.body;

    
    if (!newPossession.libelle || !newPossession.valeur || !newPossession.dateDebut) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Lire les données existantes
    const data = readDataFromFile();
    const patrimoine = data.find(item => item.model === "Patrimoine");

    if (patrimoine) {
        // Ajouter la nouvelle possession
        patrimoine.data.possessions.push(newPossession);
        
        // Écrire les données mises à jour dans le fichier
        writeDataToFile(data);

        res.status(201).json(newPossession); // Renvoie la nouvelle possession créée
    } else {
        res.status(404).json({ error: "Patrimony not found" });
    }
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})