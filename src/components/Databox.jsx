// experimental.  Not being used for anything right now

import styled from "styled-components";
import * as React from "react";
import Box from "@mui/material/Box";

const DataBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 5vh;
  position: relative;
`;

const StyledOuterBox = styled(Box)`
  //border-radius: 20px;
  position: absolute;
`;

const StyledInnerBox = styled(Box)`
  border-radius: 10px;
  position: relative;
  bottom: 50px;
  
`;

const StyledData = styled.p`
  color: black;
  align-self: flex-start;
  position: absolute;
  bottom: 30px;
  margin-inline-start: 20px;
`;

export default function DataBox() {
  return (
    <DataBoxContainer>
      <StyledOuterBox
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "gray"
        }}
      >
        <StyledData>test</StyledData>
      </StyledOuterBox>
      <StyledInnerBox
        sx={{
          width: 480,
          height: 200,
          backgroundColor: "white"
        }}
      />
    </DataBoxContainer>
  );
}
