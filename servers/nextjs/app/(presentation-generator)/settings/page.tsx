import { redirect } from 'next/navigation'

// export const metadata = {
//   title: 'Settings | Presenton',
//   description: 'Settings page',
// }

// Settings page is disabled - all configuration is managed through backend .env
export default function page() {
  redirect('/dashboard')
}
