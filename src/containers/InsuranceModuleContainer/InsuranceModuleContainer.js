import React from 'react';
import { Row, Col } from 'antd';
import InsuranceModuleCard from '../../components/InsuranceModuleCard';
import { INSURANCE_MODULES_CONFIG } from '../../utils/AppConstants';
import './InsuranceModuleContainer.scss';

const InsuranceModuleContainer = () => {
  const renderInsuranceCards = () => {
    const cards = INSURANCE_MODULES_CONFIG.map((insuranceModule) => {
      const { type, minCover, maxCover, risk } = insuranceModule;
      const title = `${type} Insurance`;
      const insuranceDesc = `You can purchase ${title} for amount starting from ${minCover}€ to ${maxCover}€.`;
      const riskDesc = `This comes with associated risk of ${risk}%`;
      return (
        <Col xs={24} sm={18} md={12} lg={6} key={`Col-${type}`}>
          <InsuranceModuleCard
            key={`InsuranceModuleCard-${type}`}
            type={type}
            title={title}
            description={`${insuranceDesc} ${riskDesc}`}
          />
        </Col>
      )
    })
    return cards;
  }

  return (
    <div className="InsuranceModuleContainer">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {renderInsuranceCards()}
      </Row>
    </div>
  )
}

export default InsuranceModuleContainer;
