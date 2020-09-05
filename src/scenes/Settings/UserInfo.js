// @flow
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserRequest,
  updateUserRequest
} from "../../store/modules/settings";
import { selectUser } from "../../store/modules/login";

import TextButton from "../../components/TextButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Divider from "../../components/Divider";
import Flex from "../../components/Flex";

const Settings = () => {
  const dispatch = useDispatch();
  const { displayName, email } = useSelector(selectUser);
  const [editable, setEditable] = useState(true); // CHANGE TO FALSE
  const [inputs, setInputs] = useState({
    username: displayName,
    email: email,
    password: ""
  });
  const [changePassword, setChangePassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const onChangeInputHandler = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };

  const onSaveUserHandler = () => {
    if (inputs.username !== displayName && inputs.email !== email) {
      dispatch(
        updateUserRequest({
          password: inputs.password,
          name: inputs.username,
          email: inputs.email
        })
      );
    } else {
      if (inputs.username !== displayName) {
        dispatch(
          updateUserRequest({
            password: inputs.password,
            name: inputs.username
          })
        );
      }

      if (inputs.email !== email) {
        dispatch(
          updateUserRequest({ password: inputs.password, email: inputs.email })
        );
      }
    }
  };

  if (editable) {
    return (
      <UserInfoView collapsed={editable}>
        <InputField
          required
          name="username"
          type="text"
          label="USERNAME"
          autoComplete="off"
          value={inputs.username}
          onChangeHandler={onChangeInputHandler}
        />
        <InputField
          required
          name="email"
          type="email"
          label="EMAIL"
          autoComplete="off"
          value={inputs.email}
          onChangeHandler={onChangeInputHandler}
        />
        <InputField
          required
          name="password"
          type="password"
          label="CURRENT PASSWORD"
          autoComplete="off"
          value={inputs.password}
          onChangeHandler={onChangeInputHandler}
        />
        {changePassword ? (
          <InputField
            required
            name="password"
            type="password"
            label="NEW PASSWORD"
            autoComplete="off"
            value={passwordInput}
            onChangeHandler={e => setPasswordInput(e.target.value)}
          />
        ) : (
          <StyledTextButton onClick={() => setChangePassword(true)}>
            Change password?
          </StyledTextButton>
        )}
        <StyledDivider />
        <Wrapper justify="space-between">
          <LeftButtonGroup>
            <Button
              color="#f04747"
              outlined
              clicked={() =>
                dispatch(deleteUserRequest({ password: inputs.password }))
              }
            >
              Delete Account
            </Button>
          </LeftButtonGroup>
          <RightButtonGroup>
            <Button
              bgColor="transparent"
              clicked={() => {
                setEditable(false);
                setChangePassword(false);
              }}
            >
              Cancel
            </Button>
            <Button
              bgColor="#43b581"
              hoverColor="#3ca374"
              clicked={onSaveUserHandler}
            >
              Save
            </Button>
          </RightButtonGroup>
        </Wrapper>
      </UserInfoView>
    );
  }

  return (
    <UserInfoView>
      <InputName>USERNAME</InputName>
      <Text>{displayName}</Text>
      <InputName>EMAIL</InputName>
      <Text>{email}</Text>
      <Button clicked={() => setEditable(true)}>Edit</Button>
    </UserInfoView>
  );
};

const UserInfoView = styled.div`
  background-color: rgb(32 34 37 / 60%);
  border: 1px solid #202225;
  border-radius: 5px;
  padding: 20px;
  text-align: ${props => (props.collapsed ? "left" : "right")};
`;

const Wrapper = styled(Flex)`
  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const InputName = styled.div`
  color: #8e9297;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
`;

const Text = styled.div`
  color: #b9bbbe;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 20px;
  text-align: left;
`;

const InputField = styled(Input)`
  margin-bottom: 20px;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 8px;

  &:after {
    display: none;
  }
`;

const LeftButtonGroup = styled(Flex)`
  & > button {
    margin-right: 10px;
  }

  @media (max-width: 450px) {
    flex-direction: column;

    & > button {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

const RightButtonGroup = styled(Flex)`
  & > button {
    margin-left: 10px;
  }

  @media (max-width: 450px) {
    justify-content: space-between;
    margin-top: 10px;

    & > button {
      margin-left: 0;
    }
  }
`;

const StyledTextButton = styled(TextButton)`
  font-size: 14px;
  margin-bottom: 8px;
`;

export default Settings;
