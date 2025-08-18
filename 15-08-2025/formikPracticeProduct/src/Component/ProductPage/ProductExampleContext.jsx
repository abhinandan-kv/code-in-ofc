import React, { useContext } from "react";

const ProductExampleContext = () => {
  const { id, title, description, thumbnail } = useContext(CardDataContext);

  console.log(id, title, description);

  return <></>;
};

export default ProductExampleContext;
