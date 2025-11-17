import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Home, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-lg bg-primary p-2">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CampusReport</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                Beranda
              </Link>
            </Button>
            <Button
              variant={isActive("/reports") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/reports">
                <FileText className="h-4 w-4" />
                Laporan
              </Link>
            </Button>
            <Button
              variant={isActive("/admin") ? "default" : "ghost"}
              asChild
              className="gap-2"
            >
              <Link to="/admin">
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
