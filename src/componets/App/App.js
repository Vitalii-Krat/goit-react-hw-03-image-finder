import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArticleConteiner } from './App.styled';
import Modal from '../Modal';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import ImagesAPI from '../../services/ImagesAPI';
import ButtonLoad from '../Button';
import Loader from '../Loader';

class App extends Component {
  state = {
    images: null,
    page: 1,
    query: '',
    error: '',
    status: 'idle',
    activeImge: '',
    showModal: false,
    visible: true,
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ images: [], status: 'pending' });
    }

    if (prevState.query !== query || prevState.page !== page) {
      if (page > 1) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }

      this.setState({ status: 'pending', visible: true });
      ImagesAPI.fetchImages(query, page)
        .then(({ hits }) => {
          if (!query) {
            this.setState({ status: 'idle' });
            return this.notify();
          }

          if (hits.length === 0) {
            this.setState({ status: 'resolved', visible: false });
            return this.notify();
          }

          this.setState(({ images }) => ({
            images: [...images, ...hits],
            status: 'resolved',
          }));

          if (page > 1) {
            this.scrollTo();
          }
          return hits;
        })
        .then(hits => this.scrollTo())
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handlerClickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handlerSubmitUserQuery = query => {
    this.setState({ query: query.trim(), page: 1 });
  };

  notify = () =>
    toast.error(
      `No results were found matching your search for "${this.state.query}" Try something else!`,
    );

  handleronClickImage = (activeImge, tags) => {
    this.setState({ activeImge, tags });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { images, status, error, activeImge, showModal, tags, visible } =
      this.state;

    if (status === 'idle') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-right" autoClose={3000} />
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
        </ArticleConteiner>
      );
    }

    if (status === 'rejected') {
      return (
        <ArticleConteiner>
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
          <h2>{error.massage}</h2>
        </ArticleConteiner>
      );
    }

    if (status === 'pending') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-right" autoClose={3000} />
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={this.handleronClickImage}
          />
          <Loader />
        </ArticleConteiner>
      );
    }

    if (status === 'resolved') {
      return (
        <ArticleConteiner>
          <ToastContainer position="top-right" autoClose={3000} />
          <Searchbar onSubmit={this.handlerSubmitUserQuery} />
          <ImageGallery
            userImages={images}
            onClick={this.handleronClickImage}
          />
          {images.length && visible && (
            <ButtonLoad onClick={this.handlerClickLoadMore} />
          )}
          {showModal && (
            <Modal image={activeImge} tags={tags} onClose={this.toggleModal} />
          )}
        </ArticleConteiner>
      );
    }
  }
}

export default App;
