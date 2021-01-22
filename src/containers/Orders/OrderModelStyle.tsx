import styled from 'styled-components';


type TextProps = {
  bold?: any;
};

const OrderReceivedWrapper = styled.div`
  background-color: '#f7f7f7';
  position: relative;
  min-height: 100vh;
`;

export const OrderReceivedContainer = styled.div`
  background-color: '#ffffff';
  border: 1px solid '#f1f1f1';
  border-radius: '6px';
  overflow: auto;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  .home-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'san-serif';
    font-size: 15px;
    font-weight:  '400';
    color: '#77798c';
    padding: 5px 15px;
    height: 36px;
    border: 1px solid '#e6e6e6';
    border-radius: 6px;
    position: absolute;
    top: 15px;
    right: 15px;
    transition: 0.15s ease-in-out;


    &:hover {
      background-color: '#009e7f';
      border-color: '#009e7f';
      color: '#ffffff';
    }
  }
`;

export const OrderInfo = styled.div`
  margin-bottom: 60px;
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;

export const OrderDetails = styled.div`
  margin-bottom: 60px;
  @media (max-width: 767px) {
    margin-bottom: 50px;
  }
`;

export const TotalAmount = styled.div`
  margin-bottom: 62px;
`;
export const MenuSection = styled.div`
  border: 0.5px gray solid;
  border-radius: 4px;
  padding: 10px 10px;
  margin-top: 30px;

`
export const BlockTitle = styled.h2`
  font-family: sans-serif;
  font-size: 21px;
  font-weight: 600;
  color: '#0D1136';
  line-height: 1;
  margin-bottom: 32px;
  @media (max-width: 767px) {
    font-size: calc(15px + 1px);
    margin-bottom: 25px;
  }
`;

export const Text = styled.p<TextProps>`
  font-family: sans-serif;
  font-size: 15px;
  color: '#0D1136';
  font-weight: ${(props) =>
    props.bold
      ? 700
      : 400};
  line-height: 1.2;
  display: block;
  margin: 0;

  &:last-child {
    color: '#424561';
  }
`;

export const InfoBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

export const InfoBlock = styled.div`
  flex-grow: 1;
  padding: 0 15px;
  border-left: 1px solid '#f1f1f1';
  @media (max-width: 767px) {
    max-width: 100%;
    flex: 0 0 100%;
    margin-bottom: 20px;
    padding: 0;
    border: 0;
  }

  &:first-child {
    padding-left: 0;
    border-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }

  .title {
    margin-bottom: 10px;
  }
`;

export const ListItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ListTitle = styled.div`
  flex-basis: 151px;
  max-width: 151px;
  flex-shrink: 0;
  position: relative;
  @media (max-width: 767px) {
    flex-basis: 105px;
    max-width: 105px;
  }
  &:after {
    content: ':';
    position: absolute;
    top: -1px;
    right: -2px;
    line-height: 1;
  }
`;

export const ListDes = styled.div`
  padding-left: 40px;
  @media (max-width: 767px) {
    padding-left: 20px;
  }
`;

export default OrderReceivedWrapper;
