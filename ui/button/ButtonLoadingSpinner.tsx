import './Button.css';

export function ButtonLoadingSpinner() {
  return (
    <span className="button-spinner">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" pathLength="1" />
      </svg>
    </span>
  );
}
