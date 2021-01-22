import {withStyle} from "baseui"
import {StyledCell} from "baseui/table"
import NoResult from '../../components/NoResult/NoResult'
import {Plus} from "components/AllSvgIcon"
import Button from "components/Button/Button"
import {useDrawerDispatch} from "context/DrawerContext"
import {useCatererQuery} from "graphql/types"
import React, {useCallback, useState} from "react"
import Checkbox from "../../components/CheckBox/CheckBox"
import {
  Col as Column,
  Grid,
  Row as Rows,
} from "../../components/FlexBox/FlexBox"
import {Header, Heading, Wrapper} from "../../components/WrapperStyle"
import {StyledHeadCell, StyledTable, TableWrapper} from "../Orders/Orders.style"
import Placeholder from "components/Placeholder/Placeholder"
import {LoaderWrapper, LoaderItem} from "containers/Products/Products"

// const themedUseStyletron = createThemedUseStyletron<CustomThemeT>()

// const Status = styled("div", ({ $theme }) => ({
//     ...$theme.typography.fontBold14,
//     color: $theme.colors.textDark,
//     display: "flex",
//     alignItems: "center",
//     lineHeight: "1",
//     textTransform: "capitalize",

//     ":before": {
//         content: '""',
//         width: "10px",
//         height: "10px",
//         display: "inline-block",
//         borderRadius: "10px",
//         backgroundColor: $theme.borders.borderE6,
//         marginRight: "10px",
//     },
// }))

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}))

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px)": {
    alignItems: "center",
  },
}))


export default function SubAccount() {

  const [checked] = useState(false)
  const [result] = useCatererQuery()
  const {data, error, fetching} = result
  // const [status] = useState([])
  // const [limit] = useState([])
  // const [search] = useState([])
  const dispatch = useDrawerDispatch()

  const openDrawer = useCallback(
    () =>
      dispatch({type: "OPEN_DRAWER", drawerComponent: "SUBACCOUNT_FORM"}),
    [dispatch]
  )

  if (fetching) {
    return (<LoaderWrapper>
      <LoaderItem>
        <Placeholder />
      </LoaderItem>
      <LoaderItem>
        <Placeholder />
      </LoaderItem>
      <LoaderItem>
        <Placeholder />
      </LoaderItem>
      <LoaderItem>
        <Placeholder />
      </LoaderItem>
    </LoaderWrapper>)
  }

  if (!data || error) {
    return <div>Error! {error.message}</div>
  }
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
            }}
          >
            <Col md={3} xs={12}>
              <Heading>SubAccounts</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Col md={3} xs={12}>

                </Col>

                <Col md={3} xs={12}>

                </Col>

                <Col md={6} xs={12}>
                  <Button
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: "100%",
                          borderTopLeftRadius: "3px",
                          borderTopRightRadius: "3px",
                          borderBottomLeftRadius:
                            "3px",
                          borderBottomRightRadius:
                            "3px",
                        }),
                      },
                    }}
                    onClick={openDrawer}
                  >
                    Add SubAccount
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper
            style={{boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)"}}
          >
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(150px, auto) auto">
                <StyledHeadCell>
                  <Checkbox
                    type="checkbox"
                    value="checkAll"
                    checked={checked}
                    overrides={{
                      Checkmark: {
                        style: {
                          borderTopWidth: "2px",
                          borderRightWidth: "2px",
                          borderBottomWidth: "2px",
                          borderLeftWidth: "2px",
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius:
                            "4px",
                          borderBottomLeftRadius:
                            "4px",
                        },
                      },
                    }}
                  />
                </StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Bank Name</StyledHeadCell>
                {
                  data.caterer.subaccount !== null ? (

                    <React.Fragment>
                      <StyledCell>
                        <Checkbox
                          overrides={{
                            Checkmark: {
                              style: {
                                borderTopWidth: '2px',
                                borderRightWidth: '2px',
                                borderBottomWidth: '2px',
                                borderLeftWidth: '2px',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                                borderBottomLeftRadius: '4px',
                              },
                            },
                          }}
                        />
                      </StyledCell>
                      <StyledCell>
                        {data.caterer.subaccount.id}
                      </StyledCell>
                      <StyledCell>
                        {data.caterer.subaccount.bank_name}
                      </StyledCell>
                    </React.Fragment>
                  ) : (
                      <NoResult
                        hideButton={false}
                        style={{
                          gridColumnStart: "1",
                          gridColumnEnd: "one"
                        }}

                      />
                    )
                }

              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  )
}
