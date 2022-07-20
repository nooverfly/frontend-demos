import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const modes = ["out-in", "in-out"];

const SwitchTransitionBasic = () => {
  const [mode, setMode] = useState("out-in");
  const [state, setState] = useState(true);

  return (
    <div style={{ width: 200, margin: "auto" }}>
      <div>Mode:</div>
      <div>
        {modes.map((m) => (
          <Form.Check
            key={m}
            // custom
            inline
            label={m}
            id={`mode=msContentScript${m}`}
            type="radio"
            name="mode"
            checked={mode === m}
            value={m}
            onChange={(event) => {
              setMode(event.target.value);
            }}
          />
        ))}
      </div>
      <div>
        <SwitchTransition>
          <CSSTransition
            // key={state}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="button-container">
              <Button onClick={() => setState((state) => !state)}>
                {state ? "Hello, world!" : "Goodbye, world!"}
              </Button>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default SwitchTransitionBasic;
