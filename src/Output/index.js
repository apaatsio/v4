/* A Output (Box) */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styled from 'styled-components';

class OutputUnstyled extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      ...rest
    } = this.props;

    return (
      <output
        className={cn(className, 'output')}
        {...rest}
      >
      </output>
    );
  }
}

const Output = styled(OutputUnstyled)`
  &.output {
    display: inline-block;
  }
`;

/** @component */
export default Output;
