"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Sparkles, Settings, LogOut, Heart, MessageSquare, Wind, NotebookPen, CalendarHeart, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SoulAvatar } from "@/components/soul-avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { name: "Feed", href: "/dashboard", icon: LayoutDashboard },
    { name: "Check-In", href: "/check-in", icon: PlusCircle },
    { name: "Safe Forums", href: "/forums", icon: Users },
    { name: "Matches", href: "/matches", icon: Heart },
    { name: "Glimmers", href: "/glimmer", icon: Sparkles },
    { name: "Journal", href: "/journal", icon: NotebookPen },
    { name: "Quiet Room", href: "/quiet-room", icon: Wind },
    { name: "Activities", href: "/activities", icon: CalendarHeart },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const mobileNav = [
    { name: "Feed", href: "/dashboard", icon: LayoutDashboard },
    { name: "Forums", href: "/forums", icon: Users },
    { name: "Check-In", href: "/check-in", icon: PlusCircle, center: true },
    { name: "Matches", href: "/matches", icon: Heart },
    { name: "Me", href: "/settings", icon: User },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background/50 relative overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

        <Sidebar className="hidden md:flex glass border-r border-white/5">
          <SidebarHeader className="p-6">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-primary animate-morph group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold tracking-tight">Amity</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild
                    isActive={pathname === item.href}
                    className={`h-11 rounded-xl transition-all duration-300 ${
                      pathname === item.href 
                        ? "bg-primary/20 text-primary" 
                        : "text-muted-foreground hover:bg-white/5"
                    }`}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6 mt-auto">
            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 mb-6">
              <SoulAvatar mood="calm" size="sm" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">
                  {user?.user_metadata?.username || user?.email || "PeacefulSoul"}
                </span>
                <span className="text-[10px] text-primary">Calm Vibe</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors px-2 w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col relative min-h-screen">
          <header className="h-16 border-b border-white/5 glass flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-semibold text-muted-foreground md:hidden uppercase tracking-wider">Amity</h2>
              <span className="text-lg font-medium hidden md:block">
                {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full glass h-10 w-10">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-white/10 md:hidden overflow-hidden">
                <SoulAvatar mood="calm" size="sm" />
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8 pb-32 md:pb-8 max-w-7xl mx-auto w-full">
            {children}
          </div>

          <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 glass rounded-[2.5rem] border border-white/10 flex items-center justify-around z-50 shadow-2xl px-2">
            {mobileNav.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex flex-col items-center gap-1.5 transition-all relative ${
                  pathname === item.href ? "text-primary scale-110" : "text-muted-foreground"
                } ${item.center ? "bg-primary text-primary-foreground p-3 rounded-full -translate-y-4 shadow-lg shadow-primary/40" : ""}`}
              >
                <item.icon className={item.center ? "w-7 h-7" : "w-6 h-6"} />
                {!item.center && <span className="text-[10px] font-medium">{item.name}</span>}
                {pathname === item.href && !item.center && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </main>
      </div>
    </SidebarProvider>
  );
}
