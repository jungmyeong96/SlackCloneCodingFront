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

const SignUp = () => {
  // const { isLoading, isSuccess, status, isError, data, error } = useQuery('user', () =>
  //   fetcher({ queryKey: '/api/users' }),
  // );

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
      e.preventDefault();
      if (!mismatchError && nickname) {
        console.log('서버로 회원가입하기');
        setSignUpError(''); //로딩단계
        setSignUpSuccess(false); //요청 날리기전에 초기화, 이전 결과가 남는 경우가 많음.
        axios
          .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            //성공단계
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            //실패단계
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
  //   return <div>로딩중...</div>;
  // }

  // if (data) {
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {!email && <Error>이메일을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
        {/* // href는 새로고침되므로 Link to를 쓰는것이 좋음. */}
      </LinkContainer>
    </div>
  );
};

export default SignUp;
