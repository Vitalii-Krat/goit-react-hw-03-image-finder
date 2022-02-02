import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ userImages, onClick }) => (
  <ImageGalleryStyle className="gallery">
    {userImages.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        onClick={onClick}
      />
    ))}
  </ImageGalleryStyle>
);
export default ImageGallery;

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  userImages: PropTypes.array.isRequired,
};
