import React from "react";
import { CSSTransition } from "react-transition-group";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet,
        purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula
        erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel
        porta turpis, ut iaculis justo.
      </p>
    </>
  );
}

function About() {
  return (
    <>
      <h1>About</h1>
      <p>
        Donec sit amet augue at enim sollicitudin porta. Praesent finibus ex
        velit, quis faucibus libero congue et. Quisque convallis eu nisl et
        congue. Vivamus eget augue quis ante malesuada ullamcorper. Sed orci
        nulla, eleifend eget dui faucibus, facilisis aliquet ante. Suspendisse
        sollicitudin nibh lacus, ut bibendum risus elementum a.
      </p>
    </>
  );
}

const TransitionWithRouter = () => {
  return (
    <div>
      <Navbar bg="light">
        <Nav className="mx-auto">
          <Nav.Link
            key="home"
            as={NavLink}
            to="/react-transition-group/with-router"
          >
            Home
          </Nav.Link>
          <Nav.Link
            key="About"
            as={NavLink}
            to="/react-transition-group/with-router/about"
          >
            About
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Routes>
          <Route
            path="/react-transition-group/with-router"
            element={
              <CSSTransition
                in={true}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Home />
                </div>
              </CSSTransition>
            }
          ></Route>
          <Route
            path="/react-transition-group/with-router/about"
            element={
              <CSSTransition
                // in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <About />
                </div>
              </CSSTransition>
            }
          ></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default TransitionWithRouter;
