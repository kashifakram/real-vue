import Velocity from 'velocity-animate';
function beforeEnterProfile(el) {
  el.style.opacity = 0;
  el.style.width = '0em';
}

function enterProfile(el, done) {
  Velocity(
    el,
    { opacity: 1, width: '12em' },
    { duration: 1000, easing: 'easeOutCubic', complete: done }
  );
}

function leaveProfile(el, done) {
  Velocity(
    el,
    { opacity: 0, width: '0em' },
    { duration: 500, easing: 'easeInCubic', complete: done }
  );
}
export { beforeEnterProfile, enterProfile, leaveProfile };
