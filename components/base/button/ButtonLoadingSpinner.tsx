import { css } from '@emotion/react';

export function ButtonLoadingSpinner() {
  return (
    <span css={spinnerStyle}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" pathLength="1" />
      </svg>
    </span>
  );
}

const spinnerStyle = css`
  display: inline-block;
  animation: spin 2s linear infinite;
  width: 18px;
  height: 18px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  svg circle {
    fill: none;
    stroke: #edf7ff;
    stroke-width: 10;
    // A stroke pattern of this stroke-dasharray: [... sssssss]
    // .: Dots
    // s: Spaces
    stroke-dasharray: 0.25 0.75;
    stroke-linecap: round;
    // NOTE: By changing the start point of the stroke pattern,
    // you get stroke tail removing animation, which would look like gradually
    // removing the stroke part(0.25, in our case) of the pattern.
    // When combined with a rotation animation,
    // it looks like it is a line circling with a trail.
    stroke-dashoffset: 1;
    animation: dash-trail 1.5s ease-in-out infinite;
  }

  @keyframes dash-trail {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -1;
    }
  }
`;
