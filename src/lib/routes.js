/**
 * Route helper for 1:1 mapping with Laravel named routes.
 * Usage: route('home'), route('booking', 5), route('booking') 
 */

const routes = {
  home: '/home',
  coating: '/coating',
  enhance: '/enhance_and_seal',
  paint: '/paint_correction',
  interior: '/interior',
  exterior: '/exterior',
  full: '/full_packages',
  faq: '/FAQs',
  gallery: '/gallery',
  booking: '/booking',
  bookingFinal: '/api/booking',
  dashboard: '/dashboard',
  'profile.edit': '/profile',
  login: '/login',
  register: '/register',
  logout: '/api/auth/signout', // NextAuth signOut (POST from form or signOut())
  'password.request': '/forgot-password',
  'password.email': '/forgot-password',
  'password.reset': '/reset-password',
  'password.store': '/api/auth/reset-password',
  'password.update': '/api/auth/update-password',
  'password.confirm': '/confirm-password',
  'verification.notice': '/verify-email',
  'verification.verify': '/verify-email',
  'verification.send': '/verify-email',
  'profile.destroy': '/api/auth/profile',
};

/**
 * @param {string} name - Route name (e.g. 'home', 'booking', 'profile.edit')
 * @param {string|number|Record<string, string|number>} [params] - Optional param (e.g. package_id) or object of params
 * @returns {string} URL path
 */
export function route(name, params) {
  const path = routes[name];
  if (path == null) return '/';
  if (params === undefined || params === null) return path;
  // Single param for dynamic segment (e.g. booking/5)
  if (typeof params === 'object' && !Array.isArray(params)) {
    let url = path;
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`[${key}]`, String(value));
    });
    return url;
  }
  // booking(id) -> /booking/5
  if (name === 'booking' && params !== undefined) {
    const id = Number(params);
    return id >= 0 ? `/booking/${id}` : '/booking';
  }
  return path;
}

/**
 * Check if current pathname matches the given route (for active nav state).
 * @param {string} pathname - Current pathname from usePathname()
 * @param {string} name - Route name
 * @returns {boolean}
 */
export function isCurrentRoute(pathname, name) {
  const path = routes[name];
  if (!path) return false;
  if (pathname === path) return true;
  // Dynamic segment: e.g. /booking/0 matches booking
  if (name === 'booking' && pathname.startsWith('/booking')) return true;
  return false;
}

export default routes;
