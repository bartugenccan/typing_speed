import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ResultsTable from "./ResultsTable";

interface Props {
  WPM: number;
  timeElapsed: number;
  result: any[];
}

const ResultsModal: React.FC<Props> = ({ result }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result.map(({ WPM, timeElapsed }) => (
            <ResultsTable WPM={WPM} timeElapsed={timeElapsed} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResultsModal;
