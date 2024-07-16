import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface CarritoComponentProps {
  initialQuantity?: number;
  children: (quantity: number, increment: () => void, decrement: () => void) => JSX.Element;
}

const CarritoComponent: React.FC<CarritoComponentProps> = ({ initialQuantity = 1, children }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return children(quantity, increment, decrement);
};

CarritoComponent.propTypes = {
  initialQuantity: PropTypes.number,
  children: PropTypes.func.isRequired
};

CarritoComponent.defaultProps = {
  initialQuantity: 1
};

export default CarritoComponent;
