export const timer = (id, deadline) => {
  const addZero = (num) => (num <= 9 ? `0${num}` : num);

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor(((total / 1000) * 60 * 60) % 24),
      days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      seconds,
      minutes,
      hours,
      days,
    };
  };

  const setClock = (selector, endTime) => {
    const updateClock = () => {
      const t = getTimeRemaining(endTime);

      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
      }
    };

    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();
  };
  setClock(id, deadline);
};
