import styled from 'styled-components';

export const ImageGalleryStyle = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  grid-gap: 16px;
  margin-left: auto;
  margin-right: auto;
  list-style: none;
`;
