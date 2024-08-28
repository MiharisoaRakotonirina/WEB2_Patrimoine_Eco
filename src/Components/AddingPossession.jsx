import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPossession = () => {
  const navigate = useNavigate();
  const [newPossession, setNewPossession] = useState({
    possesseur: "",
    libelle: "",
    valeur: "",
    dateDebut: "",
    dateFin: "",
    tauxAmortissement: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPossession({ ...newPossession, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/possessions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newPossession),
      });

      if (response.ok) {
        navigate("/possession");
      } else {
        console.error("Error creating possession");
      }
    } catch (error) {
      console.error("Error with POST request : ", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add new possession</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="possesseur">
          <Form.Label>Possesseur</Form.Label>
          <Form.Control
            type="text"
            name="possesseur"
            value={newPossession.possesseur}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="libelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            name="libelle"
            value={newPossession.libelle}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="valeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            name="valeur"
            value={newPossession.valeur}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dateDebut">
          <Form.Label>Date de début</Form.Label>
          <Form.Control
            type="date"
            name="dateDebut"
            value={newPossession.dateDebut}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dateFin">
          <Form.Label>Date de fin</Form.Label>
          <Form.Control
            type="date"
            name="dateFin"
            value={newPossession.dateFin}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="tauxAmortissement">
          <Form.Label>Taux d'amortissement</Form.Label>
          <Form.Control
            type="number"
            name="tauxAmortissement"
            value={newPossession.tauxAmortissement}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add possession
        </Button>
      </Form>
    </Container>
  );
};


export default AddPossession;