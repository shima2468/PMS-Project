import React from 'react';
import Select, { components } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';

const height = 35;

const MenuList = (props: any) => {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <components.MenuList {...props}>
      <List
        height={Math.min(maxHeight, options.length * height)}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
        width="100%"
      >
        {({ index, style }: ListChildComponentProps) => (
          <div style={style}>{children[index]}</div>
        )}
      </List>
    </components.MenuList>
  );
};

const VirtualizedSelect = (props: any) => (
  <Select {...props} components={{ MenuList }} isSearchable />
);

export default VirtualizedSelect;
