import React from 'react';
import { LoaderStyle } from './Loader.styled';

import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <LoaderStyle>
      <Oval color="#00BFFF" height={300} width={300} timeout={3000} />
    </LoaderStyle>
  );
}
