export interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    category_label: string;
    brief: string;
    description: string;
    tags: string[];
    image?: string | null;
    gallery?: string[] | null;
    problem?: string | null;
    solution?: string | null;
    features?: string[] | null;
    role?: string | null;
    client?: string | null;
    date_range: string;
    live_url?: string | null;
    github_url?: string | null;
    is_featured: boolean;
    order: number;
    created_at?: string;
    updated_at?: string;
}

export interface Skill {
    id: number;
    name: string;
    category: 'data-ai' | 'programming' | 'mobile' | 'tools' | (string & {});
    level: number;
    color: string;
    icon?: string | null;
    order: number;
    created_at?: string;
    updated_at?: string;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    category: 'data-ai' | 'academic' | 'mobile' | 'web' | (string & {});
    category_label: string;
    image?: string | null;
    fallback_icon?: string | null;
    credential_url?: string | null;
    description?: string | null;
    order: number;
    created_at?: string;
    updated_at?: string;
}

export interface Journey {
    id: number;
    title: string;
    role: string;
    date_range: string;
    category: 'work' | 'learning' | 'community' | 'education' | (string & {});
    category_label: string;
    icon: string;
    description: string;
    order: number;
    created_at?: string;
    updated_at?: string;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
    category_label: string;
    reading_time: string;
    author: string;
    date: string;
    image?: string | null;
    excerpt: string;
    body: string;
    tags?: string[] | null;
    is_published: boolean;
    published_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    subject?: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProfileSettings {
    name?: string;
    name_en?: string;
    role_title?: string;
    status_badge?: string;
    hero_desc?: string;
    about_lead?: string;
    about_bio?: string;
    whatsapp_1?: string;
    whatsapp_2?: string;
    telegram?: string;
    instagram?: string;
    github?: string;
    email?: string;
    cv_url?: string;
    experience_years?: string;
    completed_projects?: string;
    happy_clients?: string;
    community_members?: string;
    [key: string]: string | undefined;
}

export interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    detailed_description: string;
    additional_info?: string | null;
    icon: string;
    features?: string[] | null;
    technologies?: string[] | null;
    gallery?: string[] | null;
    order: number;
    created_at?: string;
    updated_at?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role?: string | null;
    company?: string | null;
    avatar?: string | null;
    text: string;
    rating: number;
    order: number;
    created_at?: string;
    updated_at?: string;
}
