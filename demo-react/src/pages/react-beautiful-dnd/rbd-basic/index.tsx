import React from "react";
import QuoteApp from "../../../components/rbd/QuoteApp";
import data from "../data";

const RbdBasic = () => {
  return <QuoteApp initial={data.small} />;
};

export default RbdBasic;
