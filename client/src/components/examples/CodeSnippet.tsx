import CodeSnippet from "../CodeSnippet";

export default function CodeSnippetExample() {
  const code = `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`;

  return (
    <div className="p-6">
      <CodeSnippet code={code} language="JavaScript" />
    </div>
  );
}
