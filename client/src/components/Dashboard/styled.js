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
  background-size: 64px 128px;

  *,
  div * {
    position: relative;
    z-index: 1;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  .text,
  pre,
  code {
    z-index: 1010;
  }

  svg,
  svg *,
  svg > {
    position: absolute;
    z-index: 2000;
  }

  rect.chart {
    fon: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
    position: relative;
    z-index: 101;
  }
`

export const Container = styled(S.Container)`
  max-width: 1000px;
`

export const ChartTitle = styled.div`
  text-align: center;
  font-size: 2.25em;
  position: absolute;
  display: flex;
  align-items: flex-start;
  margin-top: 60px;
  justify-content: center;
  width: 100%;
  height: 100%;
`
export const Graphic = styled.div`
  width: calc(100% - 40px);
  margin: 20px;
  z-index: 0;
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
  height: 1000px;
  width: 900px;
  background-color: #fff;
  padding: 20px 20px 20px 20px;
  align-self: center;

  ${axesFlattenableCss};

  @media (min-width: 1000px) {
    box-shadow: 2px 2px 20px;
    width: 60%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
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
  z-index: 9000;
  top: 0;
  right: 0;
  background: blanchedalmond;

  flex-direction: column;
  width: 90px;
  max-height: 120vh;
  overflow-y: scroll;
  height: 100vh;
`

export const Text = styled.p`
  text-align: ;
`

export const Svg = styled.div`
  width: 500px;
  height: 300px;
  position: absolute;
  z-index: 9000;
  top: 35%;
  left: 35%;
`
