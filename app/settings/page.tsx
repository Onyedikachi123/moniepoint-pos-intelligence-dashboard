'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/store/useStore';

export default function SettingsPage() {
    const { currentBusiness } = useStore();

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Settings Sidebar */}
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start bg-slate-100 font-semibold text-slate-900">General</Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-600">Notifications</Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-600">Security</Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-600">Team</Button>
                        <Button variant="ghost" className="w-full justify-start text-slate-600">API Keys</Button>
                    </div>

                    {/* Main Settings Content */}
                    <div className="md:col-span-3 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Business Profile</CardTitle>
                                <CardDescription>Manage your business information and preferences.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label className="text-slate-500">Business Name</Label>
                                        <div className="col-span-2 font-medium">{currentBusiness.name}</div>
                                    </div>
                                    <Separator />
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label className="text-slate-500">Account ID</Label>
                                        <div className="col-span-2 font-mono text-sm bg-slate-50 p-2 rounded w-fit">{currentBusiness.accountNumber}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>Customize your dashboard experience.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Real-time Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Receive pop-up alerts for failed transactions.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Dark Mode</Label>
                                        <p className="text-sm text-muted-foreground">Toggle dark mode theme.</p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Auto-Reversals</Label>
                                        <p className="text-sm text-muted-foreground">Automatically attempt reversals for eligible failures.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
