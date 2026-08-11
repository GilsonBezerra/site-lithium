"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="lith-btn lith-btn--ghost lith-btn--sm" onClick={() => signOut({ callbackUrl: "/admin/login" })}>
      Sair
    </button>
  );
}
