import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import CartItems from '../CartItems';
import { getTotalCartPrice } from '../../utils/Helpers';

const propTypes = {
  onCartClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const CartView = ({ onCartClose, items }) => {
  const totalPrice = getTotalCartPrice(items);
  const footerText = `Total Price : ${totalPrice} €`;
  const titleText = "Items In Cart";
  return (
    <Drawer
      className="CartView"
      width={350}
      placement="right"
      onClose={onCartClose}
      visible
      destroyOnClose
      footerStyle={{ textAlign: 'right' }}
      footer={footerText}
      title={titleText}
    >
      <CartItems
        items={items}
      />
    </Drawer>
  )
}

CartView.propTypes = propTypes;
export default CartView;
