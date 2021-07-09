import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { List, Button, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AppDispatchContext } from '../App';
import { DELETE_ITEM_FROM_CART, DISPLAY_INSURANCE_FORM } from '../../utils/AppConstants';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const CartItems = ({ items }) => {
  const dispatch = useContext(AppDispatchContext);

  const onEditClick = (item, index) => {
    const { id, type } = item;
    dispatch({
      type: DISPLAY_INSURANCE_FORM,
      payload: {
        index,
        id,
        type,
      }
    });
  };

  const onDeleteClick = (index) => {
    dispatch({
      type: DELETE_ITEM_FROM_CART,
      payload: {
        index
      },
    });
    message.success('Insurance has been deleted from cart successfully', 5);
  };

  return (
    <List
      size="large"
      bordered
      dataSource={items}
      renderItem={(item, itemIndex) => {
        const { price, coverage, type } = item;
        const titleText = `Price : ${price} €`;
        const descText = `Coverage of ${coverage} € for ${type} Insurance`;
        return (
          <List.Item
            extra={
              [
                <Button
                  className="CartItem__editBtn"
                  icon={<EditOutlined />}
                  shape="round"
                  onClick={() => { onEditClick(item, itemIndex) }}
                />,
                <Button
                  className="CartItem__deleteBtn"
                  icon={<DeleteOutlined />}
                  shape="round"
                  onClick={() => { onDeleteClick(itemIndex) }}
                />
              ]
            }
          >
            <List.Item.Meta
              title={titleText}
              description={descText}>
            </List.Item.Meta>
          </List.Item>
        );
      }}
    />
  );

}

CartItems.propTypes = propTypes;
export default CartItems;
