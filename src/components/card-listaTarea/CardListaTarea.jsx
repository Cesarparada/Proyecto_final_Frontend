import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";

export default function CardListaTarea({
    data,
    headers,
    attributes,
    onChange,
    numero,
}) {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  return (
    <Row>
      <Col md={6} className="mb-2">
        {data.map((d) => (
          <>
            <Button
              onClick={[toggleShowA][onChange]}
              className="mb-2"
              data-data-id={d.id}
              key={d.id}
            >
              Toggle Toast <strong>with</strong> Animation
            </Button>

            <Toast
              show={showA}
              onClose={toggleShowA}
           
            >
              <Toast.Header>
                <Form.Check aria-label="option 1" className="p-1 " />
                {headers.map((titulo, index) => (
                  <strong className="me-auto" data-label={[index]} key={index}>
                  
                    {d[titulo] ? d[titulo] : "no definid"}
                  </strong>
                ))}
                {numero.map((numero, index) => (
                  <small data-label={[index]} key={index}>
                    nº {d[numero] ? d[numero] : "#"}
                  </small>
                ))}
              </Toast.Header>
              {attributes.map((body, index) => (
                <Toast.Body data-label={[index]} key={index}>
                  {d[body] ? d[body] : "no definid"}
                </Toast.Body>
              ))}
            </Toast>
          </>
        ))}
      </Col>
    </Row>
  );
}
