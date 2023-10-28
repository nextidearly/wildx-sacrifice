import React from "react";
import styled from "styled-components";
import { HelpIcon, Skeleton } from "uikit";
import { useTranslation } from "context/Localization";
import { Tooltip } from "react-tooltip";

const MultiplierWrapper = styled.div`
  color: #ffc412;
  width: 36px;
  text-align: right;
  margin-right: 14px;

  @media screen and (min-width: 968px) {
    text-align: left;
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Multiplier = ({ multiplier }) => {
  const displayMultiplier = multiplier ? (
    multiplier.toLowerCase()
  ) : (
    <Skeleton width={30} />
  );
  return (
    <Container>
      <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
      <HelpIcon
        data-tooltip-id="liquidity-tooltip"
        data-tooltip-content="The Multiplier represents the 
        proportion of WILDX rewards each farm receives"
      />
      <Tooltip id="liquidity-tooltip" />
    </Container>
  );
};

export default Multiplier;
