import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import ReactModal from 'react-modal';

import {
  Button, Input, InputGroup, InputGroupAddon,
} from 'reactstrap';

import '../../../styles/Modals.scss';

/**
 * ShareSketchModal is a full-screen modal that displays
 * the current program's view-only route, which the user can manually
 * copy or use the "Copy To Clipboard" Button
 * @param {Boolean} showModal modal render state
 * @param {Function} toggleModal function that toggles the modal's render state
 * @param {String} shareUrl the URL to display/copy to clipboard
 */
function ShareSketchModal() {
  const[str, setStr]= useState([{copyStatus: 'Hit "Copy to Clipboard"!'}]);

  const initiateCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        // success
        setStr({ copyStatus: 'Successfully copied!' });
      },
      () => {
        // failed
        setStr({ copyStatus: 'Copy failed. If this keeps on happening, let us know!' });
      },
    );
  };

  return (
    <ReactModal
      className="modal-md"
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={toggleModal}
      ariaHideApp={false}
    >
      <h2 className="text-center">Share This Sketch</h2>
      <InputGroup>
        <Input value={shareUrl} disabled />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={initiateCopy}>
            <FontAwesomeIcon icon={faCopy} />
            {' '}
            Copy to Clipboard
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <hr />
      <p className="text-center">{str.copyStatus}</p> 
    </ReactModal>
  );
}

export default ShareSketchModal;
