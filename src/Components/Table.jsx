import { Card, Container, Row, Col , Button} from "react-bootstrap";
import data from "../data/data.json";
import { useEffect, useState } from "react";
import CustomizedDatePicker from "./DatePicker";
import Possession from "../models/possessions/Possession";


const PossessionTable = () => {
  const [possessions, setPossessions] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await fetch("http://localhost:5000/possession");
        const data = await response.json();
        setPossessions(data);
      } catch (error) {
        console.error("Error fetching possessions : ", error);
      }
    };

    fetchPossessions();
  }, []);

  const handleClosePossession = async (libelle) => {
    try {
      const response = await fetch(
        `http://localhost:5000/possession/${libelle}/close`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        // Mise à jour de la liste des possessions après fermeture
        setPossessions((prevPossessions) =>
          prevPossessions.map((possession) =>
            possession.libelle === libelle
              ? { ...possession, dateFin: new Date().toISOString() }
              : possession
          )
        );
      } else {
        console.error("Error closing possession");
      }
    } catch (error) {
      console.error("Error with close request: ", error);
    }
  }
  return (
    <Container className="mt-4">
      <Row>
        {possessions.map((possession, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Header className="bg-primary text-white">
                {possession.libelle}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Valeur :</strong> {possession.valeur} Ar
                </Card.Text>
                <Card.Text>
                  <strong>Date de début :</strong>{" "}
                  {new Date(possession.dateDebut).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  <strong>Date de fin :</strong>{" "}
                  {possession.dateFin
                    ? new Date(possession.dateFin).toLocaleDateString()
                    : "N/A"}
                </Card.Text>
                <Card.Text>
                  <strong>Taux d'amortissement :</strong>{" "}
                  {possession.tauxAmortissement || "N/A"}
                </Card.Text>

                <Button
                  variant="secondary"
                  onClick={() => handleClosePossession(possession.libelle)}
                >
                  Close
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <CustomizedDatePicker
        possessions={possessions}
        setTotalValue={setTotalValue}
      />
      <h2 className="my-4 title">Valeur Totale : {totalValue} Ar</h2>
    </Container>
  );
};

export default PossessionTable;
