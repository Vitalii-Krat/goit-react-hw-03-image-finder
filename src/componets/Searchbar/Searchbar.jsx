import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

import {
  SearchbarStyle,
  SearchForm,
  SearchFormLabel,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    queryUser: '',
  };

  handlerChangeUserQuery = e => {
    this.setState({
      queryUser: e.target.value,
    });
  };

  handelSubmitUserQuery = e => {
    e.preventDefault();
    if (this.state.queryUser === '') {
      return alert('Sorry, you need write something to start searching');
    }
    this.props.onSubmit(this.state.queryUser);
    this.setState({ queryUser: '' });
  };

  render() {
    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handelSubmitUserQuery}>
          <IconContext.Provider value={{ color: 'black', size: '25px' }}>
            <SearchFormButton type="submit">
              <FaSearch />
              <SearchFormLabel>Search</SearchFormLabel>
            </SearchFormButton>
          </IconContext.Provider>

          <SearchFormInput
            type="text"
            value={this.state.queryUser}
            onChange={this.handlerChangeUserQuery}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarStyle>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
