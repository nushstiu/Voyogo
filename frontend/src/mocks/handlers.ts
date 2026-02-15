import { http, HttpResponse, delay } from 'msw';
import { API_ENDPOINTS } from '../constants';
import {
  MOCK_USERS,
  MOCK_DESTINATIONS,
  MOCK_TOURS,
  MOCK_BOOKINGS,
} from '../data';
import type {
  User,
  Destination,
  Tour,
  Booking,
  CreateBookingData,
} from '../types';

// Clone data to allow mutations
let users = [...MOCK_USERS];
let destinations = [...MOCK_DESTINATIONS];
let tours = [...MOCK_TOURS];
let bookings: Booking[] = MOCK_BOOKINGS.map((b) => ({
  ...b,
  tour_name: MOCK_TOURS.find((t) => t.id === b.tour_id)?.name,
  updated_at: b.created_at,
}));

export const handlers = [
  // Auth endpoints
  http.get(API_ENDPOINTS.AUTH_ME, async () => {
    await delay(200);
    return HttpResponse.json(users[1]);
  }),

  // ── Users ──────────────────────────────────────────────
  http.get(API_ENDPOINTS.USERS, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const role = url.searchParams.get('role');

    let filtered = [...users];
    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search)
      );
    }
    if (role && role !== 'all') {
      filtered = filtered.filter((u) => u.role === role);
    }
    return HttpResponse.json(filtered);
  }),

  http.get(`${API_ENDPOINTS.USERS}/:id`, async ({ params }) => {
    await delay(200);
    const user = users.find((u) => u.id === params.id);
    if (!user) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(user);
  }),

  http.post(API_ENDPOINTS.USERS, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<User>;
    const user: User = {
      id: crypto.randomUUID(),
      username: body.username!,
      email: body.email!,
      phone: body.phone,
      country: body.country,
      profile_pic: null,
      role: body.role || 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    users.push(user);
    return HttpResponse.json(user, { status: 201 });
  }),

  http.put(`${API_ENDPOINTS.USERS}/:id`, async ({ params, request }) => {
    await delay(300);
    const updates = (await request.json()) as Partial<User>;
    const index = users.findIndex((u) => u.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() };
    return HttpResponse.json(users[index]);
  }),

  http.delete(`${API_ENDPOINTS.USERS}/:id`, async ({ params }) => {
    await delay(300);
    const index = users.findIndex((u) => u.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    users.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // ── Destinations ───────────────────────────────────────
  http.get(API_ENDPOINTS.DESTINATIONS, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();

    let filtered = [...destinations];
    if (search) {
      filtered = filtered.filter((d) => d.name.toLowerCase().includes(search));
    }
    return HttpResponse.json(filtered);
  }),

  http.get(`${API_ENDPOINTS.DESTINATIONS}/:id`, async ({ params }) => {
    await delay(200);
    const dest = destinations.find((d) => d.id === Number(params.id));
    if (!dest) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(dest);
  }),

  http.post(API_ENDPOINTS.DESTINATIONS, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<Destination>;
    const dest: Destination = {
      id: Math.max(...destinations.map((d) => d.id), 0) + 1,
      name: body.name!,
      packages: body.packages!,
      price_range: body.price_range!,
      image: body.image!,
      description: body.description!,
      created_at: new Date().toISOString(),
    };
    destinations.push(dest);
    return HttpResponse.json(dest, { status: 201 });
  }),

  http.put(`${API_ENDPOINTS.DESTINATIONS}/:id`, async ({ params, request }) => {
    await delay(300);
    const updates = (await request.json()) as Partial<Destination>;
    const index = destinations.findIndex((d) => d.id === Number(params.id));
    if (index === -1) return new HttpResponse(null, { status: 404 });
    destinations[index] = { ...destinations[index], ...updates };
    return HttpResponse.json(destinations[index]);
  }),

  http.delete(`${API_ENDPOINTS.DESTINATIONS}/:id`, async ({ params }) => {
    await delay(300);
    const index = destinations.findIndex((d) => d.id === Number(params.id));
    if (index === -1) return new HttpResponse(null, { status: 404 });
    destinations.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // ── Tours ──────────────────────────────────────────────
  http.get(API_ENDPOINTS.TOURS, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const location = url.searchParams.get('location');
    const status = url.searchParams.get('status');
    const destId = url.searchParams.get('destination_id');

    let filtered = [...tours];
    if (search) filtered = filtered.filter((t) => t.name.toLowerCase().includes(search));
    if (location) filtered = filtered.filter((t) => t.location === location);
    if (status && status !== 'all') filtered = filtered.filter((t) => t.status === status);
    if (destId) filtered = filtered.filter((t) => t.destination_id === Number(destId));
    return HttpResponse.json(filtered);
  }),

  http.get(`${API_ENDPOINTS.TOURS}/:id`, async ({ params }) => {
    await delay(200);
    const tour = tours.find((t) => t.id === params.id);
    if (!tour) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(tour);
  }),

  http.post(API_ENDPOINTS.TOURS, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as Partial<Tour>;
    const tour: Tour = {
      id: crypto.randomUUID(),
      location: body.location!,
      name: body.name!,
      price: body.price!,
      days: body.days!,
      description: body.description!,
      image: body.image!,
      destination_id: body.destination_id!,
      status: body.status || 'active',
      created_at: new Date().toISOString(),
    };
    tours.push(tour);
    return HttpResponse.json(tour, { status: 201 });
  }),

  http.put(`${API_ENDPOINTS.TOURS}/:id`, async ({ params, request }) => {
    await delay(300);
    const updates = (await request.json()) as Partial<Tour>;
    const index = tours.findIndex((t) => t.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    tours[index] = { ...tours[index], ...updates };
    return HttpResponse.json(tours[index]);
  }),

  http.delete(`${API_ENDPOINTS.TOURS}/:id`, async ({ params }) => {
    await delay(300);
    const index = tours.findIndex((t) => t.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    tours.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // ── Bookings ───────────────────────────────────────────
  http.get(API_ENDPOINTS.BOOKINGS, async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const status = url.searchParams.get('status');
    const destination = url.searchParams.get('destination');
    const tourId = url.searchParams.get('tourId');
    const fromDate = url.searchParams.get('fromDate');
    const toDate = url.searchParams.get('toDate');
    const search = url.searchParams.get('search')?.toLowerCase();

    let filtered = [...bookings];
    if (userId) filtered = filtered.filter((b) => b.user_id === userId);
    if (status && status !== 'all') filtered = filtered.filter((b) => b.status === status);
    if (destination) filtered = filtered.filter((b) => b.destination === destination);
    if (tourId) filtered = filtered.filter((b) => b.tour_id === tourId);
    if (fromDate) filtered = filtered.filter((b) => b.booking_date >= fromDate);
    if (toDate) filtered = filtered.filter((b) => b.booking_date <= toDate);
    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(search) ||
          b.surname.toLowerCase().includes(search) ||
          b.email.toLowerCase().includes(search) ||
          b.destination.toLowerCase().includes(search)
      );
    }
    return HttpResponse.json(filtered);
  }),

  http.get(`${API_ENDPOINTS.BOOKINGS}/:id`, async ({ params }) => {
    await delay(200);
    const booking = bookings.find((b) => b.id === params.id);
    if (!booking) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(booking);
  }),

  http.post(API_ENDPOINTS.BOOKINGS, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as CreateBookingData & { user_id: string };
    const tourName = tours.find((t) => t.id === body.tour_id)?.name;
    const booking: Booking = {
      id: crypto.randomUUID(),
      user_id: body.user_id,
      name: body.name,
      surname: body.surname,
      email: body.email,
      phone: body.phone,
      destination: body.destination,
      tour_id: body.tour_id,
      tour_name: tourName,
      booking_date: body.booking_date,
      duration: body.duration,
      notes: body.notes,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    bookings.push(booking);
    return HttpResponse.json(booking, { status: 201 });
  }),

  http.put(`${API_ENDPOINTS.BOOKINGS}/:id`, async ({ params, request }) => {
    await delay(300);
    const updates = (await request.json()) as Partial<Booking>;
    const index = bookings.findIndex((b) => b.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    bookings[index] = { ...bookings[index], ...updates, updated_at: new Date().toISOString() };
    return HttpResponse.json(bookings[index]);
  }),

  http.patch(`${API_ENDPOINTS.BOOKINGS}/:id/cancel`, async ({ params }) => {
    await delay(300);
    const index = bookings.findIndex((b) => b.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    bookings[index].status = 'cancelled';
    bookings[index].updated_at = new Date().toISOString();
    return HttpResponse.json(bookings[index]);
  }),

  http.delete(`${API_ENDPOINTS.BOOKINGS}/:id`, async ({ params }) => {
    await delay(300);
    const index = bookings.findIndex((b) => b.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    bookings.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // Bulk update bookings
  http.patch('/api/bookings/bulk-update', async ({ request }) => {
    await delay(300);
    const { ids, status } = (await request.json()) as { ids: string[]; status: string };
    let count = 0;
    ids.forEach((id) => {
      const index = bookings.findIndex((b) => b.id === id);
      if (index !== -1) {
        bookings[index].status = status as Booking['status'];
        bookings[index].updated_at = new Date().toISOString();
        count++;
      }
    });
    return HttpResponse.json({ updated: count });
  }),

  // ── Analytics ──────────────────────────────────────────
  http.get(API_ENDPOINTS.ANALYTICS_OVERVIEW, async () => {
    await delay(300);
    return HttpResponse.json({
      totalUsers: users.filter((u) => u.role === 'user').length,
      totalBookings: bookings.length,
      totalRevenue: bookings.filter((b) => b.status === 'confirmed').length * 1200,
      activeTours: tours.filter((t) => t.status === 'active').length,
    });
  }),

  http.get(API_ENDPOINTS.ANALYTICS_BOOKING_TRENDS, async () => {
    await delay(300);
    return HttpResponse.json([
      { month: 'Jan', count: 12 },
      { month: 'Feb', count: 19 },
      { month: 'Mar', count: 15 },
      { month: 'Apr', count: 25 },
      { month: 'May', count: 22 },
      { month: 'Jun', count: 30 },
      { month: 'Jul', count: 28 },
      { month: 'Aug', count: 35 },
      { month: 'Sep', count: 20 },
      { month: 'Oct', count: 18 },
      { month: 'Nov', count: 24 },
      { month: 'Dec', count: 32 },
    ]);
  }),

  http.get(API_ENDPOINTS.ANALYTICS_POPULAR_DESTINATIONS, async () => {
    await delay(300);
    const destCounts = bookings.reduce((acc, b) => {
      acc[b.destination] = (acc[b.destination] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return HttpResponse.json(
      Object.entries(destCounts)
        .map(([name, count]) => ({ name, bookings: count }))
        .sort((a, b) => b.bookings - a.bookings)
    );
  }),

  http.get(API_ENDPOINTS.ANALYTICS_REVENUE, async () => {
    await delay(300);
    const revByDest = bookings
      .filter((b) => b.status === 'confirmed')
      .reduce((acc, b) => {
        acc[b.destination] = (acc[b.destination] || 0) + 1200;
        return acc;
      }, {} as Record<string, number>);
    return HttpResponse.json(
      Object.entries(revByDest).map(([destination, revenue]) => ({ destination, revenue }))
    );
  }),
];
