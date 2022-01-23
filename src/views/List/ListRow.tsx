import React, { cloneElement } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { useUIColor } from '../../hooks/useUIColor';
import { openURL } from '../Link/Link';

const SYSTEM_SPACE = 10;

export type ListRowProps = {
  hideSeparator?: boolean;
  separatorTint?: string;
  children: React.ReactElement;
};

export const ListRow = ({
  hideSeparator,
  children,
  separatorTint,
}: ListRowProps) => {
  const UIColor = useUIColor();
  const action = getAction(children);
  const buttonChild = cloneElement(children, {
    ...children.props,
    disabled: true,
  });

  const rowContent = (
    <View style={rowStyles.container}>
      <View style={rowStyles.contentContainer}>
        <View style={rowStyles.content}>{action ? buttonChild : children}</View>
        {!hideSeparator && (
          <View style={[rowStyles.separator, { borderColor: separatorTint }]} />
        )}
      </View>
    </View>
  );
  if (action) {
    return (
      <TouchableHighlight underlayColor={UIColor.systemGray4} onPress={action}>
        {rowContent}
      </TouchableHighlight>
    );
  }
  return rowContent;
};

const getAction = (children: React.ReactElement) => {
  if (children.props.destination) {
    return () => openURL(children.props.destination);
  }
  if (children.props.action) {
    return children.props.action;
  }
  if (children.props.onPress) {
    return children.props.onPress;
  }
  return null;
};

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    minHeight: 40,
    paddingVertical: SYSTEM_SPACE,
  },
  sideBarContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SYSTEM_SPACE,
    flexGrow: 1,
    minHeight: 40,
    height: '100%',
  },
  content: {
    flexGrow: 1,
    marginRight: SYSTEM_SPACE,
  },
  leading: {
    marginRight: SYSTEM_SPACE,
  },
  trailing: {
    marginRight: SYSTEM_SPACE,
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
  },
});
