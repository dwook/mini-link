import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store';
import { linkAction } from '../../feature/Link/slice';
import { backURL } from '../../config';
import Layout from '../../src/components/Layout';
import ImageUploadArea from '../../src/components/ImageUploadArea';
import SwitchInput from '../../src/components/Switch';
import Button from '../../src/components/Button';
import { Row, Input, Label, ErrorMessage } from '../../src/components/Input';
import { Cross } from '../../src/icons';

const Outro = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 20px;
`;

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.color.primary};
  }
`;

const editLinkPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { selectedLink, editLinkDone } = useSelector((state) => state.link);
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      name: selectedLink?.name,
      url: selectedLink?.url,
      public: selectedLink?.public,
    },
  });

  useEffect(() => {
    if (editLinkDone) {
      router.push('/admin');
    }
  }, [editLinkDone]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }
    formData.append('name', data.name);
    formData.append('url', data.url);
    formData.append('public', data.public);
    formData.append('linkId', id);
    dispatch(linkAction.editLinkRequest(formData));
  };

  const goAdmin = () => router.push('/admin');
  const watchPublic = watch('public');

  return (
    <Layout title="링크 수정하기" icon={<Cross />} onClick={goAdmin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUploadArea
          name="image"
          ref={register}
          exImageURL={`'${backURL}/${selectedLink?.image}'`}
        />
        <Row>
          <Label>링크 이름</Label>
          <Input
            name="name"
            ref={register({
              required: '링크를 나타낼 수 있는 이름을 입력해주세요.',
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>링크 주소</Label>
          <Input
            name="url"
            type="url"
            inputmode="url"
            ref={register({
              required: '연결하고 싶은 링크 주소를 입력해주세요.',
            })}
          />
          <ErrorMessage>{errors.url?.message}</ErrorMessage>
        </Row>
        <Row>
          <Label>링크 공개여부</Label>
          <SwitchContainer>
            <span>{watchPublic === true ? '공개' : '비공개'}</span>
            <SwitchInput name="public" ref={register} />
          </SwitchContainer>
          <ErrorMessage>{errors.public?.message}</ErrorMessage>
        </Row>
        <Outro>
          <Button primary big type="submit">
            링크 변경
          </Button>
        </Outro>
      </form>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(linkAction.getLinkRequest(context.params.id));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default connect((state) => state)(editLinkPage);
