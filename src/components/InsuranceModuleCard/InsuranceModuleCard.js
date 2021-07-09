import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import { Card, Button } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { AppDispatchContext } from '../App';
import { DISPLAY_INSURANCE_FORM } from '../../utils/AppConstants';

const propTypes = {
  title: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
};

const { Meta } = Card;

const InsuranceModuleCard = ({ title, description, type }) => {
  const dispatch = useContext(AppDispatchContext);

  const onPurchaseClick = (e) => {
    dispatch({
      type: DISPLAY_INSURANCE_FORM,
      payload: {
        type,
      }
    });
  };

  return (
    <Card
      className="InsuranceModuleCard"
      style={{ width: 350 }}
      actions={[
        <Button type="primary"
          className="InsuranceModuleCard__btn"
          icon={<ShoppingOutlined />}
          shape="round"
          onClick={onPurchaseClick}
        >
          Purchase
        </Button>
      ]}
    >
      <Meta
        style={{ minHeight: 140 }}
        title={title}
        description={description}
      />
    </Card>
  )
}

InsuranceModuleCard.propTypes = propTypes;
export default InsuranceModuleCard;
