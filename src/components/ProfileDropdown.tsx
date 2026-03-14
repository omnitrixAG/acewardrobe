import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Package, FileEdit, Bell, Heart } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Orders", icon: Package, href: "/orders" },
  { label: "My Info", icon: FileEdit, href: "/profile" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
  { label: "Wishlist", icon: Heart, href: "/wishlist" },
];

export const ProfileDropdown: FC<Props> = ({ open, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50"
    >
      {/* Auth buttons */}
      <div className="p-4 space-y-2">
        <Link
          to="/login"
          onClick={onClose}
          className="block w-full text-center py-2 text-sm font-semibold border border-border rounded-md hover:bg-muted transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          onClick={onClose}
          className="block w-full text-center py-2 text-sm font-semibold bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>

      <div className="h-px bg-border" />

      {/* Menu items */}
      <div className="py-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <item.icon size={16} className="text-muted-foreground" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
