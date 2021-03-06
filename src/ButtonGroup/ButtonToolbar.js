/**
 * ButtonToolbar
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styled from 'styled-components';
import omit from 'lodash.omit';
import mapToCssModules from 'map-to-css-modules';
import { buttonGroup } from '@bootstrap-styled/css-mixins/lib/buttonGroup';

export const defaultProps = {
  tag: 'div',
  role: 'toolbar',
  theme: {
    '$input-btn-border-width': '1px',
    '$btn-padding-x': '1rem',
    '$btn-active-box-shadow': 'inset 0 3px 5px rgba(0, 0, 0, 0.125)',
    '$btn-padding-x-lg': '1.5rem',
    '$btn-padding-y-lg': '.75rem',
    '$font-size-lg': '1.25rem',
    '$btn-padding-x-sm': '.5rem',
    '$btn-padding-y-sm': '.25rem',
    '$font-size-sm': '.875rem',
    '$btn-border-radius-lg': '.3rem',
    '$btn-border-radius-sm': '.2rem',
    '$enable-rounded': true,
    '$enable-shadows': true,
  },
};
export const propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /** @ignore */
  role: PropTypes.string,
  /**
   * Replace the default component tag by the one specified. Can be:
   */
  tag: PropTypes.any,
  /** Theme variables. Can be: */
  theme: PropTypes.shape({
    '$input-btn-border-width': PropTypes.string,
    '$btn-padding-x': PropTypes.string,
    '$btn-active-box-shadow': PropTypes.string,
    '$btn-padding-x-lg': PropTypes.string,
    '$btn-padding-y-lg': PropTypes.string,
    '$font-size-lg': PropTypes.string,
    '$btn-padding-x-sm': PropTypes.string,
    '$btn-padding-y-sm': PropTypes.string,
    '$font-size-sm': PropTypes.string,
    '$btn-border-radius-lg': PropTypes.string,
    '$btn-border-radius-sm': PropTypes.string,
    '$enable-rounded': PropTypes.bool,
    '$enable-shadows': PropTypes.bool,
  }),
  /**
   * Replace or remove a className from the component.
   * See example <a href="https://www.npmjs.com/package/map-to-css-modules" target="_blank">here</a>.
   */
  cssModule: PropTypes.object,
};

class ButtonToolbarUnstyled extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  render() {
    const {
      className,
      cssModule,
      tag: Tag,
      ...attributes
    } = omit(this.props, ['theme']);

    return (
      <Tag
        className={mapToCssModules(cn(
          className,
          'btn-toolbar'
        ), cssModule)}
        {...attributes}
      />
    );
  }
}
/**
 * Button with toolbar like CSS style and display.
 */
const ButtonToolbar = styled(ButtonToolbarUnstyled)`
  ${(props) => `
    ${buttonGroup(
    props.theme['$enable-shadows'],
    props.theme['$enable-rounded'],
    props.theme['$input-btn-border-width'],
    props.theme['$btn-padding-x'],
    props.theme['$btn-active-box-shadow'],
    props.theme['$btn-padding-x-lg'],
    props.theme['$btn-padding-y-lg'],
    props.theme['$font-size-lg'],
    props.theme['$btn-border-radius-lg'],
    props.theme['$btn-padding-x-sm'],
    props.theme['$btn-padding-y-sm'],
    props.theme['$font-size-sm'],
    props.theme['$btn-border-radius-sm']
  )}
  `}  
`;

ButtonToolbar.defaultProps = defaultProps;
ButtonToolbar.propTypes = propTypes;

/** @component */
export default ButtonToolbar;
