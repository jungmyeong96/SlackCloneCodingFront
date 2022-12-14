// import useInput from '@hooks/useInput';
// import { IUser } from '@typings/db';
// import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useMutation, useQuery } from 'react-query';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, Redirect } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import fetcher from '../..//utils/fetcher';
import useSWR from 'swr';

const SignUp = () => {
  // const { isLoading, isSuccess, status, isError, data, error } = useQuery('user', () =>
  //   fetcher({ queryKey: '/api/users' }),
  // );
  const { data, error } = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  // const mutation = useMutation<IUser, AxiosError, { email: string; password: string; nickname: string }>(
  //   'user',
  //   (data) => axios.post('/api/users', data).then((response) => response.data),
  //   {
  //     onMutate() {
  //       setSignUpError('');
  //       setSignUpSuccess(false);
  //     },
  //     onSuccess() {
  //       setSignUpSuccess(true);
  //     },
  //     onError(error) {
  //       setSignUpError(error.response?.data);
  //     },
  //   },
  // );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); //????????? ?????? ??????
      if (!mismatchError && nickname) {
        console.log('????????? ??????????????????');
        setSignUpError(''); //????????????
        setSignUpSuccess(false); //?????? ??????????????? ?????????, ?????? ????????? ?????? ????????? ??????.
        axios
          .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            //????????????
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            //????????????
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
    // [email, nickname, password, mismatchError, mutation],
  );

  // if (isLoading) {
  //   return <div>?????????...</div>;
  // }

  // if (data) {
  //   return <Redirect to="/workspace/sleact/channel/??????" />;
  // }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/??????" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>????????? ??????</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>?????????</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>????????????</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>???????????? ??????</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
          {!nickname && <Error>???????????? ??????????????????.</Error>}
          {!email && <Error>???????????? ??????????????????.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
        </Label>
        <Button type="submit">????????????</Button>
      </Form>
      <LinkContainer>
        ?????? ???????????????????&nbsp;
        <Link to="/login">????????? ????????????</Link>
        {/* // href??? ????????????????????? Link to??? ???????????? ??????. */}
      </LinkContainer>
    </div>
  );
};

export default SignUp;
