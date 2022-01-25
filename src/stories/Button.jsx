import React from 'react';

import { useQuery, gql } from '@apollo/client';

import PropTypes from 'prop-types';
import './button.css';

const buttonEntryQuery = gql`
  query getButton {
    button(id: "7m5Vmb1MDeQo69ek1XF4ft", preview: true) {
      primary
      backgroundColor
      size
      label
    }
  }
`;

function useFetchInfo() {
  const { loading, error, data } = useQuery(buttonEntryQuery);
  return { loading, error, data };
}

/**
 * Primary UI component for user interaction
 */
export const Button = () => {
  const { loading, error, data } = useFetchInfo();

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>There was an error fetching the data! {error}</p>;
  }
  
  const backgroundColor = data.button.backgroundColor;
  const mode = data.button.primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${data.button.size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
    >
      {data.button.label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
