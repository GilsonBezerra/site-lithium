import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/AdminNav";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="lith-admin">
      <div className="lith-admin__topbar">
        <span className="lith-nav__brand-text" style={{ color: "#fff" }}>
          Lithium<em>Admin</em>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{session?.user?.email}</span>
          <SignOutButton />
        </div>
      </div>
      <AdminNav />
      <main className="lith-admin__main">{children}</main>
    </div>
  );
}
