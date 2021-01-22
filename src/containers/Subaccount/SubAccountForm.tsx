import {Button, KIND} from "baseui/button"
import {Input} from "baseui/input"
import DrawerBox from "components/DrawerBox/DrawerBox"
import {FormFields, FormLabel} from "components/FormFields/FormFields"
import React, {useCallback} from "react"
import {Row, Col} from "react-flexbox-grid"
import {useForm} from "react-hook-form"
import {useDrawerDispatch} from "../../context/DrawerContext"
import {Scrollbars} from "react-custom-scrollbars"
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form
} from "../DrawerItems/DrawerItems.style"
import {useAddMenuItemsMutation, useAddSubAccountMutation, useCreateMenuCategoryMutation} from "graphql/types"
import {Select, TYPE, Value} from "baseui/select"
import {AVAILABLE_RAVE_BANKS} from "settings/constants"


type Props = any

const SubAccountForm: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch()
  const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
    dispatch,
  ])
  const {register, handleSubmit} = useForm()
  const [, addSubAccount] = useAddSubAccountMutation()
  const [value, setValue] = React.useState<Value>([]);


  const onSubmit = async ({account_number}: {account_number: string}) => {
    addSubAccount({
      newRecord: {
        account_bank: value[0].code,
        account_number
      }
    }).then(() => closeDrawer())
  }
  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Bank Account</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{height: "100%"}}>
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
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Bank Account to Recieve your Payments.
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Choose Bank</FormLabel>
                  <Select
                    options={AVAILABLE_RAVE_BANKS}
                    labelKey="name"
                    valueKey="code"
                    placeholder="Choose Bank "
                    maxDropdownHeight="400px"
                    type={TYPE.search}
                    onChange={({value}) => setValue(value)}
                    value={value}
                    overrides={{
                      Placeholder: {
                        style: ({$theme}) => {
                          return {
                            ...$theme.typography
                              .fontBold14,
                            color:
                              $theme.colors
                                .textNormal,
                          }
                        },
                      },
                      DropdownListItem: {
                        style: ({$theme}) => {
                          return {
                            ...$theme.typography
                              .fontBold14,
                            color:
                              $theme.colors
                                .textNormal,
                          }
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: {
                                zIndex: 100000,
                              },
                            },
                          },
                        },
                      },
                    }}

                  />

                </FormFields>
              </DrawerBox>
            </Col>

          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add Your Account Number
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    inputRef={register({
                      required: true,
                      maxLength: 20,
                    })}
                    name="account_number"
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({$theme}) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
                    </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            Add Account
          </Button>
        </ButtonGroup>
      </Form>
    </>
  )
}

export default SubAccountForm
