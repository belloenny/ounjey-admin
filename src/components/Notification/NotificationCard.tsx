import React from 'react';
import {
  Title,
  Message,
  TitleWrapper,
  Dot,
  Details,
} from './Notification.style';

export default function NotificationCard({title, message}) {
  return (
    <Message>
      <TitleWrapper>
        <Title>{title}</Title>
        <Dot />
      </TitleWrapper>
      <Details>{message}</Details>
    </Message>
  );
}
