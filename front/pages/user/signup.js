import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import AuthLayout from '../../src/components/Layout';
import Button from '../../src/components/Button';
import { Row, Input, Label, ErrorMessage } from '../../src/components/Input';
import { ArrowLeft } from '../../src/icons';

const Intro = styled.div`
  text-align: left;
  width: 100%;
  padding: 20px 20px 40px;
  a {
    color: ${(props) => props.theme.color.primary};
  }
`;

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 20px;
`;

const Guide = styled.span`
  padding: 6px 10px 4px;
  display: inline-flex;
  position: absolute;
  left: 100px;
  font-size: 12px;
  background-color: ${(props) => props.theme.color.gray};
  border-radius: 2px;
  animation: updown 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  animation-iteration-count: infinite;
  span {
    font-size: 30px;
    position: absolute;
    left: -25px;
  }
  @keyframes updown {
    50% {
      top: 3px;
    }
    0%,
    to {
      top: 0;
    }
  }
`;

const sigunp = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef();
  password.current = watch('password');

  const onSubmit = (data) => console.log(data);
  const goBack = () => router.back();

  return (
    <AuthLayout title="회원가입" icon={<ArrowLeft />} action={goBack}>
      <Intro>
        이미 가입하셨나요? <Link href="/user/login">로그인 하기</Link>
      </Intro>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Label required>아이디</Label>
          <Guide>
            <span>🧚‍♀️</span>
            아이디는 미니링크 주소로 사용됩니다. 변경할 수 없어요!
          </Guide>
          <Input
            name="username"
            ref={register({ required: '아이디를 입력해주세요.' })}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label required>비밀번호</Label>
          <Input
            name="password"
            type="password"
            autoComplete="off"
            ref={register({
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: '6자 이상 입력해주세요.',
              },
            })}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label required>비밀번호 확인</Label>
          <Input
            name="password_confirm"
            type="password"
            autoComplete="off"
            ref={register({
              required: '비밀번호를 다시 한번 입력해주세요.',
              validate: {
                confirm: (value) => value === password.current
                  || '비밀번호를 다르게 입력하셨습니다.',
              },
            })}
          />
          <ErrorMessage>{errors.password_confirm?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>이메일</Label>
          <Input
            name="email"
            type="email"
            inputmode="email"
            ref={register({
              pattern: {
                value: /^\S+@\S+$/i,
                message: '이메일 형식에 맞게 입력해주세요.',
              },
            })}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Row>
        <Outro>
          <Button primary big type="submit">
            미니링크 가입하기
          </Button>
        </Outro>
      </form>
    </AuthLayout>
  );
};

export default sigunp;
