import { Component } from 'react';
import {
  SearchContainer,
  SearchButton,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';
import { RiUserSearchLine } from 'react-icons/ri';
import { Notify } from 'notiflix';
import { optionsNotify } from 'components/NotifyOptions/Notify';

class SearchBar extends Component {
  state = {
    textQuery: '',
  };

  onChangeInput = evt => {
    this.setState({ textQuery: evt.currentTarget.value.trim().toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { textQuery } = this.state;
    const { onSubmit } = this.props;

    if (textQuery === '') {
      Notify.info('Enter your request, please!', optionsNotify);
      return;
    }
    onSubmit(textQuery);

    this.setState({ textQuery: '' });
  };

  render() {
    const { textQuery } = this.state;
    return (
      <SearchContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <RiUserSearchLine />
          </SearchButton>
          <SearchInput
            value={textQuery}
            onChange={this.onChangeInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchContainer>
    );
  }
}

export default SearchBar;
