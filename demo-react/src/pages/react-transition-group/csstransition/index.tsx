import { Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

const CSSTransitionBasic = () => {
  const [showButton, setShowButton] = useState(true);
  const [showMsg, setShowMsg] = useState(false);

  return (
    <div className="full-content">
      <div style={{ paddingTop: "2rem" }}>
        {showButton && (
          <Button onClick={() => setShowMsg(true)} size="lg">
            Show Message
          </Button>
        )}
        <CSSTransition
          in={showMsg}
          timeout={1000}
          classNames="alert"
          unmountOnExit
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >
          <Alert
            variant="primary"
            dismissible
            onClose={() => setShowMsg(false)}
          >
            <Alert.Heading>Animated alert message</Alert.Heading>
            <p>
              This alert message is being transitioned in and out of the DOM.
            </p>
            <Button onClick={() => setShowMsg(false)}>Close</Button>
          </Alert>
        </CSSTransition>
      </div>
    </div>
  );
};

export default CSSTransitionBasic;
