import { IconProps } from './icon-type';

export function IconArticle({ outlined, size, title }: IconProps) {
  const sizeInPx = `${size}px`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={sizeInPx}
      viewBox="0 -960 960 960"
      width={sizeInPx}
      fill="#e8eaed"
      aria-label={title}
    >
      {outlined ? (
        <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
      ) : (
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-160h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Z" />
      )}
    </svg>
  );
}
