import React from "react";
import { url } from "../Const";

export default function ViewFileModal({ pdfUrl }) {
  const { onClose } = props;

  return (
    <div>
      <ModalHeader toggle={() => onClose()}>View</ModalHeader>
      <ModalBody>
        <div style={{ height: "750px" }}>
          <Viewer fileUrl={`${url}/${pdfUrl}`} />
        </div>
      </ModalBody>
    </div>
  );
}
