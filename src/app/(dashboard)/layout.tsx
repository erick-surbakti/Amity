"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Sparkles, Settings, LogOut, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SoulAvatar } from "@/components/soul-avatar";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Feed", href: "/dashboard", icon: LayoutDashboard },
    { name: "Safe Forums", href: "/forums", icon: Users },
    { name: "Glimmers", href: "/glimmer", icon: Sparkles },
    { name: "Matches", href: "/matches", icon: Heart },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background/50 relative overflow-hidden">
        {/* Ambient background particles */}
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

        {/* Sidebar for Desktop */}
        <Sidebar className="hidden md:flex glass border-r border-white/5">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary animate-morph" />
              <span className="text-xl font-bold tracking-tight">Amity</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton 
                      isActive={pathname === item.href}
                      className={`h-11 rounded-xl transition-all duration-300 ${
                        pathname === item.href 
                          ? "bg-primary/20 text-primary" 
                          : "text-muted-foreground hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-6 mt-auto">
            <div className="p-4 rounded-2xl glass-card flex items-center gap-3 mb-6">
              <SoulAvatar mood="calm" size="sm" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">PeacefulSoul</span>
                <span className="text-[10px] text-primary">Calm Vibe</span>
              </div>
            </div>
            <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors px-2">
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </Link>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative min-h-screen">
          <header className="h-16 border-b border-white/5 glass flex items-center justify-between px-6 md:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-semibold text-muted-foreground md:hidden">Amity</h2>
              <span className="text-lg font-medium hidden md:block">
                {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full glass h-10 w-10">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </Button>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-white/10 md:hidden">
                <SoulAvatar mood="calm" size="sm" />
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
            {children}
          </div>

          {/* Bottom Nav for Mobile */}
          <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 glass rounded-2xl border border-white/10 flex items-center justify-around z-50 shadow-2xl">
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.name} href={item.href} className={`flex flex-col items-center gap-1 transition-colors ${
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              }`}>
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </main>
      </div>
    </SidebarProvider>
  );
}