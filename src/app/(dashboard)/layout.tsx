"use client";

import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Sparkles, Settings, LogOut, Heart, MessageSquare, Wind, NotebookPen, CalendarHeart, PlusCircle, User, Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SoulAvatar } from "@/components/soul-avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { name: "Wellness Advisor", href: "/wellness-chat", icon: Zap },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const mobileNav = [
    { name: "Feed", href: "/dashboard", icon: LayoutDashboard },
    { name: "Forums", href: "/forums", icon: Users },
    { name: "Check-In", href: "/check-in", icon: PlusCircle, center: true },
    { name: "Chat", href: "/wellness-chat", icon: MessageSquare },
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
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
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

          {/* Mobile Sidebar Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 top-16 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
              <div className="bg-background/95 backdrop-blur-md w-64 h-full border-r border-white/10 glass p-4 space-y-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-6 px-2">
                  <div className="w-8 h-8 rounded-full bg-primary animate-morph" />
                  <span className="text-lg font-bold">Amity</span>
                </div>
                
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        pathname === item.href
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="p-4 rounded-2xl glass-card flex items-center gap-3 mb-4">
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
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors px-4 w-full text-left py-3"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 p-6 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
            {children}
          </div>

          <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass rounded-t-[2.5rem] border-t border-white/10 flex items-center justify-around z-50 shadow-2xl px-2 bg-background/95 backdrop-blur-md">
            {mobileNav.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`flex flex-col items-center justify-center gap-1 transition-all relative flex-1 h-full ${
                  pathname === item.href ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
                } ${item.center ? "bg-primary text-primary-foreground rounded-full mx-auto w-14 h-14 -translate-y-6 shadow-lg shadow-primary/40 flex-none" : ""}`}
              >
                <item.icon className={item.center ? "w-6 h-6" : "w-5 h-5"} />
                {!item.center && <span className="text-[9px] font-medium leading-tight">{item.name}</span>}
                {pathname === item.href && !item.center && (
                  <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="h-24 md:h-0" />
        </main>
      </div>
    </SidebarProvider>
  );
}
