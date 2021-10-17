import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

type CaptionProps = {
  caption: string | ReactElement<any>;
};

export const Caption = ({ caption }: CaptionProps) => {
  return typeof caption === 'string' ? (
    <Text style={styles.caption}>{caption}</Text>
  ) : (
    caption
  );
};

const styles = StyleSheet.create({
  caption: {
    fontWeight: '500',
    marginLeft: '3%',
    marginVertical: 10,
  },
});
