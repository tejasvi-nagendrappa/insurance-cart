import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Modal, Slider, message } from 'antd';
import { AppDispatchContext } from '../App';
import {
  ADD_ITEM_TO_CART,
  HIDE_INSURANCE_FORM,
  INSURANCE_TYPES,
  UPDATE_ITEM_IN_CART
} from '../../utils/AppConstants';
import { getInsuranceConfigByType } from '../../utils/Helpers';

const propTypes = {
  initialFormValues: PropTypes.shape({}).isRequired,
  index: PropTypes.number,
};

const { Option } = Select;

const InsuranceForm = ({ initialFormValues, index }) => {
  const dispatch = useContext(AppDispatchContext);
  const [form] = Form.useForm();

  const { type, id, price } = initialFormValues;
  const [
    insuranceConfig,
    updateInsuranceConfig,
  ] = useState(getInsuranceConfigByType(type));

  let initialValues = initialFormValues;

  const calculatePrice = (currCov, currRisk) => {
    return (currCov * (currRisk / 100)).toFixed(2);
  };

  const { minCover, maxCover, risk } = insuranceConfig;

  if (!price) {
    initialValues = {
      ...initialFormValues,
      price: calculatePrice(minCover, risk)
    };
  }

  const onCancelClick = () => {
    dispatch({
      type: HIDE_INSURANCE_FORM
    });
  }

  const addOrUpdateCart = (values) => {
    const msgText = id
      ? 'Insurance Details have been updated Sucessfully'
      : 'Insurance Details have been added to cart successfully';

    const actionType = id ? UPDATE_ITEM_IN_CART : ADD_ITEM_TO_CART;
    dispatch({
      type: actionType,
      payload: {
        values,
        index,
        id
      },
    });
    onCancelClick();
    message.success(msgText, 5);
  };

  const onCoverageChange = (currCoverage) => {
    const price = (currCoverage * (risk / 100)).toFixed(2);
    form.setFieldsValue({
      price
    });
  };

  const onInsuranceTypeChange = (currType) => {
    const currInsuranceConfig = getInsuranceConfigByType(currType);
    const { coverage } = form.getFieldsValue();
    if (coverage) {
      const { risk } = currInsuranceConfig;
      const price = (coverage * (risk / 100)).toFixed(2);
      form.setFieldsValue({
        price
      });
    }

    updateInsuranceConfig(currInsuranceConfig);
  };

  const insuranceTypes = Object.values(INSURANCE_TYPES);
  const okButtonText = id ? "Update Cart" : "Add to Cart";
  const midCover = maxCover / 2;
  const marks = {
    [minCover]: `${minCover} €`,
    [midCover]: `${midCover} €`,
    [maxCover]: `${maxCover} €`
  };

  return (
    <Modal
      visible={true}
      title="Insurance Form"
      className="InsuranceForm"
      okText={okButtonText}
      okButtonProps={{
        className: "InsuranceForm__okBtn",
        shape: "round",
      }}
      cancelButtonProps={{
        className: "InsuranceForm__cancelBtn",
        shape: "round",
      }}
      cancelText="Cancel"
      onCancel={onCancelClick}
      centered
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            addOrUpdateCart(values);
          })
          .catch((info) => {
            console.log('Validation Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="Insurance_Form"
        initialValues={initialValues}
      >
        <Form.Item
          name="type"
          label="Type of Insurance"
          rules={[
            {
              required: true,
              message: 'Please select the type of Insurance',
            },
          ]}
        >
          <Select onChange={onInsuranceTypeChange}>
            {
              insuranceTypes.map((currType) => {
                return (
                  <Option value={currType} key={`Option-${currType}`}>
                    {currType}
                  </Option>
                );
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="coverage"
          label="Coverage Amount"
        >
          <Slider
            marks={marks}
            min={minCover}
            max={maxCover}
            onChange={onCoverageChange}
          />
        </Form.Item>
        <Form.Item name="price" label="Calculated Price">
          <Input
            prefix="€"
            suffix="EUR"
            disabled
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

InsuranceForm.propTypes = propTypes;
export default InsuranceForm;
