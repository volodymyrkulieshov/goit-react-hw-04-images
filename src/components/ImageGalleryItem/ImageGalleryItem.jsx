import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ item, openModal }) => {
  const { tags, webformatURL, largeImageURL } = item;
  return (
    <>
      <ImageItem
        onClick={evt => {
          evt.preventDefault();
          openModal(largeImageURL, tags);
        }}
      >
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </ImageItem>
    </>
  );
};

export default ImageGalleryItem;
