import React, { PropsWithChildren, ReactElement, useContext } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { useUIColor } from '../../../hooks/useUIColor';
import { useLifecycle } from '../../../hooks/useLifecycle';
import { getBorder } from '../../../utils/border';
import { getFrame } from '../../../utils/frame';
import { Modifiers } from '../../../utils/modifiers';
import { getPadding } from '../../../utils/padding';
import { getShadow } from '../../../utils/shadow';
import { ListStyleContext } from '../ListStyleProvider';
import { getCornerRadius } from '../../../utils/cornerRadius';

const SYSTEM_SPACE = 10;

export type ListRowProps = Modifiers &
  PropsWithChildren<{
    leading?: ReactElement<any> | null;
    trailing?: ReactElement<any> | null;
    hideSeparator?: boolean;
    action?: () => void;
  }>;

export const ListRow = ({
  leading,
  trailing,
  backgroundColor,
  hideSeparator,
  action,
  cornerRadius,
  padding,
  border,
  frame,
  shadow,
  opacity,
  zIndex,
  children,
  style,
  onAppear,
  onDisappear,
}: ListRowProps) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  const { sideBar, separatorColor } = useContext(ListStyleContext);
  const rowContent = sideBar ? (
    <View
      style={[
        rowStyles.container,
        backgroundColor && { backgroundColor },
        {
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getShadow(shadow),
        },
        style,
      ]}
    >
      <View
        style={[
          {
            marginHorizontal: leading ? 2 * SYSTEM_SPACE : SYSTEM_SPACE,
          },
        ]}
      >
        {leading}
      </View>
      <View style={rowStyles.sideBarContentContainer}>
        <View style={rowStyles.content}>{children}</View>
        {trailing && <View style={rowStyles.trailing}>{trailing}</View>}
        {!hideSeparator && (
          <View
            style={[rowStyles.separator, { borderColor: separatorColor }]}
          />
        )}
      </View>
    </View>
  ) : (
    <View
      style={[
        rowStyles.container,
        backgroundColor && { backgroundColor },
        {
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getShadow(shadow),
        },
        style,
      ]}
    >
      <View style={rowStyles.contentContainer}>
        {leading && <View style={rowStyles.leading}>{leading}</View>}
        <View style={rowStyles.content}>{children}</View>
        {trailing && <View style={rowStyles.trailing}>{trailing}</View>}
        {!hideSeparator && (
          <View
            style={[
              rowStyles.separator,
              separatorColor && { borderColor: separatorColor },
            ]}
          />
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
