'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Bell, Shield, Palette, LogOut, User } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
      </div>

      {/* Account Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Account</h2>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>View and manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium mt-1">{user?.email || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium mt-1 text-xs font-mono">{user?.id || 'Not available'}</p>
            </div>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Control how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Check-In Reminders</p>
                <p className="text-sm text-muted-foreground">Daily wellness check-in reminders</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Forum Updates</p>
                <p className="text-sm text-muted-foreground">Notifications from your safe spaces</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appearance Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Appearance</h2>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme Settings
            </CardTitle>
            <CardDescription>Customize how Amity looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium">Color Scheme</p>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-4 rounded-lg border-2 border-primary bg-primary/10">Light</button>
                <button className="p-4 rounded-lg border-2 border-white/10 bg-white/5">Dark</button>
                <button className="p-4 rounded-lg border-2 border-white/10 bg-white/5">Auto</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Security Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Privacy & Security</h2>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full">
              Active Sessions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Danger Zone</h2>
        
        <Card className="glass border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <LogOut className="w-5 h-5" />
              Log Out
            </CardTitle>
            <CardDescription>Sign out of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleLogout} 
              disabled={isLoading}
              variant="destructive" 
              className="w-full"
            >
              {isLoading ? 'Logging out...' : 'Log Out'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
