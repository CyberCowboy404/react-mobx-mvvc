import { PropTypes } from 'prop-types';

export const BooksType = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      author: PropTypes.string,
      ownerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  visible: PropTypes.bool,
};
