# Consultation booking: Google setup

The booking widget books a 30-minute call straight into Google Calendar, with a Google Meet link, and
Google sends the visitor the invitation. It runs through a Google Workspace service account that is
allowed to act as `office@sns-austria.com` (domain-wide delegation). No visitor ever signs in to Google.

Code: `lib/booking/` (slots, Google calls), `app/api/booking/` (the two routes),
`components/booking/BookingWidget.tsx` (the widget). Settings: `.env.local.example`.

## One-time setup (about 15 minutes, needs a Workspace super admin)

1. **Google Cloud project.** At console.cloud.google.com, create a project (e.g. `sns-website`).
   APIs & Services → Library → enable **Google Calendar API**.
2. **Service account.** IAM & Admin → Service accounts → Create (e.g. `website-booking`). No roles needed.
   Open it → Keys → Add key → JSON. Keep the file safe; it is a secret.
   Note the service account's **Client ID** (a long number) on its Details tab.
3. **Domain-wide delegation.** admin.google.com → Security → Access and data control → API controls →
   Manage domain-wide delegation → Add new:
   - Client ID: the number from step 2
   - OAuth scopes:
     `https://www.googleapis.com/auth/calendar.events,https://www.googleapis.com/auth/calendar.freebusy`
4. **Vercel environment variables** (Project → Settings → Environment Variables, Production and Preview):
   - `GOOGLE_SA_EMAIL`: `client_email` from the JSON file
   - `GOOGLE_SA_PRIVATE_KEY`: `private_key` from the JSON file, pasted as is (the `\n`s are fine)
   - `BOOKING_ORGANIZER`: `office@sns-austria.com` (the calendar the events go into)
   - `BOOKING_BUSY_CALENDARS`: every calendar whose meetings should block a slot, comma-separated,
     e.g. `office@sns-austria.com,<founder 1>@sns-austria.com,<founder 2>@sns-austria.com`
   - Optional: opening hours and the rest (defaults in `.env.local.example`).
   Then redeploy.
5. **Test.** Book a slot on the preview deployment with your own email. The event should appear in the
   organizer's calendar with a Meet link, and the invitation should arrive. Delete the test event.

## How it decides what's free

Weekdays, 09:00–12:00 and 13:30–16:30 Vienna time, 30-minute calls on the half hour, 15 minutes kept
free around other meetings, at least 18 hours' notice, up to six weeks ahead. Any meeting in any
calendar in `BOOKING_BUSY_CALENDARS` blocks the slot. When someone confirms, the slot is checked
against Google again, so two people can't book the same time.

## Before launch

- Privacy policy: add the booking (name, email, company, topic; processed by Google as calendar and
  Meet provider; kept as a calendar event). The widget links to `/legal/privacy` for consent.
- Spam: the routes have a hidden honeypot field and a per-address limit. If bots get through,
  add Cloudflare Turnstile or Vercel BotID to `POST /api/booking`.
- German: the widget has `locale="de"`; the invitation title and description follow it.
