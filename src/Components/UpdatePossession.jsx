import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdatePossession = () => {
  const navigate = useNavigate();
  const [libelle, setLibelle] = useState("");
  const [dateFin, setDateFin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/possession/${libelle}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ dateFin }),
        }
      );

      if (response.ok) {
        navigate("/possession"); // Retour à la page des possessions après la mise à jour
      } else {
        console.error("Error updating possession");
      }
    } catch (error) {
      console.error("Error with PUT request : ", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Possession</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="libelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="dateFin">
          <Form.Label>Date de fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Possession
        </Button>
      </Form>
    </Container>
  );
};

export default UpdatePossession;
