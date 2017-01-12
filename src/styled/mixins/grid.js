import { mediaBreakpointUp } from './breakpoints';
import { clearfix } from './clearfix';
import { toPercent, rmUnit, detectUnit } from '../mixins/unit';

export const defaultProps = {
  '$grid-gutter-widths': {
    xs: '30px',
    sm: '30px',
    md: '30px',
    lg: '30px',
    xl: '30px',
  },
  '$container-max-widths': {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
  },
  '$grid-breakpoints': {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  '$grid-columns': 12,
  '$enable-grid-classes': true,
  '$enable-flex': false,
};

// Grid system
//
// Generate semantic grid columns with these mixins.

export function makeContainer(enableFlex = defaultProps['$enable-flex'], enableGridClasses = defaultProps['$enable-grid-classes'], gridGutterWidths = defaultProps['$grid-gutter-widths']) {
  if (enableGridClasses) {
    const columns = [];
    Object.keys(gridGutterWidths).forEach((breakpoint) => {
      const gutter = gridGutterWidths[breakpoint];
      const column = mediaBreakpointUp(breakpoint, gutter, `
        padding-right: ${rmUnit(gutter) / 2}${detectUnit(gutter)};
        padding-left:  ${rmUnit(gutter) / 2}${detectUnit(gutter)};
      `);
      columns.push(column);
    });
    return `
      margin-left: auto;
      margin-right: auto;
    
      ${!enableFlex ? clearfix() : ''}
    
      ${columns.join('\n')}
    `;
  }
  return '';
}

// For each breakpoint, define the maximum width of the container in a media query
export function makeContainerMaxWidths(enableGridClasses = defaultProps['$enable-grid-classes'], containerMaxWidths = defaultProps['$container-max-widths'], gridBreakpoints = defaultProps['$grid-breakpoints']) {
  if (enableGridClasses) {
    const maximumWidthList = [];
    Object.keys(containerMaxWidths).forEach((breakpoint) => {
      const maximumWidth = mediaBreakpointUp(breakpoint, gridBreakpoints, `
        width: ${containerMaxWidths[breakpoint]};
        max-width: 100%;
      `);
      maximumWidthList.push(maximumWidth);
    });
    return `
      ${maximumWidthList.join('\n')}
    `;
  }
  return '';
}

export function makeGutters(gridGutterWidths = defaultProps['$grid-gutter-widths']) {
  const gutterList = [];
  Object.keys(gridGutterWidths).forEach((breakpoint) => {
    let gutterValue = gridGutterWidths[breakpoint];
    gutterValue = `${rmUnit(gutterValue) / 2}${detectUnit(gutterValue)}`;
    const gutter = mediaBreakpointUp(breakpoint, gridGutterWidths, `
      padding-right: ${gutterValue};
      padding-left:  ${gutterValue};
    `);
    gutterList.push(gutter);
  });
  return `
    ${gutterList.join('\n')}
  `;
}

export function makeRow(enableFlex = defaultProps['$enable-flex'], enableGridClasses = defaultProps['$enable-grid-classes'], gridGutterWidths = defaultProps['$grid-gutter-widths']) {
  if (enableGridClasses) {
    let clear;
    if (enableFlex) {
      clear = `
        display: flex;
        flex-wrap: wrap;
      `;
    } else {
      clear = clearfix();
    }

    const rowList = [];
    Object.keys(gridGutterWidths).forEach((breakpoint) => {
      let gutter = gridGutterWidths[breakpoint];
      gutter = `${rmUnit(gutter) / -2}${detectUnit(gutter)}`;
      const row = `
        margin-right: ${gutter};
        margin-left:  ${gutter};
      `;
      rowList.push(row);
    });
    return `
      ${clear}
  
      ${rowList.join('\n')}
    `;
  }
  return '';
}

export function makeColReady(enableFlex = defaultProps['$enable-flex'], gridGutterWidths = defaultProps['$grid-gutter-widths']) {
  const flexWidth = enableFlex ? 'width: 100%;' : '';

  const colReadyList = [];
  Object.keys(gridGutterWidths).forEach((breakpoint) => {
    let gutter = gridGutterWidths[breakpoint];
    gutter = `${rmUnit(gutter) / 2}${detectUnit(gutter)}`;
    const colReady = mediaBreakpointUp(breakpoint, gridGutterWidths, `
      padding-right: ${gutter};
      padding-left:  ${gutter};
    `);
    colReadyList.push(colReady);
  });
  return `
    position: relative;
    min-height: 1px; /* Prevent collapsing */

    /* Prevent columns from becoming too narrow when at smaller grid tiers by */
    /* always setting 'width: 100%;'. This works because we use 'flex' values */
    /* later on to override this initial width. */
    ${flexWidth}

    ${colReadyList.join('\n')}
  `;
}

export function makeCol(enableFlex = defaultProps['$enable-flex'], size, columns = defaultProps['$grid-columns']) {
  let col;
  if (enableFlex) {
    col = `
      flex: 0 0 ${toPercent(size, columns)};
      /* Add a 'max-width' to ensure content within each column does not blow out */
      /* the width of the column. Applies to IE10+ and Firefox. Chrome and Safari */
      /* do not appear to require this. */
      max-width: ${toPercent(size, columns)};
    `;
  } else {
    col = `
      float: left;
      width: ${toPercent(size, columns)};
    `;
  }
  return `
    ${col}
  `;
}

export function makeColOffset($size, columns = defaultProps['$grid-columns']) {
  return `
    margin-left: ${toPercent($size, columns)};
  `;
}

export function makeColPush(size, columns = defaultProps['$grid-columns']) {
  return `
    left: ${size > 0 ? toPercent(size, columns) : 'auto'};
  `;
}

export function makeColPull(size, columns = defaultProps['$grid-columns']) {
  return `
    right: ${size > 0 ? toPercent(size, columns) : 'auto'};
  `;
}

export function makeColModifier(type, size, columns) {
  const TYPE = {
    PUSH: 'push',
    PULL: 'pull',
    OFFSET: 'offset',
  };

  let modifier = '';
  if (type === TYPE.PUSH) {
    modifier = makeColPush(size, columns);
  } else if (type === TYPE.PULL) {
    modifier = makeColPull(size, columns);
  } else if (type === TYPE.OFFSET) {
    modifier = makeColOffset(size, columns);
  }
  return `
    ${modifier}
  `;
}

export default {
  defaultProps,
  makeContainer,
  makeContainerMaxWidths,
  makeGutters,
  makeRow,
  makeColReady,
  makeCol,
  makeColOffset,
  makeColPush,
  makeColPull,
  makeColModifier,
};