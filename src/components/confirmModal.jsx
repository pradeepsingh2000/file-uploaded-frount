import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

const ConfirmModal = props => {
  const {
    isOpen,
    onClose,
    confirmText,
    message,
    handleConfirm,
    cancleBtnTxt,
    customIcon,
    titleTxt
  } = props;
  var confirmBtnText = confirmText || "Yes, delete it!";
  var custom = customIcon ? true : false;

  return (
    <div>
      <SweetAlert
        warning={!customIcon}
        custom={custom}
        showCancel
        show={isOpen}
        confirmBtnText={confirmBtnText}
        confirmBtnBsStyle="secondary btn-sm confirmBtn"
        cancelBtnBsStyle="success btn-sm confirmBtn"
        title={titleTxt ? titleTxt : ""}
        customIcon={customIcon}
        onConfirm={() => {
          handleConfirm();
        }}
        onCancel={onClose}
        cancelBtnText={cancleBtnTxt ? cancleBtnTxt : "Cancel"}
      >
        {message}
      </SweetAlert>
    </div>
  );
};
export default ConfirmModal;
