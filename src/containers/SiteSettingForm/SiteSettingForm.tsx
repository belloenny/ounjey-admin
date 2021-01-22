import React, {useCallback, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import Uploader from '../../components/Uploader/Uploader';
import Input from '../../components/Input/Input';
import {Textarea} from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import DrawerBox from '../../components/DrawerBox/DrawerBox';
import {Grid, Row, Col} from '../../components/FlexBox/FlexBox';
import {Form, FieldDetails} from '../DrawerItems/DrawerItems.style';
import {FormFields, FormLabel} from '../../components/FormFields/FormFields';
import {CatererProfile, useCatererQuery} from 'graphql/types';
import axios from 'axios';
import {postData} from 'utils/fetch';
import Placeholder from 'components/Placeholder/Placeholder';
import {LoaderWrapper, LoaderItem} from 'containers/Products/Products';
import {AuthContext} from 'context/auth';

const options = [
  {value: 'active', label: 'Active'},
  {value: 'maintenance', label: 'Maintenance'},
  {value: 'turn-off', label: 'Down'},
];
type Props = {};
const SiteSettingsForm: React.FC<Props> = () => {

  const {userData} = useContext(AuthContext)
  const [file, setFile] = useState()
  const {register, handleSubmit, setValue} = useForm({
    defaultValues: userData
  });


  const handleFile = useCallback((file) => {
    setFile(file)
    const result = new FormData()
    result.append('image', file)
    postData(`${process.env.REACT_APP_API_URL}/upload-cover-image/${userData.id}`, result)
  }, [file, setFile])





  const submit = (result) => {
    axios.put(`${process.env.REACT_APP_API_URL}/caterers/${userData.id}`, {
      newRecord: result
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
      }
    })
  };
  return (
    <Grid fluid={true}>
      <Form onSubmit={handleSubmit(submit)} style={{paddingBottom: 0}}>
        <Row>
          <Col md={4}>
            <FieldDetails>Upload your Bussiness Cover Image Here </FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <Uploader setFile={handleFile} />
            </DrawerBox>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <FieldDetails>
              Edit Your Business Details and necessary information from here
            </FieldDetails>
          </Col>

          <Col md={8}>
            <DrawerBox>
              <FormFields>
                <FormLabel>Business Name</FormLabel>
                <Input
                  name='businessName'
                  inputRef={register()}
                />
              </FormFields>
              <FormFields>
                <FormLabel>Business Email</FormLabel>
                <Input
                  name='businessEmail'
                  inputRef={register()}
                />
              </FormFields>
              <FormFields>
                <FormLabel>Business Phone</FormLabel>
                <Input
                  name='businessPhone'
                  inputRef={register()}
                />
              </FormFields>
              <FormFields>
                <FormLabel>Delivery Fee</FormLabel>
                <Input
                  name='deliveryFee'
                  inputRef={register()}
                />
              </FormFields>
              <FormFields>
                <FormLabel>Tag Line</FormLabel>
                <Input
                  name='tagLine'
                  inputRef={register()}
                />
              </FormFields>

              <FormFields>
                <Button
                  type="submit"
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
              </FormFields>
            </DrawerBox>
          </Col>
        </Row>
      </Form>
    </Grid>
  );
};

export default SiteSettingsForm;
