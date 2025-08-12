import React from 'react';

// The HOC: withLogger
const withLogger = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    console.log(WrappedComponent)
    console.log(`Component ${WrappedComponent.displayName || WrappedComponent.name || 'Unknown'} rendered!`);
    return <WrappedComponent {...props} />;
  };

  EnhancedComponent.displayName = `withLogger(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return EnhancedComponent;
};

export default withLogger