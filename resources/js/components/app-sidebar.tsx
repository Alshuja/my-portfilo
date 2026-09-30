import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    FolderGit2,
    Cpu,
    Award,
    Route,
    Newspaper,
    MessageSquare,
    ExternalLink,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'لوحة التحكم (Overview)',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'إدارة المشاريع',
        href: '/admin/projects',
        icon: FolderGit2,
    },
    {
        title: 'إدارة المهارات',
        href: '/admin/skills',
        icon: Cpu,
    },
    {
        title: 'الشهادات والجوائز',
        href: '/admin/certificates',
        icon: Award,
    },
    {
        title: 'المسار والمحطات',
        href: '/admin/journey',
        icon: Route,
    },
    {
        title: 'المدونة والمقالات',
        href: '/admin/articles',
        icon: Newspaper,
    },
    {
        title: 'صندوق الرسائل',
        href: '/admin/messages',
        icon: MessageSquare,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'معاينة الموقع الرئيسي',
        href: '/',
        icon: ExternalLink,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
