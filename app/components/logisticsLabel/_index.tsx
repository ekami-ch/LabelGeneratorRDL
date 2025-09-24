import React, { useRef, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import JsBarcode from 'jsbarcode';
import bwipjs from 'bwip-js';


interface LabelProps {
  udi: string;
  serialNumber: string;
  expiryDate: string;
  batchNumber: string;
  width: number;  // in mm
  height: number; // in mm
}

export const LogisticsLabel: React.FC<LabelProps> = ({
  udi,
  serialNumber,
  expiryDate,
  batchNumber,
  width,
  height,
}) => {
  const barcodeRef = useRef<SVGSVGElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const datamatrixRef = useRef<HTMLCanvasElement>(null);

  const [dmError, setDmError] = useState<string | null>(null);
  const [gs1Date, setGs1Date] = useState<string>('');

  const data = { udi, serialNumber, expiryDate, batchNumber, width, height };

  useEffect(() => {
    if (data.serialNumber && barcodeRef.current) {
      JsBarcode(barcodeRef.current, data.serialNumber, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 40,
        fontSize: 16,
      });
    }

    if (data.udi && data.serialNumber && data.batchNumber && data.expiryDate && datamatrixRef.current) {
      setGs1Date(new Date(data.expiryDate).toISOString().slice(2, 10).replace(/-/g, ''));
      const content = `(01)${data.udi}(21)${data.serialNumber}(10)${data.batchNumber}(17)${gs1Date}`;

      try {
        setDmError(null);
        bwipjs.toCanvas(datamatrixRef.current, {
          bcid: 'gs1datamatrix',     // Barcode type
          text: content,             // Data to encode
          scale: 3,                  // Scaling factor
          height: 10,                // Bar height in mm
          width: 10,                 // Bar width in mm
          includetext: false,        // Show human-readable text
          textxalign: 'center',      // Always good to set this
        });
      } catch (error: any) {
        setDmError(error.message || 'Error generating Data Matrix code');
        console.error(error);
      }
    }

  }, [data.serialNumber, data.udi, data.batchNumber, data.expiryDate]);

  return (
    <>
      {dmError && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          DataMatrix Error: {dmError}
        </div>
      )}
      <Card
        ref={labelRef}
        style={{
          width: `${data.width}mm`,
          height: `${data.height}mm`,
          padding: '10px',
          border: '1px solid #000',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <img src="/UDI.svg" alt="Unique Device Identifier Icon" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                {data.udi}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <img src="/SN.svg" alt="Serial Number Icon" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                {data.serialNumber}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <img src="/EXPIRY.svg" alt="Expiry Date Icon" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                {data.expiryDate}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <img src="/LOT.svg" alt="Batch Number Icon" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                {data.batchNumber}
              </div>
            </div>
            <div style={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <canvas ref={datamatrixRef} style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '0.9em', textAlign: 'right', width: '100%', justifyContent: 'flex-end' }}>
            {`(01)${data.udi}(21)${data.serialNumber}`}
            <br/>
            {`(10)${data.batchNumber}(17)${gs1Date}`}
          </div>
          <svg ref={barcodeRef} style={{ width: '100%', height: 'auto' }} />
        </div>
      </Card>
    </>
  );
};
