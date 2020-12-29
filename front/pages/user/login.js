import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Layout from '../../src/components/Layout';
import Button from '../../src/components/Button';
import {
  Row,
  Input,
  Label,
  ErrorMessage,
} from '../../src/components/Input';
import { ArrowLeft } from '../../src/icons';

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 20px;
`;

const login = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const goBack = () => router.back();

  return (
    <Layout title="로그인" icon={<ArrowLeft />} action={goBack}>
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
            placeholder="●●●●●●●●"
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

export default login;
