import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox"
import {ToasterContainer} from "baseui/toast"
import {MainWrapper} from "containers/MenuItemForm/MenuItemFormStyles"
import React, {useState} from "react"
import Button, {KIND} from "../../components/Button/Button"
import DrawerBox from "../../components/DrawerBox/DrawerBox"
import {Col, Row} from "../../components/FlexBox/FlexBox"
import {
  FormFields,
  FormLabel,
} from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import {useMenuDispatch, useMenuState} from "../../context/MenuContext"
import {
  MenuOption, MenuOptionDto, useUpdateMenuOptionMutation
} from "../../graphql/types"
import {
  ButtonGroup,
  FieldDetails,
} from "../DrawerItems/DrawerItems.style"

type Props = any

const OptionUpdate: React.FC<Props> = ({data, closeModal, itemId}: {data: MenuOption, refetch: () => void, itemId: string, closeModal: () => void}) => {
  const menuDispatch = useMenuDispatch()
  const [, updateOption] = useUpdateMenuOptionMutation()
  const menuOptions = useMenuState("menuOptions")
  // const [, updatePhoto] = useUpdateItemPhotoMutation()
  const [description, setDescription] = useState(data.description)
  const [maximum_choice, setMaxiMumChoice] = React.useState(data.maximumChoice)
  const [use_checkboxes, setUseCheckbox] = React.useState(data.useCheckBoxes)
  const [minimum_choice, setMiniMumChoice] = React.useState(data.minimumChoice)
  const [title, setTitle] = React.useState(data.title)

  React.useEffect(() => {
    return () => {
      setTitle("")
      setDescription("")
      setMaxiMumChoice(0)
      setMiniMumChoice(0)
      console.log(menuOptions)
    }

  }, [])


  const handleChange = () => {
    const result: MenuOptionDto = {
      title,
      minimumChoice: Number(minimum_choice),
      description,
      maximumChoice: Number(maximum_choice),
      useCheckBoxes: use_checkboxes,
      menuItemId: itemId
    }

    menuDispatch({
      type: "UPDATE_OPTION",
      id: data.id,
      option: {
        id: Math.floor(Math.random() * 100).toString(),
        ...result,
        menuChoices: data.menuChoices ? data.menuChoices : []
      }
    })
    updateOption({
      newRecord: result,
      id: data.id
    }).then(() => closeModal())

  }
  return (
    <>
      <ToasterContainer />
      <MainWrapper style={{height: "100%", width: "100%"}}>
        <Col lg={12}>
          <FieldDetails>
            Update Option
            </FieldDetails>
        </Col>
        <Row>
          <Col lg={12}>
            <DrawerBox>
              <MainWrapper>
                <FormFields>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Minimum choice</FormLabel>
                  <Input
                    type="number"
                    value={minimum_choice}
                    onChange={(e) =>
                      setMiniMumChoice(e.target.value)
                    }
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Maximum choice</FormLabel>
                  <Input
                    type="number"
                    value={maximum_choice}
                    onChange={(e) =>
                      setMaxiMumChoice(e.target.value)
                    }
                  />
                </FormFields>
                <FormFields>
                  <Checkbox
                    checked={use_checkboxes}
                    onChange={() =>
                      setUseCheckbox(
                        !use_checkboxes
                      )
                    }
                    labelPlacement={
                      LABEL_PLACEMENT.right
                    }
                  >
                    Use Checkboxes?
                            </Checkbox>
                </FormFields>

              </MainWrapper>
            </DrawerBox>
          </Col>
        </Row>
        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeModal}
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
            onClick={() => {
              handleChange()
            }}
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
            Update
          </Button>
        </ButtonGroup>
      </MainWrapper>
      <ToasterContainer />
    </>
  )
}

export default OptionUpdate
