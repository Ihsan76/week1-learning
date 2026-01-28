// src/components/EditUserModal/constants.ts

export const TIMEZONES = [
  {
    label: 'Africa',
    options: [
      { value: 'Africa/Cairo', label: 'Cairo (UTC+2)' },
      { value: 'Africa/Johannesburg', label: 'Johannesburg (UTC+2)' },
      { value: 'Africa/Lagos', label: 'Lagos (UTC+1)' },
      { value: 'Africa/Nairobi', label: 'Nairobi (UTC+3)' },
    ],
  },
  {
    label: 'Asia',
    options: [
      { value: 'Asia/Amman', label: 'Amman (UTC+3)' },
      { value: 'Asia/Baghdad', label: 'Baghdad (UTC+3)' },
      { value: 'Asia/Bangkok', label: 'Bangkok (UTC+7)' },
      { value: 'Asia/Beijing', label: 'Beijing (UTC+8)' },
      { value: 'Asia/Dubai', label: 'Dubai (UTC+4)' },
      { value: 'Asia/Hong_Kong', label: 'Hong Kong (UTC+8)' },
      { value: 'Asia/Jakarta', label: 'Jakarta (UTC+7)' },
      { value: 'Asia/Jerusalem', label: 'Jerusalem (UTC+2)' },
      { value: 'Asia/Karachi', label: 'Karachi (UTC+5)' },
      { value: 'Asia/Kolkata', label: 'Kolkata (UTC+5:30)' },
      { value: 'Asia/Manila', label: 'Manila (UTC+8)' },
      { value: 'Asia/Seoul', label: 'Seoul (UTC+9)' },
      { value: 'Asia/Shanghai', label: 'Shanghai (UTC+8)' },
      { value: 'Asia/Singapore', label: 'Singapore (UTC+8)' },
      { value: 'Asia/Tehran', label: 'Tehran (UTC+3:30)' },
      { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'Europe/Amsterdam', label: 'Amsterdam (UTC+1)' },
      { value: 'Europe/Athens', label: 'Athens (UTC+2)' },
      { value: 'Europe/Berlin', label: 'Berlin (UTC+1)' },
      { value: 'Europe/Brussels', label: 'Brussels (UTC+1)' },
      { value: 'Europe/Budapest', label: 'Budapest (UTC+1)' },
      { value: 'Europe/Dublin', label: 'Dublin (UTC+0)' },
      { value: 'Europe/Istanbul', label: 'Istanbul (UTC+3)' },
      { value: 'Europe/London', label: 'London (UTC+0)' },
      { value: 'Europe/Madrid', label: 'Madrid (UTC+1)' },
      { value: 'Europe/Moscow', label: 'Moscow (UTC+3)' },
      { value: 'Europe/Paris', label: 'Paris (UTC+1)' },
      { value: 'Europe/Rome', label: 'Rome (UTC+1)' },
      { value: 'Europe/Stockholm', label: 'Stockholm (UTC+1)' },
      { value: 'Europe/Vienna', label: 'Vienna (UTC+1)' },
      { value: 'Europe/Zurich', label: 'Zurich (UTC+1)' },
    ],
  },
  {
    label: 'Americas',
    options: [
      { value: 'America/Anchorage', label: 'Anchorage (UTC-9)' },
      {
        value: 'America/Argentina/Buenos_Aires',
        label: 'Buenos Aires (UTC-3)',
      },
      { value: 'America/Chicago', label: 'Chicago (UTC-6)' },
      { value: 'America/Denver', label: 'Denver (UTC-7)' },
      { value: 'America/Los_Angeles', label: 'Los Angeles (UTC-8)' },
      { value: 'America/Mexico_City', label: 'Mexico City (UTC-6)' },
      { value: 'America/New_York', label: 'New York (UTC-5)' },
      { value: 'America/Toronto', label: 'Toronto (UTC-5)' },
      { value: 'America/Vancouver', label: 'Vancouver (UTC-8)' },
      { value: 'America/Sao_Paulo', label: 'São Paulo (UTC-3)' },
    ],
  },
  {
    label: 'Australia & Pacific',
    options: [
      { value: 'Australia/Melbourne', label: 'Melbourne (UTC+10)' },
      { value: 'Australia/Sydney', label: 'Sydney (UTC+10)' },
      { value: 'Pacific/Auckland', label: 'Auckland (UTC+12)' },
      { value: 'Pacific/Fiji', label: 'Fiji (UTC+12)' },
      { value: 'Pacific/Honolulu', label: 'Honolulu (UTC-10)' },
    ],
  },
] as const;

export const ROLE_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'admin', label: 'Admin' },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'ar', label: 'العربية' },
  { value: 'en', label: 'English' },
] as const;

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;