export function highlightText(text, term) {
    if (!term || !text) return text;
  
    const regex = new RegExp(`(${term})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: 'red', color: 'white' }}>{part}</span>
      ) : (
        part
      )
    );
  }
  