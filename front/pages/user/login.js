import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { userAction } from '../../feature/User/slice';
import Layout from '../../src/components/Layout';
import Button from '../../src/components/Button';
import { Row, Input, Label, ErrorMessage } from '../../src/components/Input';
import { ArrowLeft } from '../../src/icons';

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (userInfo) {
      router.push('/admin');
    }
  }, [userInfo]);

  const onSubmit = (data) => {
    dispatch(userAction.logInRequest(data));
  };
  const goBack = () => router.back();

  return (
    <Layout title="로그인" icon={<ArrowLeft />} onClick={goBack}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Label>아이디</Label>
          <Input
            name="username"
            ref={register({ required: '아이디를 입력해주세요.' })}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>비밀번호</Label>
          <Input
            name="password"
            type="password"
            autoComplete="off"
            ref={register({ required: '비밀번호를 입력해주세요.' })}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Row>
        <Outro>
          <Button primary big type="submit">
            미니링크 로그인
          </Button>
        </Outro>
      </form>
    </Layout>
  );
};

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 20px;
`;

export default login;
