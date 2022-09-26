import { useEffect, useState } from 'react';
import { BouncingLetters } from '../BouncingLetters/BouncingLetters';

export const TerminalLetters = ({
  textToType,
  typingSpeed = 120,
  timeToWaitBeforeTyping = 0,
  isBouncing = false
}) => {
  const [isStartTyping, setIsStartTyping] = useState(!timeToWaitBeforeTyping);
  const [terminalText, setTerminalText] = useState('');

  const handleTypingStart = () => setIsStartTyping(true);
  const handleTerminalType = () =>
    setTerminalText(textToType.substring(0, terminalText.length + 1));

  useEffect(() => {
    !isStartTyping && setTimeout(handleTypingStart, timeToWaitBeforeTyping);
    isStartTyping && setTimeout(handleTerminalType, typingSpeed);
  }, [isStartTyping, terminalText]);

  return (
    <>
      {isBouncing ? <BouncingLetters lettersToBounce={terminalText} /> : terminalText}
      {textToType.length !== terminalText.length && isStartTyping && ' _'}
    </>
  );
};
