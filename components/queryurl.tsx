import { useRef, useState } from 'react';

const QueryForm = ({ queryURL }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const copyTextAreaToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    textAreaRef.current.select();
    document.execCommand('copy');
    setCopySuccess('URL copied to Clipboard');
  };
  if (process.browser) {
    return (
      <div style={{ color: 'white', marginTop: '0.5rem' }}>
        <form style={{ display: 'flex' }}>
          <textarea
            style={{
              width: '80%',
              whiteSpace: 'nowrap',
              overflow: 'auto',
              color: '#FFF',
              backgroundColor: '#000',
              border: 'none',
            }}
            rows={1}
            readOnly
            ref={textAreaRef}
            value={`https://r0mvptracker.now.sh/?${queryURL}`}
          />
          <button
            style={{
              border: 'none',
              backgroundColor: '#FFF',
              marginLeft: '0.5rem',
              width: '20%',
            }}
            onClick={copyTextAreaToClipboard}
          >
            Copy
          </button>
        </form>
        {/* Logical shortcut for only displaying the 
          button if the copy command exists */
        document.queryCommandSupported('copy') && <div>{copySuccess}</div>}
      </div>
    );
  } else {
    return null;
  }
};
export default QueryForm;
