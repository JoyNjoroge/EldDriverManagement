import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import COLORS from '../../styles/colors';

export const Textarea = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  disabled = false,
  numberOfLines = 4,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[
          styles.label,
          error && styles.labelError,
          disabled && styles.labelDisabled
        ]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.textareaContainer,
        error && styles.textareaContainerError,
        disabled && styles.textareaContainerDisabled
      ]}>
        <TextInput
          style={[
            styles.textarea,
            disabled && styles.textareaDisabled
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY_400}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          editable={!disabled}
          selectTextOnFocus={!disabled}
          {...props}
        />
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_700,
    marginBottom: 8,
  },
  labelError: {
    color: COLORS.ERROR,
  },
  labelDisabled: {
    color: COLORS.GRAY_400,
  },
  textareaContainer: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GRAY_300,
    borderRadius: 8,
    overflow: 'hidden',
  },
  textareaContainerError: {
    borderColor: COLORS.ERROR,
  },
  textareaContainerDisabled: {
    backgroundColor: COLORS.GRAY_100,
    borderColor: COLORS.GRAY_300,
  },
  textarea: {
    padding: 12,
    fontSize: 16,
    color: COLORS.GRAY_800,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  textareaDisabled: {
    color: COLORS.GRAY_500,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.ERROR,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Textarea;