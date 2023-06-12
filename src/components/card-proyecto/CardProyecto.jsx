import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Form from "react-bootstrap/Form";


export default function CardProyecto({
  data,
  headers,
  attributes,
  onChange,
  numero,
}) {
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className=" position-relative"
        style={{ minHeight: "100%" }}
      >
        <ToastContainer
          position="top-start"
          className="p-3 "
          style={{ zIndex: 1 }}
        >
       
          {data.map((d) => (
            <Toast    className="d-inline-block m-1 " data-data-id={d.id} onClick={onChange} key={d.id}>
              {headers.map((titulo, index) => (
                <Toast.Header className="bg-success"
                  closeButton={false}
                  data-label={[index]}
                  key={index}
                >
                  <Form.Check aria-label="option 1"  className="p-1 "  />

                  <strong className="me-auto">
                    {d[titulo] ? d[titulo] : "no definid"}
                  </strong>
                  {numero.map((numero, index) => (
                    <small data-label={[index]} key={index}>
                      nº {d[numero] ? d[numero] : "#"}
                    </small>
                  ))}
                </Toast.Header>
              ))}
              {attributes.map((body, index) => (
                <Toast.Body className="bg-light" data-label={[index]} key={index}>
                  {d[body] ? d[body] : "no definid"}
                </Toast.Body>
              ))}
            </Toast>
          ))}
        </ToastContainer>
      </div>
    </>
  );
}
