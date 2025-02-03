import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIComponent = () => {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-500">API Documentation</h3>
      <SwaggerUI url="/swagger.json" />
    </div>
  );
};

export default SwaggerUIComponent;
