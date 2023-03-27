import axios from "axios";
import { useEffect, useState } from "react";

import { Table, Modal, Button, Row, Col } from "react-bootstrap";

function Admin() {

    const [licenses, setLicenses] = useState([]);
    const [licenseName, setLicenseName] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (async () => await LoadLicenses())();
    }, []);

    async function LoadLicenses() {

        const result = await axios.get("https://localhost:7085/api/License");
        setLicenses(result.data);
    }

    async function handleAddLicense() {
        try {
            await axios.post("https://localhost:7085/api/License/Add", { Name: licenseName });
            setShowModal(false)
            alert("Sucessfully Added License");
            await LoadLicenses();
        } catch (error) {
            alert(error.result.data);
        }
    }

    return (
        <div>
            <br></br>
                    <Button className="me-2" variant='primary'
                        onClick={() => setShowModal(true)}>
                        Add License</Button>

                    <Button className="me-2" variant='primary'
                        onClick={() => LoadLicenses()}>
                        Reload Licenses</Button>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th scope="col">License</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                {licenses.map(license =>
                    <tbody key={license.id}>
                        <tr>
                            <td>{license.name}</td>
                            <td>{license.status}</td>
                        </tr>
                    </tbody>
                )
                }
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add License
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter License Name"
                                value={licenseName} onChange={(e) => setLicenseName(e.target.value)} />
                        </Col>
                        <Col>
                            <Button variant='btn btn-primary' onClick={() => handleAddLicense()}>
                                Add License</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Admin;