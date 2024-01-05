import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} item={image} openModal={openModal} />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
