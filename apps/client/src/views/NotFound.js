import React, { useEffect } from 'react';
import '../styles/NotFound.css'; 

/**
 * NotFound component that renders a 404 error page.
 *
 * This component displays a 404 error message indicating that the requested page was not found.
 * It includes a count-up animation effect to emphasize the "404" number.
 * The animation is implemented using the `useEffect` hook to format and animate the number.
 *
 * @component
 */

const NotFound = () => {
  useEffect(() => {
    const formatThousandsNoRounding = (n, dp) => {
      let e = '', s = e + n, l = s.length, b = n < 0 ? 1 : 0,
          i = s.lastIndexOf(','), j = i === -1 ? l : i,
          r = e, d = s.substr(j + 1, dp);
      while ((j -= 3) > b) { r = '.' + s.substr(j, 3) + r; }
      return s.substr(0, j + 3) + r +
        (dp ? ',' + d + (d.length < dp ?
          ('00000').substr(0, dp - d.length) : e) : e);
    };

    const runCountUp = () => {
      document.querySelectorAll('.number').forEach(function (elem) {
        const countTo = elem.getAttribute('data-count');
        const countNum = { count: 0 };
        const duration = 2000;
        const start = performance.now();

        const step = (timestamp) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          countNum.count = Math.floor(progress * countTo);
          elem.textContent = formatThousandsNoRounding(countNum.count);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            elem.textContent = formatThousandsNoRounding(countTo);
          }
        };

        requestAnimationFrame(step);
      });
    };

    runCountUp();
  }, []);

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="row">
          <div className="xs-12 md-6 mx-auto">
            <div id="countUp">
              <div className="number" data-count="404">0</div>
              <div className="text">Page not found</div>
              <div className="text">The page you tried to access doesn't exist.</div>
              <div className="text">Please go to the <a href="/">main page</a> and navigate from there.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
