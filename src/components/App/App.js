import React, { useReducer, useState } from 'react';
import {
  Layout, Button, Badge, PageHeader
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import reducer from './reducer';
import { getDataFromLocalStorage } from '../../utils/Helpers';
import CartView from '../CartView';
import InsuranceModuleContainer from '../../containers/InsuranceModuleContainer';
import InsuranceForm from '../InsuranceForm';
import './App.scss';

const { Content } = Layout;

const initialState = {
  data: getDataFromLocalStorage(),
  formControls: {
    displayForm: false,
  },
};

const AppDispatchContext = React.createContext(null);

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const {
    data: itemsInCart,
    formControls: {
      displayForm,
      type,
      id = null,
      index,
    }
  } = appState;

  const numOfItemsInCart = itemsInCart.length;
  const [showCart, toggleCartDisplay] = useState(false);

  let initialFormValues = { type };

  if (index >= 0 && id) {
    initialFormValues = { ...itemsInCart[index] };
  }

  const onCartButtonClick = () => {
    toggleCartDisplay(prevState => !prevState);
  };

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <Layout>
        <PageHeader
          className="App__pageheader"
          title="Insurance Shop"
          ghost={false}
          backIcon={false}
          extra={[
            <Badge count={numOfItemsInCart} key="Cart_Badge">
              <Button
                className="App__pageheader_btn"
                type="primary"
                shape="round"
                value="CartButton"
                icon={<ShoppingCartOutlined />}
                onClick={onCartButtonClick}
                disabled={numOfItemsInCart === 0}
              />
            </Badge>
          ]}
        />
        <Content
          className="App__content"
          style={{
            margin: '24px 16px'
          }}
        >
          {
            showCart &&
            <CartView
              items={itemsInCart}
              onCartClose={onCartButtonClick}
            />
          }
          {
            displayForm &&
            <InsuranceForm
              type={type}
              id={id}
              index={index}
              initialFormValues={initialFormValues}
            />
          }
          <InsuranceModuleContainer />
        </Content>
      </Layout>
    </AppDispatchContext.Provider>
  )
}

export {
  App,
  AppDispatchContext
};
