import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Layout from '../../src/components/Layout';
import ImageUploadArea from '../../src/components/ImageUploadArea';
import Button from '../../src/components/Button';
import {
  Row,
  Input,
  Label,
  ErrorMessage,
} from '../../src/components/Input';
import { Cross } from '../../src/icons';

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 20px;
`;

const createLinkPage = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log(data);
  const goAdmin = () => router.push('/admin');

  return (
    <Layout title="커버 수정하기" icon={<Cross />} action={goAdmin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploadArea
          name="image"
          ref={register}
          exImageURL="https://cdn2.sylvanianfamilies.com/includes_gl/img/category/top_4.jpg"
        />
        <Row>
          <Label>소개글</Label>
          <Input
            name="introduction"
            type="text"
            placeholder="소개글을 입력해주세요."
            ref={register}
          />
          <ErrorMessage>{errors.introduction?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>웹사이트</Label>
          <Input
            name="website"
            type="url"
            inputmode="url"
            placeholder="웹사이트 전체 주소를 입력해주세요."
            ref={register}
          />
          <ErrorMessage>{errors.website?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>인스타그램</Label>
          <Input
            name="instagram"
            type="url"
            inputmode="url"
            placeholder="@를 제외한 아이디만 입력해주세요."
            ref={register}
          />
          <ErrorMessage>{errors.instagram?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>유투브</Label>
          <Input
            name="youtube"
            type="url"
            inputmode="url"
            placeholder="채널 전체 주소를 입력해주세요."
            ref={register}
          />
          <ErrorMessage>{errors.youtube?.message}</ErrorMessage>
        </Row>
        <Outro>
          <Button primary big type="submit">
            수정 완료
          </Button>
        </Outro>
      </form>
    </Layout>
  );
};

export default createLinkPage;
