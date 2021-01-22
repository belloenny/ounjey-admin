import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox"
import {DeleteAlt} from "baseui/icon"
import {toaster, ToasterContainer} from "baseui/toast"
import {MainWrapper} from "containers/MenuItemForm/MenuItemFormStyles"
import React, {useCallback, useState} from "react"
import {Scrollbars} from "react-custom-scrollbars"
import {useForm} from "react-hook-form"
import Button, {KIND} from "../../components/Button/Button"
import DrawerBox from "../../components/DrawerBox/DrawerBox"
import {Col, Row} from "../../components/FlexBox/FlexBox"
import {
  Error,
  FormFields,
  FormLabel,
} from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import Select from "../../components/Select/Select"
import {Textarea} from "../../components/Textarea/Textarea"
import Uploader from "../../components/Uploader/Uploader"
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext"
import {useMenuDispatch} from "../../context/MenuContext"
import {
  MenuChoice,
  MenuChoiceDto,
  MenuItem, MenuItemDto, useDeleteMenuItemMutation, useUpdateMenuChoiceMutation, useUpdateMenuItemMutation
} from "../../graphql/types"
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style"
import MenuItemForm from "../MenuItemForm/MenuItemForm"

type Props = any

const ChoiceUpdate: React.FC<Props> = ({data, optionId, closeModal}: {data: MenuChoice, refetch: () => void, optionId: string, closeModal: () => void}) => {
  const dispatch = useDrawerDispatch()
  const menuDispatch = useMenuDispatch()
  const [, updateMenuChoice] = useUpdateMenuChoiceMutation()
  // const [, updatePhoto] = useUpdateItemPhotoMutation()
  const [description, setDescription] = useState(data.description)
  const [choice_price, setChoicePrice] = React.useState(data.choicePrice)
  const [name, setName] = React.useState(data.name)
  React.useEffect(() => {
    return () => {
      setName("")
      setDescription("")
      setChoicePrice(0)
    }

  }, [])

  const handleDescriptionChange = (e) => {
    const value = e.target.value
    setDescription(value)
  }

  const handleChange = () => {
    const result = {
      name,
      choicePrice: Number(choice_price),
      description,
      menuOptionId: optionId
    }

    menuDispatch({
      type: "UPDATE_CHOICE",
      choiceId: data.id,
      optionId,
      data: {
        id: Math.floor(Math.random() * 100).toString(),
        ...result
      }
    })
    updateMenuChoice({
      newRecord: result,
      id: data.id
    }).then(res => closeModal())

  }
  return (
    <>
      <ToasterContainer />
      <MainWrapper style={{height: "100%", width: "100%"}}>
        <Col lg={12}>
          <FieldDetails>
            Update Choice
            </FieldDetails>
        </Col>
        <Row>
          <Col lg={12}>
            <DrawerBox>
              <FormFields>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />
              </FormFields>

              <FormFields>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </FormFields>

              <FormFields>
                <FormLabel>Choice Price</FormLabel>
                <Input
                  type="number"
                  value={choice_price}
                  onChange={(e) =>
                    setChoicePrice(
                      e.target.value
                    )
                  }
                />
              </FormFields>
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
                style: ({$theme}) => ({
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

export default ChoiceUpdate
