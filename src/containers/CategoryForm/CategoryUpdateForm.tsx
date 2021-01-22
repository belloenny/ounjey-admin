import {ToasterContainer} from "baseui/toast"
import {MainWrapper} from "containers/MenuItemForm/MenuItemFormStyles"
import React from "react"
import Button, {KIND} from "../../components/Button/Button"
import {Col, Row} from "../../components/FlexBox/FlexBox"
import {ListItem, ListItemLabel} from 'baseui/list';
import {useMenuState} from "../../context/MenuContext"
import {
  MenuCategory,
  useAddMenuItemsMutation, useRemoveMenuItemsMutation, useUpdateMenuOptionMutation
} from "../../graphql/types"
import {Scrollbars} from 'react-custom-scrollbars'
import {
  FieldDetails,
} from "../DrawerItems/DrawerItems.style"
import {DeleteAlt} from "baseui/icon"
import {Select, TYPE, Value} from "baseui/select"
import {Plus} from "assets/icons/Plus"

type Props = any


const CategoryUpdate: React.FC<Props> = ({data, closeModal}: {data: MenuCategory, closeModal: () => void}) => {
  const [, addMenuItems] = useAddMenuItemsMutation()
  const menuItems = useMenuState("menuItems")
  const [, removeItems] = useRemoveMenuItemsMutation()
  const [value, setValue] = React.useState<Value>([]);

  const handleUpdate = () => {
    const ids: string[] = value.map(values => String(values.id))
    setValue([])
    addMenuItems({
      update: {
        id: data.id,
        menuIds: ids
      }
    }).then(res => closeModal())
  }
  const handleDelete = (id: string) => {
    removeItems({
      update: {
        id: data.id,
        menuIds: [id]
      }
    }).then(res => closeModal())
  }
  return (
    <>
      <ToasterContainer />
      <MainWrapper style={{height: "100%", width: "100%", backgroundColor: "white"}}>

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
          <Select
            options={menuItems}
            labelKey="title"
            valueKey="id"
            placeholder="Add Menu Items "
            maxDropdownHeight="400px"
            multi={true}
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

          <div
            style={{marginTop: 30}}
          >
            <Button
              startEnhancer={() => (
                <Plus />
              )}
              onClick={handleUpdate}
              disabled={value.length === 0}
              kind={KIND.minimal}
              overrides={{
                BaseButton: {
                  style: ({$theme}) => ({
                    backgroundColor:
                      "transparent",

                    borderTopLeftRadius: "3px",
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius:
                      "3px",
                    borderBottomLeftRadius:
                      "3px",
                    marginRight: "15px",
                    color: $theme.colors.red400,
                  }),
                },
              }}
            >
              Add Items
          </Button>
          </div>

          <Col lg={12}>
            <FieldDetails>
              <h1>{data.title}</h1>
            </FieldDetails>
          </Col>
          <Row>
            <Col lg={12}>
              {
                data.menuItems && data.menuItems !== null && data.menuItems !== undefined ? (
                  data.menuItems.map(item => (
                    <div style={{marginTop: 30}}>
                      <ListItem
                        key={item.id}

                        sublist
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }}
                        >
                          <ListItemLabel sublist>{item.title}</ListItemLabel>
                          <div
                            style={{cursor: "pointer"}}
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteAlt size={24} />
                          </div>
                        </div>
                      </ListItem>
                    </div>
                  ))
                ) : null
              }


            </Col>
          </Row>
        </Scrollbars>
      </MainWrapper>
      <ToasterContainer />
    </>
  )
}

export default CategoryUpdate
