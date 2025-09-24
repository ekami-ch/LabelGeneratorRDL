// Main page with form and label preview
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import JsBarcode from 'jsbarcode';
import { LogisticsLabel } from '~/components/logisticsLabel/_index';

interface LabelData {
  udi: string;
  serialNumber: string;
  expiryDate: string;
  batchNumber: string;
  width: number;
  height: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<LabelData>({
    udi: '33001234567893',
    serialNumber: 'STI*ABCDEFG',
    expiryDate: '2025-12-31',
    batchNumber: 'BATCH-01',
    width: 100,
    height: 70,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const generateLabel = () => {
    // In a real app, this could trigger printing or PDF generation
    console.log('Label generated:', data);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h2>Label Generator</h2>
          <Form>
            <Form.Group className="mb-3" controlId="udi">
              <Form.Label>UDI</Form.Label>
              <Form.Control
                type="text"
                name="udi"
                value={data.udi}
                onChange={handleChange}
                placeholder="Enter UDI (GTIN)"
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="serialNumber">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type="text"
                name="serialNumber"
                value={data.serialNumber}
                onChange={handleChange}
                placeholder="Enter serial number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                value={data.expiryDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="batchNumber">
              <Form.Label>Batch Number</Form.Label>
              <Form.Control
                type="text"
                name="batchNumber"
                value={data.batchNumber}
                onChange={handleChange}
                placeholder="Enter batch number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="width">
              <Form.Label>Label Width (mm)</Form.Label>
              <Form.Control
                type="number"
                name="width"
                value={data.width}
                onChange={handleChange}
                min={50}
                max={300}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="height">
              <Form.Label>Label Height (mm)</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={data.height}
                onChange={handleChange}
                min={30}
                max={200}
              />
            </Form.Group>

            <Button variant="primary" onClick={generateLabel}>
              Generate Label
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Label Preview</h2>

          <LogisticsLabel
            udi={data.udi}
            serialNumber={data.serialNumber}
            expiryDate={data.expiryDate}
            batchNumber={data.batchNumber}
            width={data.width}
            height={data.height}
          />

        </Col>
      </Row>
    </Container>
  );
};

export default Home;
