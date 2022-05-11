import React from "react";

function withLoading(WrappedComponent: any) {
  return function (props: any) {
    return props.isLoading ? <p>Loading</p> : <WrappedComponent />;
  };
}

export default withLoading;
