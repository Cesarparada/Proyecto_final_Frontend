import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

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
        className="bg-dark position-relative"
        style={{ minHeight: "240px" }}
      >
        <ToastContainer
          position="top-end"
          className="p-3"
          style={{ zIndex: 1 }}
        >
          {data.map((d) => (
            <Toast data-data-id={d.id} onClick={onChange} key={d.id}>
              {headers.map((titulo, index) => (
                <Toast.Header
                  closeButton={false}
                  data-label={[index]}
                  key={index}
                >
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
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
                <Toast.Body data-label={[index]} key={index}>
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
