import { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Container } from './App.styled';
import { Notify } from 'notiflix';
import { optionsNotify } from './NotifyOptions/Notify';
import { getAllImages, perPage } from 'api/api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    search: '',
    images: null,
    page: 1,
    isLoading: false,
    buttonLoadMore: false,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const prevPage = prevState.page;
    const newSearch = this.state.search;
    const newPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== newPage) {
      this.addImages(newSearch, newPage);
      this.setState({ isLoading: true, buttonLoadMore: false });
    }
  }

  addImages = async () => {
    try {
      //Запит на бек-енд з api
      const response = await getAllImages(this.state.search, this.state.page);
      const { totalHits, hits } = response;
      const totalPage = Math.ceil(totalHits / perPage);
      if (totalHits === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          optionsNotify
        );
      }
      // Масив зображень
      const imageArray = hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      // Додаємо в попередній стейт новий масив зображень
      this.setState(prevState => ({
        images: prevState.images
          ? [...prevState.images, ...imageArray]
          : imageArray,
      }));
      if (totalPage > this.state.page) {
        this.setState({ buttonLoadMore: true });
      } else {
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          optionsNotify
        );
        this.setState({ buttonLoadMore: false });
      }
    } catch (error) {
      Notify.failure(
        'Oops! Something went wrong! Try reloading the page or make another choice!',
        optionsNotify
      );
    } finally {
      this.setState({ isLoading: false });
    }
  };
  // Метод обробки пошуку у формі
  handleSubmit = searchValue => {
    this.setState({
      search: searchValue,
      page: 1,
      images: null,
    });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      isLoading: true,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  //Відкриття модалки
  onOpenModal = (imgUrl, tag) => {
    this.setState({ showModal: true, imgUrl, tag });
  };

  render() {
    const {
      images,
      buttonLoadMore,
      isLoading,
      showModal,
      selectedImage,
      imgUrl,
      tags,
    } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        <Container>
          {images && (
            <ImageGallery images={images} openModal={this.onOpenModal} />
          )}
          {isLoading && <Loader />}
          {buttonLoadMore && <Button onClick={this.handleLoadMore} />}
          {showModal && (
            <Modal selectedImage={selectedImage} onClose={this.toggleModal}>
              <img src={imgUrl} alt={tags} />
            </Modal>
          )}
        </Container>
      </>
    );
  }
}

export default App;
