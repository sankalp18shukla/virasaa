import { Profile } from "@/components/account/AccountPages";

// AccountShell only renders once the browser-side session is read, so this
// segment is never in the server shell. Opt it out of instant-nav validation.
export const instant = false;

export default function ProfilePage() {
  return <Profile />;
}
