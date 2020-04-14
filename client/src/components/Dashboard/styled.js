import styled, { css } from 'styled-components/macro'

import * as S from '../../styled'

export const PageContainer = styled.main`
  :not(svg) {
    transform-origin: 0px 0px;
  }
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Roboto';
  background-color: #708090;
  background-size: 64px 128px;

  .chart {
    font: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
  }
`

export const Container = styled(S.Container)`
  max-width: 1000px;
`

export const ChartTitle = styled.div`
  text-align: center;
  font-size: 2.5em;
  position: absolute;
  display: flex;
  align-items: flex-start;
  margin-top: 12.5%;
  justify-content: center;
  width: 100%;
  height: 100%;
`
export const Graphic = styled.div`
  // top: 6em;
  width: calc(100% - 40px);
  margin: 20px;
  height: 480px;
`

const axesFlattenableCss = css`
  #Y path {
    stroke: black;
    stroke-width: 1;
    fill: none;
  }
  #X path {
    stroke: black;
    stroke-width: 1;
    fill: none;
  }
`

export const GRPsChartWrapper = styled.div`
  height: 560px;
  width: 900px;
  background-color: #fff;
  padding: 20px 20px 20px 20px;
  align-self: center;

  ${axesFlattenableCss};

  @media (min-width: 1000px) {
    box-shadow: 2px 2px 20px;
    width: 50%;
    display: flex;
    margin-left: 25%;
    margin-top: 9%;
  }
`

export const ChartTooltip = styled.div`
  text-align: center;
  width: 150px;
  height: 50px;
  padding: 2px;
  font: 12px;
  background: lightsteelblue;
  box-shadow: 1px 1px 10px;
  border-radius: 2px;
  pointer-events: none;
`

export const Overlay = styled.div`
  background: #fff;
  pointer-events: none;
`

export const StationLink = styled.ul`
  margin: 0;
  padding: 0;
  display: inline-flex;
  padding-top: 35px;
  padding-left: 50px;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  background: white;

  flex-direction: column;
  width: 90px;
  max-height: 120vh;
  overflow-y: scroll;
  height: 100vh;
`
