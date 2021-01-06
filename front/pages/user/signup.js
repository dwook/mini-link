import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { userAction } from '../../feature/User/slice';
import Layout from '../../src/components/Layout';
import Button from '../../src/components/Button';
import {
  Row,
  Input,
  Label,
  Message,
  Error,
  Info,
} from '../../src/components/Input';
import { ArrowLeft } from '../../src/icons';

const sigunp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const signUpDone = useSelector((state) => state.user.signUpDone);
  const { checkUserExistResult } = useSelector((state) => state.user);
  const { register, handleSubmit, watch, errors } = useForm();
  const username = useRef();
  username.current = watch('username');
  const password = useRef();
  password.current = watch('password');

  useEffect(() => {
    dispatch(userAction.signUpReset());
  }, []);
  useEffect(() => {
    if (username.current) {
      console.log(username, username.current);
      dispatch(userAction.checkUserExistRequest(username.current));
    }
  }, [username.current]);

  const onSubmit = (data) => {
    dispatch(userAction.signUpRequest(data));
  };
  const goBack = () => router.back();

  return (
    <Layout title="회원가입" icon={<ArrowLeft />} onClick={goBack}>
      {signUpDone && (
        <Container>
          <WelcomeBanner>
            <div className="emoji">🥳</div>
            <div className="text">회원가입을 축하드립니다!</div>
          </WelcomeBanner>
          <Outro>
            <Link href="/user/login">
              <a>
                <Button primary big full type="submit">
                  로그인 하기
                </Button>
              </a>
            </Link>
          </Outro>
        </Container>
      )}
      {!signUpDone && (
        <>
          <Intro>
            이미 가입하셨나요?
            <Link href="/user/login">
              <a>로그인 하기</a>
            </Link>
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
              <Message>
                <Info>
                  {checkUserExistResult === false && '사용가능한 아이디입니다.'}
                </Info>
                <Error>
                  {checkUserExistResult === true &&
                    '이미 사용중인 아이디입니다'}
                  {errors.username?.message}
                </Error>
              </Message>
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
              <Message>
                <Error>{errors.password?.message}</Error>
              </Message>
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
                    confirm: (value) =>
                      value === password.current ||
                      '비밀번호를 다르게 입력하셨습니다.',
                  },
                })}
              />
              <Message>
                <Error>{errors.password_confirm?.message}</Error>
              </Message>
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
              <Message>
                <Error>{errors.email?.message}</Error>
              </Message>
            </Row>
            <Outro>
              <Button primary big full type="submit">
                미니링크 가입하기
              </Button>
            </Outro>
          </form>
        </>
      )}
    </Layout>
  );
};

const Intro = styled.div`
  text-align: left;
  width: 100%;
  padding: 20px 20px 40px;
  a {
    color: ${(props) => props.theme.color.primary};
    margin: 0 10px;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const WelcomeBanner = styled.div`
  padding: 20px;
  margin: 20px;
  .emoji {
    font-size: 60px;
    text-align: center;
    margin-bottom: 20px;
  }
  .text {
    text-align: center;
  }
`;

export default sigunp;
