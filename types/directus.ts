// Event types
export interface Event {
    id: number;
    status: string;
    image: string;
    event_date: string;
    event_url: string;
    sign_up_button: boolean;
    translations: EventTranslations[];
}

export interface EventTranslations {
    id: number;
    events_id: number;
    languages_code: string;
    name: string;
    description: string;
    signup_button_text: string;
}

// Homepage types
export interface HomePage {
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    hero_image: string;
    logo:string;
    hero_image_credit: string;
    translations: HomePageTranslation[];
}

export interface HomePageTranslation {
    id: number;
    homepage_id: number;
    languages_code: string;
    description: string;
    footer_title: string;
}

// Sign up page types
export interface SignUpPage{
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    quota: number;
    signup_open: string; // date
    signup_close: string; // date
    signup_open_invite: string; // date
    signup_close_invite: string; // date
    signup_enabled_open: boolean;
    signup_enabled_invite: boolean;
    translations: SignUpPageTranslations[];
}

export interface SignUpPageTranslations{
    id: number;
    signup_id: number;
    languages_code: string;
    title: string;
    description: string;
}

// Contact page types
export interface ContactPage {
    id: number;
    status: string;
    email: string;
    translations: ContactPageTranslations[];
}

export interface ContactPageTranslations{
    id: number;
    homepage_id: number;
    languages_code: string;
    description: string;
}

// Other data
export interface General{
    id: number;
    event_name: string;
    event_date: string;
}

export interface Languages{
    code: string;
    name: string;
    directions: "left" | "right";
}

export interface Sponsors{
    id: number;
    status: string;
    logo: string;
    company_website: string;
}

export interface Participants{
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    quota: string;
    first_name: string;
    last_name: string;
    public_name: boolean
    email: string;
    fuksi_year: number;
    ticket_type: string;
    dietary_restrictions: string;
    main_course: string;
    alcohol_selection: string;
    avec_name: string;
    table_group: string;
    representation: string;
    greeting: boolean;
    sillis: boolean;
    vip: boolean,
    dance_training: boolean;
}