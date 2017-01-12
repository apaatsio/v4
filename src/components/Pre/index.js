/**
 * Pre component
 */


import React, { PropTypes } from 'react';
import styled from 'styled-components';
import theme from 'config';

const defaultProps = { theme };

class Pre extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    return (
      <pre className={this.props.className}>
        {this.props.children}
      </pre>
    );
  }

}

// eslint-disable-next-line no-class-assign
Pre = styled(Pre)`
  ${(props) => `
    /* Blocks of code */
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: ${props.theme['$code-font-size']};
    color: ${props.theme['$pre-color']};
    
    /* Enable scrollable blocks of code */
    /* AJT This class was present in bootstrap/scss/code.scss  We must decide if this class should be a mixin or not!*/
    &.pre-scrollable {
      max-height: ${props.theme['$pre-scrollable-max-height']};
      overflow-y: scroll;
    }

  
    /* Account for some code outputs that place code tags in pre tags */
    code {
      padding: 0;
      font-size: inherit;
      color: inherit;
      background-color: transparent;
      border-radius: 0;
    }
    
    /* Reboot Scss */

    /* Remove browser default top margin */
    margin-top: 0;
    /* Reset browser default of '1em' to use 'rem's */
    margin-bottom: 1rem;
    /* Normalize v4 removed this property, causing 'pre' content to break out of wrapping code snippets */
    overflow: auto;
    
    /* Bootstrap 4 does not place this css rule straight into Kbd tag see: bootstrap/scss/code.scss */
    font-family: ${props.theme['$font-family-monospace']};;
  `}
`;

Pre.defaultProps = defaultProps;

export default Pre;
