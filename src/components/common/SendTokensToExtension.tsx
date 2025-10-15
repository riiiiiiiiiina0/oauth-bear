'use client';

import { useEffect } from 'react';
import { TokenResponse } from '../oauth/types';
import { sendMessageToExtension } from '@/utils/extensions/messaging';

export const SendTokensToExtension = ({
  provider,
  tokens,
  extensionId,
}: {
  provider: string;
  tokens: TokenResponse;
  extensionId?: string;
}) => {
  useEffect(() => {
    if (extensionId && extensionId.length > 0) {
      try {
        sendMessageToExtension(extensionId, {
          type: 'oauth_success',
          provider,
          tokens,
        });
      } catch (error) {
        console.error('Failed to send message to extension:', error);
      }
    }
  }, [extensionId, provider, tokens]);

  return null;
};
