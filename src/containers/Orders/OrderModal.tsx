import React from 'react';

import OrderReceivedWrapper, {
  OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
  MenuSection,
} from './OrderModelStyle';

import {Scrollbars} from 'react-custom-scrollbars'


type OrderReceivedProps = {
  order: Order
};

interface Order {
  id: string
  archived: boolean
  customerName: string
  customerEmail: string
  deliveryAddress: string
  createdAt: string
  updatedAt: string
  totalPrice: number
  status: string
  paymentMethod: string
  menuItems: any[]
  userId: string
  catererId: string

}

const OrderModal: React.FunctionComponent<OrderReceivedProps> = ({order}) => {
  const orderDate = new Date(order.createdAt)

  return (

    <Scrollbars
      autoHide
      renderView={(props) => (
        <div
          {...props}
          style={{...props.style, overflowX: "hidden"}}
        />
      )}
      renderTrackHorizontal={(props) => (
        <div
          {...props}
          style={{display: "none"}}
          className="track-horizontal"
        />
      )}
    >
      <OrderReceivedWrapper>
        <OrderReceivedContainer>
          {/* <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
          </a>
        </Link> */}

          <OrderInfo>
            <BlockTitle>

              Order Details
            </BlockTitle>

            <Text>

            </Text>

            <InfoBlockWrapper>
              <InfoBlock>
                <Text bold className="title">
                  Order
              </Text>
                <Text>{order.id}</Text>
              </InfoBlock>

              {/* <InfoBlock>
                <Text bold className="title">
                  Date Created
              </Text>
                <Text>{
                  `${orderDate.getUTCDate()}  ${orderDate.getUTCDay()}/${orderDate.getUTCMonth()}/${orderDate.getFullYear()}`

                }</Text>
              </InfoBlock>

              <InfoBlock>
                <Text bold className="title">
                  Total Amount
              </Text>
                <Text>{order.totalPrice}</Text>
              </InfoBlock>

              <InfoBlock>
                <Text bold className="title">

                </Text>
                <Text>

                </Text>
              </InfoBlock> */}
            </InfoBlockWrapper>
          </OrderInfo>

          <OrderDetails>
            <BlockTitle>

            </BlockTitle>



            <ListItem>
              <ListTitle>
                <Text bold>
                  Address
              </Text>
              </ListTitle>
              <ListDes>
                <Text>
                  {order.deliveryAddress}
                </Text>
              </ListDes>
            </ListItem>
            <ListItem>
              <ListTitle>
                <Text bold className="title">
                  Date Created
              </Text>

              </ListTitle>
              <ListDes>
                <Text>{
                  `${orderDate.getUTCDate()}  ${orderDate.getUTCDay()}/${orderDate.getUTCMonth()}/${orderDate.getFullYear()}`

                }</Text>
              </ListDes>
            </ListItem>
            <ListItem>
              <ListTitle>
                <Text bold className="title">
                  Date Created
              </Text>

              </ListTitle>
              <ListDes>
                <Text>{
                  `${orderDate.getUTCDate()}  ${orderDate.getUTCDay()}/${orderDate.getUTCMonth()}/${orderDate.getFullYear()}`

                }</Text>
              </ListDes>
            </ListItem>
            <ListItem>
              <ListTitle>
                <Text bold className="title">
                  Total Amount
              </Text>

              </ListTitle>
              <ListDes>
                <Text>{order.totalPrice}</Text>
              </ListDes>
            </ListItem>
          </OrderDetails>

          <TotalAmount>
            <BlockTitle>
              Price
            </BlockTitle>

            <ListItem>
              <ListTitle>
                <Text bold>
                  Total Price
              </Text>
              </ListTitle>
              <ListDes>
                <Text>Ksh {order.totalPrice}</Text>
              </ListDes>
            </ListItem>

            <ListItem>
              <ListTitle>
                <Text bold>
                  Payment Type
              </Text>
              </ListTitle>
              <ListDes>
                <Text>{order.paymentMethod}</Text>
              </ListDes>
            </ListItem>
          </TotalAmount>



          <TotalAmount>
            <BlockTitle>
              Menu Item
            </BlockTitle>
            <ListItem>
              <ListTitle>
                <Text bold>
                  Item Quantity
                        </Text>
              </ListTitle>
              <ListDes>
                <Text>{order.menuItems.length} items</Text>
              </ListDes>
            </ListItem>
            {
              order.menuItems.length !== 0 ? (

                order.menuItems.map(item => (
                  <MenuSection>
                    <ListItem>
                      <ListTitle>
                        <Text bold>
                          Menu Title
                      </Text>
                      </ListTitle>
                      <ListDes>
                        <Text>{item.title}</Text>
                      </ListDes>
                    </ListItem>
                    <ListItem>
                      <ListTitle>
                        <Text bold>
                          Quantity
                      </Text>
                      </ListTitle>
                      <ListDes>
                        <Text>{item.quantity}</Text>
                      </ListDes>
                    </ListItem>
                    <ListItem>
                      <ListTitle>
                        <Text bold>
                          Total Item Price
                      </Text>
                      </ListTitle>
                      <ListDes>
                        <Text>{item.totalPrice}</Text>
                      </ListDes>
                    </ListItem>


                    {
                      item.optionsPicked !== undefined && item.optionsPicked.length !== 0 ? (
                        item.optionsPicked.map(option => (
                          <MenuSection>
                            <BlockTitle>
                              Options Picked
                              </BlockTitle>
                            <ListItem>
                              <ListTitle>
                                <Text bold>
                                  Option Title
                                </Text>
                              </ListTitle>
                              <ListDes>
                                <Text>{option.title}</Text>
                              </ListDes>
                            </ListItem>
                            <ListItem>
                              <ListTitle>
                                <Text bold>
                                  Choice Amount
                                </Text>
                              </ListTitle>
                              <ListDes>
                                <Text>{option.choiceAmount}</Text>
                              </ListDes>
                            </ListItem>
                            {
                              option.choicesPicked.map(choice => (
                                <MenuSection>
                                  <BlockTitle>
                                    Choices Picked
                                  </BlockTitle>

                                  <ListItem>
                                    <ListTitle>
                                      <Text bold>
                                        Name
                                      </Text>
                                    </ListTitle>
                                    <ListDes>
                                      <Text>{choice.name}</Text>
                                    </ListDes>
                                  </ListItem>
                                  <ListItem>
                                    <ListTitle>
                                      <Text bold>
                                        Choice Price
                                      </Text>
                                    </ListTitle>
                                    <ListDes>
                                      <Text>{choice.choicePrice}</Text>
                                    </ListDes>
                                  </ListItem>

                                </MenuSection>
                              ))
                            }
                          </MenuSection>
                        ))
                      ) : null
                    }
                  </MenuSection>




                ))

              ) : null
            }



          </TotalAmount>
        </OrderReceivedContainer>
      </OrderReceivedWrapper>

    </Scrollbars>
  );
};

export default OrderModal;
