import TipCard from "../TipCard";

export default function TipCardExample() {
  return (
    <div className="p-6 max-w-3xl">
      <TipCard
        title="Use Debouncing to Optimize Event Handlers"
        topic="Performance"
        language="JavaScript"
        difficulty="Intermediate"
        code={`function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`}
        explanation="Debouncing is a technique to limit the rate at which a function is called. This is particularly useful for event handlers like scroll, resize, or search input events. By delaying the execution until after the user has stopped triggering the event for a specified period, you can significantly improve performance."
        readingTime="4 min"
        isFeatured={true}
      />
    </div>
  );
}
