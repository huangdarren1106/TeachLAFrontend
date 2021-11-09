import React from "react";
import ReactModal from "react-modal";
import { Container, Row, Col, Button } from "reactstrap";
import * as fetch from "../../../lib/fetch.js";

function ConfirmLeaveModal(props) {
  const [error, setError] = useState("");
  /*
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }
  */

  closeModal = () => {
    if (props.onClose && {}.toString.call(props.onClose) === "[object Function]") {
      props.onClose();
    }
  };

  onLeaveSubmit = () => {
    let data = {
      uid: props.uid,
      cid: props.cid,
    };

    try {
      // Note: leaveClass doesn't currently return anything.
      fetch
        .leaveClass(data)
        .then((res) => {
          if (!res.ok) {
            //this.setState({
            //  error: res.error || "Failed to leave the class, please try again later",
            //});
            setError(res.error || "Failed to leave the class, please try again later");
            return;
          }
          props.removeStudentClass(props.cid);
          props.inClass ? props.unsetClass() : closeModal();
        })
        .catch((err) => {
          setError("Failed to leave the class, please try again later");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }

    // Testing stuff (do this instead of the try-catch block):
    // this.props.removeStudentClass(this.props.cid);
    // this.props.inClass ? this.props.unsetClass() : this.closeModal();
    // end of test stuff

    setError("");
  };

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      className="sketches-modal"
      ariaHideApp={false}
    >
      <Container>
        <h3 className="text-center">
          Are you sure you want to permanently leave the class "{props.className}"?
        </h3>
        <hr />
        <div className="text-center text-danger">{this.state.error || <br />}</div>
        <Row>
          <Col>
            <Button color="secondary" onClick={closeModal} size="lg" block>
              No thanks!
            </Button>
          </Col>
          <Col>
            <Button color="danger" onClick={onLeaveSubmit} size="lg" block>
              Yes, leave.
            </Button>
          </Col>
        </Row>
      </Container>
    </ReactModal>
  );
}

export default ConfirmLeaveModal;
