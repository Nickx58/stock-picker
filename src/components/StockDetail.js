import React from "react";
import { Card } from 'semantic-ui-react';

const StockDetail = ({stockDetail}) => {
    return(
        <div>
        <Card>
          <Card.Content>Selected Stock Details:
            <Card.Header>{stockDetail.Name}</Card.Header>
            <Card.Meta>{stockDetail.Symbol}</Card.Meta>
            <Card.Description>{stockDetail.Description.slice(0,100)}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>Industry: {stockDetail.industry}</div>
            <div>PE Ratio: {stockDetail.PERatio}</div>
          </Card.Content>
        </Card>
      </div>
    )
}

export default StockDetail;
