import axios from "axios";
import { useState } from "react";

import { Modal, Button, Row, Col } from "react-bootstrap";

function LicenseRental() {

    const [clientId, setClientId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rentedLicenseName, setRentedLicenseName] = useState("");

    async function handleRentLicense() {
        try {
            await axios.put("https://localhost:7085/api/License/Rent", { ClientId: clientId })
                .then(result => {
                    setRentedLicenseName(result.data.name);
                })
                setShowModal(true);
        } catch (error) {
            alert(error.response.data);
        }
    }

return (
    <div>
        <br/>
        <Row>
            <Col>
                <input type="text" className="form-control" placeholder="Enter ClientId"
                    value={clientId} onChange={(e) => setClientId(e.target.value)} />
            </Col>
            <Col>
                <Button variant='btn btn-primary' onClick={() => handleRentLicense()}>
                    Rent License</Button>
            </Col>
        </Row>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton />
            <Modal.Body>
                You received License {rentedLicenseName}
            </Modal.Body>
        </Modal>
    </div>
);
}

export default LicenseRental;