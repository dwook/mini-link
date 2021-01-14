import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Header from '../src/components/Header';
import Jumbotron from '../src/components/Jumbotron';
import Button from '../src/components/Button';
import Gooey from '../src/components/Gooey';

const Home = () => {
  const [id, setId] = useState();
  const onInputChange = (e) => {
    setId(e.target.value);
  };

  return (
    <div>
      <Header />
      <Jumbotron />
      {/* <Gooey content="hello" /> */}
      <Container>
        <Section>
          <InputContainer>
            <div>
              <span className="domain">https://mini-link.site/</span>
              <input onChange={onInputChange} value={id} />
            </div>
            <Link href={`/user/signup?id=${id}`}>
              <a>
                <Button primary full>
                  시작하기
                </Button>
              </a>
            </Link>
          </InputContainer>
        </Section>
      </Container>
    </div>
  );
};

const Container = styled.div`
  text-align: center;
`;

const Section = styled.div`
  margin: 0 auto;
  padding: 6.25rem 0;
  text-align: center;
  background-color: #fafafa;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  font-size: 16px;
  div {
    flex: 1 1 0;
  }
  .domain {
    color: #bababa;
    padding: 10px 0;
  }
  input {
    width: 40%;
    border: none;
    color: ${(props) => props.theme.color.primary};
    outline: none;
    font-weight: bold;
    font-size: 16px;
    line-height: 3;
  }
  button {
    font-size: 16px;
  }
  @media screen and ${(props) => props.theme.media.mobile} {
    width: 90%;
    max-width: 100%;
    padding: 16px;
    height: auto;
    flex-direction: column;
    a {
      width: 100%;
    }
  }
`;

export default Home;
