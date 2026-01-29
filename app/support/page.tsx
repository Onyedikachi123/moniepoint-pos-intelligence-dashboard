'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, Mail, MessageCircle, FileText, Search, ExternalLink } from 'lucide-react';

const faqs = [
    {
        question: "How do I resolve a POS network error?",
        answer: "Network errors can often be resolved by restarting the terminal. Hold the power button for 3 seconds, select Restart. If the issue persists, check if the SIM card has active data or try connecting to Wi-Fi. For 'Issuer Decline' errors, advise the customer to contact their bank."
    },
    {
        question: "What is the dispute resolution timeline?",
        answer: "Standard disputes are typically resolved within 24-48 hours. Chargebacks may take up to 7-14 business days depending on the issuing bank. You can track the status of all disputes in the 'Disputes' tab."
    },
    {
        question: "How do I download my monthly transaction statement?",
        answer: "Go to the 'Transactions' page, click on the 'Export' button at the top right corner. You can select the date range and format (PDF or CSV) before downloading."
    },
    {
        question: "My POS terminal is damaged, how do I get a replacement?",
        answer: "For hardware issues, please request a replacement via the 'POS Operations' tab or contact your Relationship Manager directly. Replacements are usually processed within 3 business days."
    },
    {
        question: "What are the current transaction fees?",
        answer: "Our standard transaction fee is capped at 0.5% or ₦100, whichever is lower. Transfers are charged at a flat rate of ₦20. Rates may vary based on your specific business volume agreement."
    }
];

export default function SupportPage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header with Search */}
                <div className="bg-[#0351E7] rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h1>
                        <p className="text-blue-100 mb-8 text-lg">
                            Find answers, contact support, or chat with our team.
                        </p>
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles (e.g., 'refunds', 'terminal error')..."
                                className="w-full h-12 pl-12 pr-4 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Decorative Background Circles */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-20 -mb-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>
                </div>

                {/* Quick Support Channels */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                                <Phone className="h-5 w-5 text-[#0351E7]" />
                            </div>
                            <CardTitle>Call Support</CardTitle>
                            <CardDescription>Speak directly with an agent.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold text-slate-900 mb-1">01-888-9990</p>
                            <p className="text-sm text-slate-500 mb-4">Available Mon-Sun, 8am - 8pm</p>
                            <Button variant="outline" className="w-full">Call Now</Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-2">
                                <MessageCircle className="h-5 w-5 text-emerald-600" />
                            </div>
                            <CardTitle>Live Chat</CardTitle>
                            <CardDescription>Instant help for urgent issues.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold text-slate-900 mb-1">Online</p>
                            <p className="text-sm text-slate-500 mb-4">Typical wait time: &lt; 2 mins</p>
                            <Button className="w-full bg-[#0351E7] hover:bg-blue-700">Start Chat</Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-2">
                                <Mail className="h-5 w-5 text-amber-600" />
                            </div>
                            <CardTitle>Email Us</CardTitle>
                            <CardDescription>For non-urgent inquiries.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-semibold text-slate-900 mb-1">support@moniepoint.com</p>
                            <p className="text-sm text-slate-500 mb-4">Response time: 24 hours</p>
                            <Button variant="outline" className="w-full">Send Email</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FAQ Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
                            <Button variant="ghost" className="text-[#0351E7]">View all FAQ <ExternalLink className="ml-2 h-4 w-4" /></Button>
                        </div>
                        <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-slate-200 shadow-sm px-6">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className={index === faqs.length - 1 ? 'border-b-0' : ''}>
                                    <AccordionTrigger className="text-left text-slate-900">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Send us a message</CardTitle>
                                <CardDescription>We usually reply within a few hours.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="e.g. POS Terminal Issue" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Describe your issue in detail..." className="min-h-[120px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file">Attachments (Optional)</Label>
                                        <Input id="file" type="file" className="cursor-pointer text-slate-500" />
                                    </div>
                                    <Button className="w-full mt-2">Submit Request</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Documentation Links */}
                <div className="mt-8 border-t border-slate-200 pt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Popular Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { title: 'User Manual', desc: 'Complete guide to your dashboard' },
                            { title: 'POS Troubleshooting', desc: 'Fix common terminal errors' },
                            { title: 'API Documentation', desc: 'Integrate with our systems' },
                            { title: 'Security Guidelines', desc: 'Best practices for safety' },
                        ].map((item, i) => (
                            <a key={i} href="#" className="flex flex-col p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
                                <div className="flex items-center gap-2 mb-2 font-medium text-slate-900 group-hover:text-[#0351E7]">
                                    <FileText className="h-4 w-4" />
                                    {item.title}
                                </div>
                                <span className="text-sm text-slate-500">{item.desc}</span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
