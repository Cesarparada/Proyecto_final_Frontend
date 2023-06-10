import React from "react";
import Card from "react-bootstrap/Card";

export default function CardProyecto({
  data,
  headers,
  attributes,
  onChange,
  pagination = null,
}) {
  return (
    <>
      <Card border="warning" style={{ width: "18rem" }}>
        <Card.Header colSpan={headers.length}>
          {headers.map((Title, index) => (
            <Card.Title key={index}>{Title}</Card.Title>
          ))}
        </Card.Header>
        <Card.Body>
          {data.map((d) => (
            <Card.Text scope="row" data-data-id={d.id} onClick={onChange} key={d.id}>
              {attributes.map((attr, index) => (
                <Card.Text data-label={headers[index]} key={index}>
                  {d[attr] ? d[attr] : "No definido"}
                </Card.Text>
              ))}
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}
